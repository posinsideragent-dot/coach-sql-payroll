import { MAILER_URL, MAILER_SECRET, MARKING_EMAIL_TO } from "../firebase-config.js";
import { sendMail } from "./mailer.js";

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

// Never throws — a failed or SEB-blocked send must never delay or error out
// the candidate's own score screen.
export async function sendMarkingEmail({ name, day, score, maxScore, scoreByDay, flagsCount }) {
  try {
    const level = computeLevel(score, maxScore);
    const dayEntry = scoreByDay ? Object.entries(scoreByDay)[0] : null;
    const topic = dayEntry ? dayEntry[1].topic : "";

    const subject = `[SQL Payroll] ${name || "(no name)"} — Day ${day} marking sheet`;
    const body = [
      `Candidate: ${name || "(no name)"}`,
      `Day: ${day} — ${topic}`,
      `Score: ${score} / ${maxScore}`,
      `Level: ${level}`,
      `Proctoring flags: ${flagsCount ?? 0}`,
      `Submitted: ${new Date().toLocaleString()}`,
    ].join("\n");

    await sendMail(MAILER_URL, MAILER_SECRET, { to: MARKING_EMAIL_TO, subject, body });
  } catch (e) {
    console.error("marking email failed", e);
  }
}
