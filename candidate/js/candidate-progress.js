import { db, doc, getDoc, setDoc, serverTimestamp } from "./firebase-init.js";

const DEFAULT_PASSING_PERCENT = 60;

export async function getPassingPercent() {
  try {
    const snap = await getDoc(doc(db, "settings", "config"));
    if (snap.exists() && typeof snap.data().passingPercent === "number") {
      return snap.data().passingPercent;
    }
  } catch (e) {
    console.error("settings fetch failed", e);
  }
  return DEFAULT_PASSING_PERCENT;
}

export async function getCandidateProfile(email) {
  try {
    const snap = await getDoc(doc(db, "candidate_profiles", email));
    if (snap.exists()) return snap.data();
  } catch (e) {
    console.error("profile fetch failed", e);
  }
  return null;
}

// Day 1 is always open. Day N+1 unlocks once day N has ever been passed —
// passing is sticky (a later lower-scoring retry never re-locks a day).
export function unlockedDaysFromProfile(profile) {
  const unlocked = new Set([1]);
  for (let d = 1; d < 5; d++) {
    if (profile?.perDay?.[d]?.passed) unlocked.add(d + 1);
    else break;
  }
  return unlocked;
}

// Records one quiz attempt against the candidate's profile: latest
// score/level always shown, but "passed" is sticky — once true for a day,
// it stays true even if a later practice retry scores lower. Never throws;
// a write failure here must not block the candidate's own score screen.
export async function recordAttemptResult({ name, email, day, score, maxScore, level }) {
  const percent = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const passingPercent = await getPassingPercent();
  const passedThisAttempt = percent >= passingPercent;

  try {
    const existing = await getCandidateProfile(email);
    const perDay = { ...(existing?.perDay || {}) };
    const prev = perDay[day];

    perDay[day] = {
      score,
      maxScore,
      percent,
      level,
      passed: Boolean(prev?.passed) || passedThisAttempt,
      attempts: (prev?.attempts || 0) + 1,
      lastAttemptAt: new Date().toISOString(),
    };

    const allPassed = [1, 2, 3, 4, 5].every((d) => perDay[d]?.passed);

    await setDoc(doc(db, "candidate_profiles", email), {
      name,
      email,
      perDay,
      allPassed,
      updatedAt: serverTimestamp(),
    }, { merge: true });

    return { passed: passedThisAttempt, passingPercent, allPassed, profile: { ...existing, name, email, perDay, allPassed } };
  } catch (e) {
    console.error("profile update failed", e);
    return { passed: passedThisAttempt, passingPercent, allPassed: false, profile: null };
  }
}
