import { MAILER_URL, MAILER_SECRET, MARKING_EMAIL_TO } from "../firebase-config.js";
import { sendMail } from "./mailer.js";

// Percentage-based so the same tiers apply whether the day's max is 20, 40, etc.
const LEVELS = [
  { min: 90, label: "Advanced" },
  { min: 75, label: "Intermediate" },
  { min: 60, label: "Junior" },
  { min: 0, label: "Beginner" },
];
const LEVEL_COLORS = {
  Advanced: { bg: "#e6f4ea", fg: "#1b7f1b" },
  Intermediate: { bg: "#e8f0fe", fg: "#1a56db" },
  Junior: { bg: "#fff4e5", fg: "#b26a00" },
  Beginner: { bg: "#fdecea", fg: "#b00020" },
};

export function computeLevel(score, maxScore) {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  return LEVELS.find((l) => pct >= l.min).label;
}

function levelBadge(level) {
  const c = LEVEL_COLORS[level] || LEVEL_COLORS.Beginner;
  return `<span style="background:${c.bg};color:${c.fg};font-size:12px;font-weight:700;padding:4px 10px;border-radius:20px;">${level}</span>`;
}

// Never throws — a failed or SEB-blocked send must never delay or error out
// the candidate's own score screen.
export async function sendMarkingEmail({ name, day, score, maxScore, scoreByDay, flagsCount }) {
  try {
    const level = computeLevel(score, maxScore);
    const dayEntry = scoreByDay ? Object.entries(scoreByDay)[0] : null;
    const topic = dayEntry ? dayEntry[1].topic : "";
    const displayName = name || "(no name)";
    const submittedAt = new Date().toLocaleString();
    const color = (LEVEL_COLORS[level] || LEVEL_COLORS.Beginner).fg;

    const subject = `SQL Payroll — ${displayName}: Day ${day} Result`;

    const body = [
      `Candidate: ${displayName}`,
      `Day ${day} — ${topic}`,
      `Score: ${score} / ${maxScore} (${level})`,
      `Proctoring flags: ${flagsCount ?? 0}`,
      `Submitted: ${submittedAt}`,
    ].join("\n");

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;">
        <div style="background:#1f4e79;color:#fff;padding:16px 20px;border-radius:8px 8px 0 0;">
          <div style="font-size:12px;letter-spacing:0.5px;opacity:0.8;text-transform:uppercase;">SQL Payroll &middot; Onboarding</div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">Day ${day} Result</div>
        </div>
        <div style="border:1px solid #e0e2e6;border-top:none;border-radius:0 0 8px 8px;padding:20px;">
          <div style="font-size:16px;font-weight:600;color:#222;">${displayName}</div>
          <div style="color:#666;font-size:13px;margin-bottom:16px;">${topic}</div>
          <table cellpadding="0" cellspacing="0" style="margin-bottom:16px;"><tr>
            <td style="font-size:32px;font-weight:800;color:${color};padding-right:10px;">${score}/${maxScore}</td>
            <td>${levelBadge(level)}</td>
          </tr></table>
          <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:13px;color:#444;">
            <tr><td style="padding:6px 0;border-top:1px solid #eee;color:#888;">Proctoring flags</td><td style="padding:6px 0;border-top:1px solid #eee;text-align:right;">${flagsCount ?? 0}</td></tr>
            <tr><td style="padding:6px 0;border-top:1px solid #eee;color:#888;">Submitted</td><td style="padding:6px 0;border-top:1px solid #eee;text-align:right;">${submittedAt}</td></tr>
          </table>
        </div>
      </div>
    `;

    await sendMail(MAILER_URL, MAILER_SECRET, { to: MARKING_EMAIL_TO, subject, body, html });
  } catch (e) {
    console.error("marking email failed", e);
  }
}
