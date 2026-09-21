import {
  db, auth, collection, doc, setDoc, updateDoc, deleteDoc, addDoc,
  getDocs, onSnapshot, query, where, serverTimestamp,
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
} from "./firebase-init.js";
import {
  EMAILJS_SERVICE_ID, EMAILJS_COMPLETION_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, MARKING_EMAIL_TO,
} from "./firebase-config.js";
import { seedPayrollQuestions } from "./seed-questions.js";

const LEVELS = [
  { min: 90, label: "Advanced" },
  { min: 75, label: "Intermediate" },
  { min: 60, label: "Junior" },
  { min: 0, label: "Beginner" },
];
function computeLevel(score, maxScore) {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  return LEVELS.find((l) => pct >= l.min).label;
}

let emailjsReady = false;
function ensureEmailjs() {
  if (emailjsReady || !window.emailjs) return;
  window.emailjs.init(EMAILJS_PUBLIC_KEY);
  emailjsReady = true;
}

const DAY_NAMES = {
  1: "Getting Started & Employee Setup",
  2: "Leave & HR Modules",
  3: "Payroll Processing",
  4: "Statutory & Compliance",
  5: "Reports, Tools & Troubleshooting",
};

function fmtTime(ts) {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString();
}

// A learning session can be abandoned (candidate closes the tab) without
// ever firing the "completed" write. There's no server-side timeout in a
// static-site + Firestore app, so this is a client-side heuristic: once a
// session has gone quiet well past the learning window, the dashboard
// displays it as completed (still showing the last step reached) rather
// than leaving it stuck on "in-progress" forever. The underlying Firestore
// doc is left untouched — this is purely a display computation.
const STALE_AFTER_MS = 25 * 60 * 1000; // 20-minute learning window + buffer

function derivedLearningStatus(s) {
  if (s.status === "completed") return "completed";
  const updatedMs = s.updatedAt?.toMillis ? s.updatedAt.toMillis() : 0;
  if (updatedMs && Date.now() - updatedMs > STALE_AFTER_MS) return "completed";
  return "in-progress";
}

// ---------- Auth ----------

document.getElementById("login-btn").addEventListener("click", async () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const errEl = document.getElementById("login-error");
  errEl.textContent = "";
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    errEl.textContent = "Sign-in failed — check email/password.";
  }
});
document.getElementById("login-password").addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("login-btn").click();
});
document.getElementById("logout-btn").addEventListener("click", () => signOut(auth));

let unsubLearning = null;
let unsubCandidates = null;
let unsubProfiles = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("whoami").textContent = `Signed in as ${user.email}`;
    startLiveListeners();
    loadQuestions();
    loadPassingPercent();
  } else {
    document.getElementById("login-screen").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
    if (unsubLearning) unsubLearning();
    if (unsubCandidates) unsubCandidates();
    if (unsubProfiles) unsubProfiles();
  }
});

// ---------- Tabs ----------

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
  });
});

// ---------- Live progress: learning ----------

function renderLearningTable(sessions) {
  const tbody = document.getElementById("learning-body");
  tbody.innerHTML = "";
  const rows = Object.entries(sessions).sort((a, b) => {
    const ta = a[1].updatedAt?.toMillis ? a[1].updatedAt.toMillis() : 0;
    const tb = b[1].updatedAt?.toMillis ? b[1].updatedAt.toMillis() : 0;
    return tb - ta;
  });
  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="muted">No one learning right now.</td></tr>`;
    return;
  }
  rows.forEach(([id, s]) => {
    const status = derivedLearningStatus(s);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="status-dot ${status}"></span>${status}</td>
      <td>${s.name || "(no name)"}</td>
      <td>Day ${s.day} — ${s.topic || DAY_NAMES[s.day] || ""}</td>
      <td>${(s.currentStepIndex ?? 0) + 1} / ${s.totalSteps ?? "?"}</td>
      <td>${fmtTime(s.updatedAt)}</td>
      <td><button class="danger" data-del-learning="${id}">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll("[data-del-learning]").forEach((b) => b.addEventListener("click", async () => {
    if (!confirm("Delete this learning session record permanently?")) return;
    await deleteDoc(doc(db, "learning_sessions", b.dataset.delLearning));
  }));
}

// ---------- Live progress: testing ----------

let candidatesCache = {};

function renderCandidatesTable() {
  const tbody = document.getElementById("candidates-body");
  tbody.innerHTML = "";
  const rows = Object.entries(candidatesCache).sort((a, b) => {
    const ta = a[1].startedAt?.toMillis ? a[1].startedAt.toMillis() : 0;
    const tb = b[1].startedAt?.toMillis ? b[1].startedAt.toMillis() : 0;
    return tb - ta;
  });
  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="muted">No attempts yet.</td></tr>`;
    return;
  }
  rows.forEach(([id, c]) => {
    const tr = document.createElement("tr");
    const flagCount = (c.flags || []).length;
    const scoreText = c.status === "completed" ? `${c.score} / ${c.maxScore}` : "—";
    const progressText = c.status === "completed" ? "Done" : `Q${(c.currentIndex ?? 0) + 1} / ${c.totalQuestions ?? "?"}`;
    tr.innerHTML = `
      <td><span class="status-dot ${c.status}"></span>${c.status}</td>
      <td>${c.name || "(no name)"}</td>
      <td>Day ${c.day ?? "?"}</td>
      <td>${progressText}</td>
      <td>${scoreText}</td>
      <td>${flagCount > 0 ? `<span class="flag-pill">${flagCount} flag${flagCount === 1 ? "" : "s"}</span>` : "—"}</td>
      <td>${fmtTime(c.startedAt)}</td>
      <td><button class="secondary" data-view="${id}">View</button> <button class="danger" data-delete="${id}">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll("[data-view]").forEach((b) => b.addEventListener("click", () => openCandidateDetail(b.dataset.view)));
  tbody.querySelectorAll("[data-delete]").forEach((b) => b.addEventListener("click", () => deleteCandidate(b.dataset.delete)));
}

function openCandidateDetail(id) {
  const c = candidatesCache[id];
  let dayRows = "";
  if (c.scoreByDay) {
    Object.entries(c.scoreByDay).forEach(([day, s]) => {
      dayRows += `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);"><span>Day ${day} — ${s.topic}</span><span>${s.correct} / ${s.total}</span></div>`;
    });
  }
  let flagsHtml = "";
  (c.flags || []).forEach((f) => {
    flagsHtml += `<div class="flag-pill" style="display:block;margin-bottom:4px;">${new Date(f.at).toLocaleTimeString()} — ${f.detail}</div>`;
  });
  if (!flagsHtml) flagsHtml = `<p class="muted">No flags recorded.</p>`;

  let answersHtml = "";
  (c.answers || []).forEach((a, i) => {
    answersHtml += `
      <div style="margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid #eee;">
        <div style="font-weight:600; margin-bottom:4px;">${i + 1}. ${a.question}</div>
        <div style="font-size:13px;">
          Answered: <b style="color:${a.isCorrect ? "#1b7f1b" : "#b00020"}">${a.selectedLetter ?? "(blank)"}</b>
          &nbsp;·&nbsp; Correct: <b>${a.correctLetter}</b>
        </div>
      </div>`;
  });

  document.getElementById("candidate-modal-body").innerHTML = `
    <h2>${c.name || "(no name)"}</h2>
    <p class="muted">Day ${c.day ?? "?"} · Started ${fmtTime(c.startedAt)} · ${c.status === "completed" ? "Completed " + fmtTime(c.completedAt) : "In progress"}</p>
    ${c.status === "completed" ? `<div style="font-size:32px;font-weight:800;color:var(--navy);">${c.score} / ${c.maxScore}</div>` : ""}
    <h2 style="margin-top:20px;">Score by day</h2>
    ${dayRows || '<p class="muted">Not completed yet.</p>'}
    <h2 style="margin-top:20px;">Proctoring flags</h2>
    ${flagsHtml}
    <h2 style="margin-top:20px;">Answer review</h2>
    ${answersHtml || '<p class="muted">Not completed yet.</p>'}
  `;
  document.getElementById("candidate-modal").style.display = "flex";
}

async function deleteCandidate(id) {
  if (!confirm("Delete this candidate's result permanently?")) return;
  await deleteDoc(doc(db, "candidates", id));
}

document.getElementById("candidate-modal-close").addEventListener("click", () => {
  document.getElementById("candidate-modal").style.display = "none";
});
document.getElementById("candidate-modal").addEventListener("click", (e) => {
  if (e.target.id === "candidate-modal") document.getElementById("candidate-modal").style.display = "none";
});

function startLiveListeners() {
  unsubLearning = onSnapshot(collection(db, "learning_sessions"), (snap) => {
    const sessions = {};
    snap.forEach((d) => { sessions[d.id] = d.data(); });
    renderLearningTable(sessions);
  });
  unsubCandidates = onSnapshot(collection(db, "candidates"), (snap) => {
    candidatesCache = {};
    snap.forEach((d) => { candidatesCache[d.id] = d.data(); });
    renderCandidatesTable();
  });
  unsubProfiles = onSnapshot(collection(db, "candidate_profiles"), (snap) => {
    const profiles = {};
    snap.forEach((d) => { profiles[d.id] = d.data(); });
    renderCandidateProfilesTable(profiles);
  });
}

// ---------- Passing score setting ----------

async function loadPassingPercent() {
  const snap = await getDocs(query(collection(db, "settings")));
  let value = 60;
  snap.forEach((d) => { if (d.id === "config" && typeof d.data().passingPercent === "number") value = d.data().passingPercent; });
  document.getElementById("passing-percent-input").value = value;
}

document.getElementById("save-passing-percent-btn").addEventListener("click", async () => {
  const value = Number(document.getElementById("passing-percent-input").value);
  const savedEl = document.getElementById("passing-percent-saved");
  if (Number.isNaN(value) || value < 0 || value > 100) {
    savedEl.textContent = "Enter a number between 0 and 100.";
    return;
  }
  await setDoc(doc(db, "settings", "config"), { passingPercent: value }, { merge: true });
  savedEl.textContent = "Saved.";
  setTimeout(() => { savedEl.textContent = ""; }, 2000);
});

// ---------- Candidates tab: aggregated profiles ----------

function renderCandidateProfilesTable(profiles) {
  const tbody = document.getElementById("candidate-profiles-body");
  tbody.innerHTML = "";
  const rows = Object.entries(profiles).sort((a, b) => {
    const ta = a[1].updatedAt?.toMillis ? a[1].updatedAt.toMillis() : 0;
    const tb = b[1].updatedAt?.toMillis ? b[1].updatedAt.toMillis() : 0;
    return tb - ta;
  });
  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="muted">No candidate records yet.</td></tr>`;
    return;
  }
  rows.forEach(([email, p]) => {
    const dayCells = [1, 2, 3, 4, 5].map((d) => {
      const r = p.perDay?.[d];
      if (!r) return `<td class="muted">—</td>`;
      const color = r.passed ? "var(--green)" : "var(--red)";
      return `<td style="color:${color};font-weight:600;">${r.score}/${r.maxScore}<br><span style="font-weight:400;font-size:11px;">${r.passed ? "PASS" : "FAIL"}</span></td>`;
    }).join("");
    const overall = p.allPassed
      ? `<span style="color:var(--green);font-weight:700;">All passed</span>`
      : `<span class="muted">In progress</span>`;
    const report = p.reportSentAt
      ? `<span style="color:var(--green);">Sent ${fmtTime(p.reportSentAt)}</span>`
      : p.allPassed
        ? `<button data-review="${email}">Review &amp; Send</button>`
        : `<span class="muted">—</span>`;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.name || "(no name)"}<br><span class="muted">${email}</span></td>
      ${dayCells}
      <td>${overall}</td>
      <td>${report}</td>
      <td><button class="danger" data-del-profile="${email}">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll("[data-del-profile]").forEach((b) => b.addEventListener("click", async () => {
    if (!confirm(`Delete all records for ${b.dataset.delProfile}? This cannot be undone.`)) return;
    await deleteDoc(doc(db, "candidate_profiles", b.dataset.delProfile));
  }));
  tbody.querySelectorAll("[data-review]").forEach((b) => b.addEventListener("click", () => openReportModal(profiles[b.dataset.review], b.dataset.review)));
}

// ---------- Completion report: review & send ----------

function openReportModal(profile, email) {
  let totalScore = 0;
  let totalMax = 0;
  const dayRows = [1, 2, 3, 4, 5].map((d) => {
    const r = profile.perDay[d];
    totalScore += r.score;
    totalMax += r.maxScore;
    return `<div class="score-row" style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);">
      <span>Day ${d} — ${DAY_NAMES[d]}</span><span>${r.score}/${r.maxScore} (${r.percent.toFixed(0)}%) — ${r.level}</span>
    </div>`;
  }).join("");
  const defaultLevel = computeLevel(totalScore, totalMax);
  const overallPercent = totalMax > 0 ? (totalScore / totalMax) * 100 : 0;

  const levelOptions = ["Advanced", "Intermediate", "Junior", "Beginner"]
    .map((l) => `<option value="${l}" ${l === defaultLevel ? "selected" : ""}>${l}</option>`).join("");

  document.getElementById("report-modal-body").innerHTML = `
    <h2>${profile.name}</h2>
    <p class="muted">${email}</p>
    ${dayRows}
    <p style="margin-top:14px;">Combined score: <strong>${totalScore} / ${totalMax} (${overallPercent.toFixed(1)}%)</strong></p>
    <label>Overall level (auto-computed, override if needed)</label>
    <select id="rf-level">${levelOptions}</select>
    <label>Ready to start work?</label>
    <select id="rf-ready">
      <option value="YES">YES</option>
      <option value="NO">NO</option>
    </select>
    <p id="rf-error" class="error-text"></p>
    <div class="form-actions">
      <button class="secondary" id="rf-cancel">Cancel</button>
      <button id="rf-send">Send Report</button>
    </div>
  `;
  document.getElementById("report-modal").style.display = "flex";

  document.getElementById("rf-cancel").addEventListener("click", () => {
    document.getElementById("report-modal").style.display = "none";
  });

  document.getElementById("rf-send").addEventListener("click", async () => {
    const errEl = document.getElementById("rf-error");
    const overallLevel = document.getElementById("rf-level").value;
    const readyToWork = document.getElementById("rf-ready").value;
    ensureEmailjs();
    if (!window.emailjs) {
      errEl.textContent = "EmailJS didn't load — check your connection and try again.";
      return;
    }
    const dayFields = {};
    [1, 2, 3, 4, 5].forEach((d) => {
      const r = profile.perDay[d];
      dayFields[`day${d}_topic`] = DAY_NAMES[d];
      dayFields[`day${d}_score`] = `${r.score} / ${r.maxScore} (${r.percent.toFixed(0)}%)`;
      dayFields[`day${d}_level`] = r.level;
    });
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_COMPLETION_TEMPLATE_ID, {
        to_email: MARKING_EMAIL_TO,
        candidate_name: profile.name,
        candidate_email: email,
        ...dayFields,
        overall_score: `${totalScore} / ${totalMax} (${overallPercent.toFixed(1)}%)`,
        overall_level: overallLevel,
        ready_to_work: readyToWork,
        completed_at: new Date().toLocaleString(),
      });
      await updateDoc(doc(db, "candidate_profiles", email), {
        overallLevel,
        readyToWork,
        reportSentAt: serverTimestamp(),
      });
      document.getElementById("report-modal").style.display = "none";
    } catch (e) {
      errEl.textContent = "Send failed: " + (e.text || e.message || JSON.stringify(e));
    }
  });
}

document.getElementById("report-modal-close").addEventListener("click", () => {
  document.getElementById("report-modal").style.display = "none";
});
document.getElementById("report-modal").addEventListener("click", (e) => {
  if (e.target.id === "report-modal") document.getElementById("report-modal").style.display = "none";
});

// ---------- Question bank ----------

let questionsCache = []; // [{id, ...fields}]
let activeDayFilter = "all";

function renderDayFilter() {
  const el = document.getElementById("day-filter");
  el.innerHTML = "";
  const all = document.createElement("button");
  all.textContent = "All days";
  all.className = activeDayFilter === "all" ? "active" : "";
  all.addEventListener("click", () => { activeDayFilter = "all"; renderDayFilter(); renderQuestionsTable(); });
  el.appendChild(all);
  Object.keys(DAY_NAMES).forEach((day) => {
    const btn = document.createElement("button");
    btn.textContent = `Day ${day}`;
    btn.className = String(activeDayFilter) === day ? "active" : "";
    btn.addEventListener("click", () => { activeDayFilter = Number(day); renderDayFilter(); renderQuestionsTable(); });
    el.appendChild(btn);
  });
}

function renderQuestionsTable() {
  const tbody = document.getElementById("questions-body");
  tbody.innerHTML = "";
  const rows = questionsCache
    .filter((q) => activeDayFilter === "all" || q.day === activeDayFilter)
    .sort((a, b) => a.day - b.day);
  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="muted">No questions.</td></tr>`;
    return;
  }
  rows.forEach((q) => {
    const tr = document.createElement("tr");
    const letter = ["A", "B", "C", "D"][q.correct];
    tr.innerHTML = `
      <td class="q-row-text"><span class="muted">Day ${q.day}</span><br>${q.q}</td>
      <td>${letter}) ${q.options?.[q.correct] ?? ""}</td>
      <td class="q-row-actions"><button class="secondary" data-edit="${q.id}">Edit</button><button class="danger" data-del="${q.id}">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll("[data-edit]").forEach((b) => b.addEventListener("click", () => openQuestionForm(b.dataset.edit)));
  tbody.querySelectorAll("[data-del]").forEach((b) => b.addEventListener("click", () => deleteQuestion(b.dataset.del)));
}

async function loadQuestions() {
  const snap = await getDocs(collection(db, "questions"));
  questionsCache = [];
  snap.forEach((d) => questionsCache.push({ id: d.id, ...d.data() }));
  renderDayFilter();
  renderQuestionsTable();
}

async function deleteQuestion(id) {
  if (!confirm("Delete this question permanently?")) return;
  await deleteDoc(doc(db, "questions", id));
  questionsCache = questionsCache.filter((q) => q.id !== id);
  renderQuestionsTable();
}

function openQuestionForm(id) {
  const existing = id ? questionsCache.find((q) => q.id === id) : null;
  const q = existing || { day: 1, topic: DAY_NAMES[1], q: "", options: ["", "", "", ""], correct: 0, why: "" };

  const dayOptions = Object.keys(DAY_NAMES)
    .map((d) => `<option value="${d}" ${Number(d) === q.day ? "selected" : ""}>Day ${d} — ${DAY_NAMES[d]}</option>`)
    .join("");

  const optionRows = [0, 1, 2, 3]
    .map((i) => `
      <div class="option-row">
        <input type="radio" name="correct" value="${i}" ${q.correct === i ? "checked" : ""} />
        <input type="text" data-opt="${i}" value="${(q.options[i] || "").replace(/"/g, "&quot;")}" placeholder="Option ${String.fromCharCode(65 + i)}" />
      </div>`)
    .join("");

  document.getElementById("question-modal-body").innerHTML = `
    <h2>${existing ? "Edit question" : "Add question"}</h2>
    <label>Day</label>
    <select id="qf-day">${dayOptions}</select>
    <label>Question</label>
    <textarea id="qf-question" rows="3">${q.q}</textarea>
    <label>Options (select the correct one)</label>
    ${optionRows}
    <label>Why (explanation shown in review, optional)</label>
    <textarea id="qf-why" rows="2">${q.why || ""}</textarea>
    <p id="qf-error" class="error-text"></p>
    <div class="form-actions">
      <button class="secondary" id="qf-cancel">Cancel</button>
      <button id="qf-save">${existing ? "Save changes" : "Add question"}</button>
    </div>
  `;
  document.getElementById("question-modal").style.display = "flex";

  document.getElementById("qf-cancel").addEventListener("click", () => {
    document.getElementById("question-modal").style.display = "none";
  });

  document.getElementById("qf-save").addEventListener("click", async () => {
    const day = Number(document.getElementById("qf-day").value);
    const questionText = document.getElementById("qf-question").value.trim();
    const why = document.getElementById("qf-why").value.trim();
    const options = [0, 1, 2, 3].map((i) => document.querySelector(`[data-opt="${i}"]`).value.trim());
    const correctRadio = document.querySelector('input[name="correct"]:checked');
    const errEl = document.getElementById("qf-error");

    if (!questionText || options.some((o) => !o) || !correctRadio) {
      errEl.textContent = "Fill in the question, all 4 options, and pick the correct one.";
      return;
    }

    const payload = { day, topic: DAY_NAMES[day], q: questionText, options, correct: Number(correctRadio.value), why };
    try {
      if (existing) {
        await updateDoc(doc(db, "questions", existing.id), payload);
      } else {
        await addDoc(collection(db, "questions"), payload);
      }
      document.getElementById("question-modal").style.display = "none";
      await loadQuestions();
    } catch (e) {
      errEl.textContent = "Save failed: " + e.message;
    }
  });
}

document.getElementById("seed-questions-btn").addEventListener("click", async () => {
  const statusEl = document.getElementById("seed-status");
  if (!confirm("This adds 250 questions (50 per day) to the question bank. Run this only once — running it again will duplicate them. Continue?")) return;
  statusEl.textContent = "Seeding… this takes a minute, don't close the tab.";
  document.getElementById("seed-questions-btn").disabled = true;
  try {
    const result = await seedPayrollQuestions(db, collection, addDoc);
    statusEl.textContent = `Done: ${result.ok} added, ${result.failed} failed (of ${result.total}).`;
    await loadQuestions();
  } catch (e) {
    statusEl.textContent = "Seeding failed: " + e.message;
  } finally {
    document.getElementById("seed-questions-btn").disabled = false;
  }
});

document.getElementById("add-question-btn").addEventListener("click", () => openQuestionForm(null));
document.getElementById("question-modal-close").addEventListener("click", () => {
  document.getElementById("question-modal").style.display = "none";
});
document.getElementById("question-modal").addEventListener("click", (e) => {
  if (e.target.id === "question-modal") document.getElementById("question-modal").style.display = "none";
});
