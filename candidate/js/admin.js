import { db, collection, onSnapshot } from "./firebase-init.js";
import { ADMIN_PIN } from "../firebase-config.js";

let candidates = {}; // id -> data

function fmtTime(ts) {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString();
}

function renderTable() {
  const tbody = document.getElementById("candidates-body");
  tbody.innerHTML = "";
  const rows = Object.entries(candidates).sort((a, b) => {
    const ta = a[1].startedAt?.toMillis ? a[1].startedAt.toMillis() : 0;
    const tb = b[1].startedAt?.toMillis ? b[1].startedAt.toMillis() : 0;
    return tb - ta;
  });

  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="muted">No attempts yet.</td></tr>`;
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
      <td>${progressText}</td>
      <td>${scoreText}</td>
      <td>${flagCount > 0 ? `<span class="flag-pill">${flagCount} flag${flagCount === 1 ? "" : "s"}</span>` : "—"}</td>
      <td>${fmtTime(c.startedAt)}</td>
    `;
    tr.style.cursor = "pointer";
    tr.addEventListener("click", () => openDetail(id));
    tbody.appendChild(tr);
  });
}

function openDetail(id) {
  const c = candidates[id];
  const modal = document.getElementById("detail-modal");
  const body = document.getElementById("detail-body");

  let dayRows = "";
  if (c.scoreByDay) {
    Object.entries(c.scoreByDay).forEach(([day, s]) => {
      dayRows += `<div class="score-row"><span>Day ${day} — ${s.topic}</span><span>${s.correct} / ${s.total}</span></div>`;
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
        <div style="font-size:14px;">
          Answered: <b style="color:${a.isCorrect ? "#1b7f1b" : "#b00020"}">${a.selectedLetter ?? "(blank)"}</b>
          &nbsp;·&nbsp; Correct: <b>${a.correctLetter}</b>
        </div>
      </div>`;
  });

  body.innerHTML = `
    <h2>${c.name || "(no name)"}</h2>
    <p class="muted">Started ${fmtTime(c.startedAt)} · ${c.status === "completed" ? "Completed " + fmtTime(c.completedAt) : "In progress"}</p>
    ${c.status === "completed" ? `<div class="score-big">${c.score} / ${c.maxScore}</div>` : ""}
    <h2 style="margin-top:20px;">Score by day</h2>
    ${dayRows || '<p class="muted">Not completed yet.</p>'}
    <h2 style="margin-top:20px;">Proctoring flags</h2>
    ${flagsHtml}
    <h2 style="margin-top:20px;">Answer review</h2>
    ${answersHtml || '<p class="muted">Not completed yet.</p>'}
  `;
  modal.style.display = "flex";
}

document.getElementById("detail-close").addEventListener("click", () => {
  document.getElementById("detail-modal").style.display = "none";
});
document.getElementById("detail-modal").addEventListener("click", (e) => {
  if (e.target.id === "detail-modal") document.getElementById("detail-modal").style.display = "none";
});

function startLiveListener() {
  onSnapshot(collection(db, "candidates"), (snap) => {
    candidates = {};
    snap.forEach((d) => { candidates[d.id] = d.data(); });
    renderTable();
  });
}

document.getElementById("pin-submit").addEventListener("click", () => {
  const val = document.getElementById("pin-input").value.trim();
  if (val === ADMIN_PIN) {
    document.getElementById("pin-gate").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    startLiveListener();
  } else {
    document.getElementById("pin-error").textContent = "Wrong PIN.";
  }
});
document.getElementById("pin-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("pin-submit").click();
});
