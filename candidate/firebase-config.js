// Copy this file to firebase-config.js and fill in YOUR Firebase project's values.
// Get these from: Firebase Console -> Project settings (gear icon) -> General ->
// "Your apps" -> Web app -> SDK setup and configuration -> Config.
//
// These values are safe to publish in client-side code — Firebase protects your
// data with Firestore Security Rules (see firestore.rules), not by hiding this
// config. Do NOT put your Firebase Admin/service-account key here — that one
// actually is secret and does not belong in a browser at all.

export const firebaseConfig = {
  apiKey: "AIzaSyDMv8GvRGnJAd-1NLjpNdg_wLsNqyKYU9g",
  authDomain: "coach-sql-payroll.firebaseapp.com",
  projectId: "coach-sql-payroll",
  storageBucket: "coach-sql-payroll.firebasestorage.app",
  messagingSenderId: "121383571640",
  appId: "1:121383571640:web:6309e4749c63056415e44d",
};

// Change this to whatever PIN you want admins to type on the dashboard.
// This is a light deterrent only, same as your existing LMS's admin PIN —
// not real security. Anyone with this file (or the deployed site's source)
// can read it.
export const ADMIN_PIN = "2468";

// How many questions to serve per attempt, picked randomly from the chosen
// onboarding day's bank only (the candidate picks their day on test.html,
// so every attempt is scoped to one day).
export const QUESTIONS_PER_DAY = 20;
export const TIME_LIMIT_MINUTES = 50;
export const POINTS_PER_QUESTION = 4; // 20 questions x 4 = 80 points per attempt

// How long the candidate gets to work through that day's visual demo
// walkthrough (real screenshots pulled from the SQL Payroll knowledge base,
// see js/demo-steps.js) before it auto-advances to the quiz. Learning and
// testing are separate pages (learn.html / test.html), so this is purely
// the learn.html timer. An "I'm ready" button lets a candidate move on
// early if they finish sooner.
export const LEARNING_MODULE_MINUTES = 20;

// Fill these in after creating a free account at https://www.emailjs.com/ —
// add an Email Service (e.g. connect Gmail) and an Email Template there, then
// paste the three IDs it gives you. Used to auto-send a marking-sheet email
// the moment a candidate finishes. You'll also need to vendor EmailJS's SDK
// locally (see vendor/emailjs/) — see README for why (same reason as Firebase).
export const EMAILJS_SERVICE_ID = "";
export const EMAILJS_TEMPLATE_ID = "";
export const EMAILJS_PUBLIC_KEY = "";
export const MARKING_EMAIL_TO = "posinsideragent@gmail.com";

// A SECOND EmailJS template, for the one-time "candidate passed all 5 days"
// completion report — the full report goes directly in the email body as
// plain fields (candidate_name, candidate_email, day1_topic/score/level
// through day5_..., overall_score, overall_level, ready_to_work,
// completed_at) — no PDF/file attachment, since that needs either EmailJS's
// paid plan or Firebase's paid Blaze plan for Storage, neither of which
// this app uses. Create this as its own template in the same EmailJS account.
export const EMAILJS_COMPLETION_TEMPLATE_ID = "";
