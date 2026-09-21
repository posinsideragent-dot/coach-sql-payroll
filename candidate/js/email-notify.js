import {
  EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, MARKING_EMAIL_TO,
} from "../firebase-config.js";

// Percentage-based so the same tiers apply whether the day's max is 20, 40, etc.
const LEVELS = [
  { min: 90, label: "Advanced" },
  { min: 75, label: "Intermediate" },
  { min: 60, label: "Junior" },
  { min: 0, label: "Beginner" },
];

export function computeLevel(score, maxScore) {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  return LEVELS.find((l) => pct >= l.min).label;
}

let initialized = false;
function ensureInit() {
  if (initialized) return;
  // vendor/emailjs/email.min.js (loaded via <script> in index.html) exposes
  // window.emailjs, the standard integration pattern for EmailJS's browser SDK.
  if (window.emailjs && typeof window.emailjs.init === "function") {
    window.emailjs.init(EMAILJS_PUBLIC_KEY);
    initialized = true;
  }
}

// Never throws — a failed or SEB-blocked send must never delay or error out
// the candidate's own score screen.
export async function sendMarkingEmail({ name, day, score, maxScore, scoreByDay, flagsCount }) {
  try {
    ensureInit();
    if (!window.emailjs) {
      console.warn("EmailJS SDK not loaded — skipping marking email.");
      return;
    }
    const level = computeLevel(score, maxScore);
    const dayEntry = scoreByDay ? Object.entries(scoreByDay)[0] : null;
    const topic = dayEntry ? dayEntry[1].topic : "";

    await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: MARKING_EMAIL_TO,
      candidate_name: name || "(no name)",
      day,
      topic,
      score,
      max_score: maxScore,
      level,
      flags_count: flagsCount ?? 0,
      submitted_at: new Date().toLocaleString(),
    });
  } catch (e) {
    console.error("marking email failed", e);
  }
}
