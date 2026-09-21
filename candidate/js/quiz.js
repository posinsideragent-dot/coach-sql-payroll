import { startProctoring, requestFullscreen } from "./proctor.js";
import {
  db, doc, setDoc, updateDoc, arrayUnion, serverTimestamp,
  collection, query, where, getDocs,
} from "./firebase-init.js";
import { QUESTIONS_PER_DAY, TIME_LIMIT_MINUTES, POINTS_PER_QUESTION } from "../firebase-config.js";

const LETTERS = ["A", "B", "C", "D"];
export const DAY_NAMES = {
  1: "Getting Started & Employee Setup",
  2: "Leave & HR Modules",
  3: "Payroll Processing",
  4: "Statutory & Compliance",
  5: "Reports, Tools & Troubleshooting",
};

let state = null; // { candidateId, name, day, picked, currentIndex, answers, timerEnd, flagsBuffer }

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Questions live in Firestore (collection "questions") so an admin can edit
// the bank without a code deploy — see the separate admin site. Each
// attempt fetches that day's full pool fresh, then picks + shuffles
// client-side, same as when the bank was a static bundled file.
async function fetchQuestionsForDay(day) {
  const snap = await getDocs(query(collection(db, "questions"), where("day", "==", day)));
  const bank = [];
  snap.forEach((d) => bank.push({ id: d.id, ...d.data() }));
  return bank;
}

async function pickQuestionsForAttempt(day) {
  const bank = await fetchQuestionsForDay(day);
  const picked = shuffle(bank).slice(0, QUESTIONS_PER_DAY);
  // Also shuffle each question's own option order so the correct letter varies.
  return picked.map((q) => {
    const order = shuffle([0, 1, 2, 3]);
    return {
      bankId: q.id,
      day: q.day,
      topic: q.topic,
      question: q.q,
      options: order.map((i) => q.options[i]),
      correctDisplayIndex: order.indexOf(q.correct),
    };
  });
}

async function pushFlag(flag) {
  if (!state) return;
  state.flagsBuffer.push(flag);
  try {
    await updateDoc(doc(db, "candidates", state.candidateId), {
      flags: arrayUnion({ ...flag, at: new Date(flag.at).toISOString() }),
    });
  } catch (e) {
    console.error("flag push failed", e);
  }
}

export async function startAttempt(name, email, day) {
  const candidateId = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const picked = await pickQuestionsForAttempt(day);

  state = {
    candidateId,
    name,
    email,
    day,
    picked,
    currentIndex: 0,
    answers: new Array(picked.length).fill(null),
    timerEnd: Date.now() + TIME_LIMIT_MINUTES * 60 * 1000,
    flagsBuffer: [],
  };

  await setDoc(doc(db, "candidates", candidateId), {
    name,
    email,
    day,
    status: "in-progress",
    startedAt: serverTimestamp(),
    completedAt: null,
    timeLimitMinutes: TIME_LIMIT_MINUTES,
    totalQuestions: picked.length,
    currentIndex: 0,
    flags: [],
    score: null,
    scoreByDay: null,
  });

  startProctoring(pushFlag);
  await requestFullscreen();

  return state;
}

export function getState() {
  return state;
}

export function getCurrentQuestion() {
  return state.picked[state.currentIndex];
}

export async function answerCurrent(displayIndex) {
  state.answers[state.currentIndex] = displayIndex;
  try {
    await updateDoc(doc(db, "candidates", state.candidateId), {
      currentIndex: state.currentIndex,
    });
  } catch (e) {
    console.error("progress push failed", e);
  }
}

export function goNext() {
  if (state.currentIndex < state.picked.length - 1) state.currentIndex += 1;
}
export function goPrev() {
  if (state.currentIndex > 0) state.currentIndex -= 1;
}

export function timeRemainingMs() {
  return Math.max(0, state.timerEnd - Date.now());
}

export async function submitAttempt() {
  const scoreByDay = {};
  let score = 0;
  const answerDetail = state.picked.map((q, i) => {
    const selected = state.answers[i];
    const isCorrect = selected === q.correctDisplayIndex;
    if (isCorrect) score += POINTS_PER_QUESTION;
    scoreByDay[q.day] ||= { correct: 0, total: 0, topic: DAY_NAMES[q.day] };
    scoreByDay[q.day].total += 1;
    if (isCorrect) scoreByDay[q.day].correct += 1;
    return {
      day: q.day,
      question: q.question,
      options: q.options,
      selectedLetter: selected === null ? null : LETTERS[selected],
      correctLetter: LETTERS[q.correctDisplayIndex],
      isCorrect,
    };
  });

  const maxScore = state.picked.length * POINTS_PER_QUESTION;

  await updateDoc(doc(db, "candidates", state.candidateId), {
    status: "completed",
    completedAt: serverTimestamp(),
    score,
    maxScore,
    scoreByDay,
    answers: answerDetail,
  });

  try {
    if (document.fullscreenElement) await document.exitFullscreen();
  } catch (e) {
    /* ignore */
  }

  return {
    score,
    maxScore,
    scoreByDay,
    name: state.name,
    email: state.email,
    day: state.day,
    answers: answerDetail,
    flagsCount: state.flagsBuffer.length,
  };
}
