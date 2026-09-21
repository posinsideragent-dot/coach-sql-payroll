import { DAY_NAMES } from "./quiz.js";
import { DEMO_STEPS } from "./demo-steps.js";
import { LEARNING_MODULE_MINUTES } from "../firebase-config.js";
import { db, doc, setDoc, updateDoc, serverTimestamp } from "./firebase-init.js";

let timerInterval = null;

// unlockedDays: optional Set/array of day numbers that are clickable. If
// omitted, every day is clickable (used before candidate identity existed).
export function renderDayPicker(container, onPick, unlockedDays) {
  container.innerHTML = "";
  const unlocked = unlockedDays ? new Set(unlockedDays) : null;
  Object.keys(DAY_NAMES).sort((a, b) => a - b).forEach((day) => {
    const dayNum = Number(day);
    const isLocked = unlocked && !unlocked.has(dayNum);
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = isLocked
      ? `🔒 Day ${day} — ${DAY_NAMES[day]} (pass Day ${dayNum - 1} first)`
      : `Day ${day} — ${DAY_NAMES[day]}`;
    if (isLocked) {
      btn.disabled = true;
    } else {
      btn.addEventListener("click", () => onPick(dayNum));
    }
    container.appendChild(btn);
  });
}

// Flattens a day's demo into one ordered sequence of cards: an intro card
// (goal), one card per screenshot step (tagged with its lesson title), and
// a closing card (practice task) — so the candidate only ever sees one
// thing at a time instead of a long scrolling page.
function buildSequence(demo) {
  const sequence = [{ kind: "goal", text: demo.goal }];
  demo.lessons.forEach((lesson) => {
    lesson.steps.forEach((step) => {
      sequence.push({ kind: "step", lessonTitle: lesson.title, ...step });
    });
  });
  sequence.push({ kind: "practice", text: demo.practiceTask });
  return sequence;
}

function renderCard(container, card) {
  container.innerHTML = "";

  if (card.kind === "goal") {
    const p = document.createElement("p");
    p.className = "lesson-goal";
    p.innerHTML = `<strong>Goal:</strong> ${card.text}`;
    container.appendChild(p);
    return;
  }

  if (card.kind === "practice") {
    const p = document.createElement("p");
    p.className = "practice-task";
    p.innerHTML = `<strong>You'll practice:</strong> ${card.text}`;
    container.appendChild(p);
    return;
  }

  const title = document.createElement("div");
  title.className = "lesson-title";
  title.textContent = card.lessonTitle;
  container.appendChild(title);

  const stepEl = document.createElement("div");
  stepEl.className = "demo-step";
  if (card.image) {
    const img = document.createElement("img");
    img.src = card.image;
    img.alt = card.caption || card.lessonTitle;
    stepEl.appendChild(img);
  }

  const capWrap = document.createElement("div");
  capWrap.className = "demo-caption-wrap";
  const cap = document.createElement("p");
  cap.className = "demo-caption";
  cap.textContent = card.caption;
  capWrap.appendChild(cap);

  if (card.explanation) {
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "why-toggle";
    toggle.textContent = "Why it matters ▾";
    const exp = document.createElement("p");
    exp.className = "demo-explanation";
    exp.textContent = card.explanation;
    exp.hidden = true;
    toggle.addEventListener("click", () => {
      exp.hidden = !exp.hidden;
      toggle.textContent = exp.hidden ? "Why it matters ▾" : "Why it matters ▴";
    });
    capWrap.appendChild(toggle);
    capWrap.appendChild(exp);
  }

  stepEl.appendChild(capWrap);
  container.appendChild(stepEl);
}

// Live progress reporting to Firestore (learning_sessions) is best-effort —
// a candidate with no login writes their own session doc, same pattern as
// the candidates collection. A write failure here must never block or
// error out the candidate's own learning flow.
async function pushLearningUpdate(sessionId, fields) {
  try {
    await updateDoc(doc(db, "learning_sessions", sessionId), fields);
  } catch (e) {
    console.error("learning progress push failed", e);
  }
}

export function startLearningModule(name, email, day, els, onDone) {
  const demo = DEMO_STEPS[day];
  els.topic.textContent = `Day ${day} — ${demo.topic}`;

  const sequence = buildSequence(demo);
  let index = 0;
  const sessionId = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  setDoc(doc(db, "learning_sessions", sessionId), {
    name,
    email,
    day,
    topic: demo.topic,
    status: "in-progress",
    currentStepIndex: 0,
    totalSteps: sequence.length,
    startedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    completedAt: null,
  }).catch((e) => console.error("learning session create failed", e));

  let firstRender = true;
  function renderCurrent() {
    renderCard(els.content, sequence[index]);
    els.stepLabel.textContent = `${index + 1} / ${sequence.length}`;
    els.progressFill.style.width = `${(index / (sequence.length - 1)) * 100}%`;
    els.prevBtn.style.visibility = index === 0 ? "hidden" : "visible";
    els.nextBtn.textContent = index === sequence.length - 1 ? "Done" : "Next";
    // Skip the push on the very first render — the initial setDoc above
    // already recorded currentStepIndex 0, and pushing here too risks a
    // race where this update reaches Firestore before that create does.
    if (firstRender) { firstRender = false; return; }
    pushLearningUpdate(sessionId, { currentStepIndex: index, updatedAt: serverTimestamp() });
  }

  els.prevBtn.onclick = () => {
    if (index > 0) { index -= 1; renderCurrent(); }
  };
  els.nextBtn.onclick = () => {
    if (index < sequence.length - 1) { index += 1; renderCurrent(); }
    else finishOnce();
  };

  let done = false;
  function finishOnce() {
    if (done) return;
    done = true;
    clearInterval(timerInterval);
    pushLearningUpdate(sessionId, { status: "completed", completedAt: serverTimestamp() });
    onDone();
  }

  els.readyBtn.onclick = finishOnce;

  const timerEnd = Date.now() + LEARNING_MODULE_MINUTES * 60 * 1000;
  const tick = () => {
    const ms = Math.max(0, timerEnd - Date.now());
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    els.timer.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    if (ms <= 0) finishOnce();
  };
  renderCurrent();
  tick();
  timerInterval = setInterval(tick, 500);
}
