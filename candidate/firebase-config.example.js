// Copy this file to firebase-config.js and fill in YOUR Firebase project's values.
// Get these from: Firebase Console -> Project settings (gear icon) -> General ->
// "Your apps" -> Web app -> SDK setup and configuration -> Config.
//
// These values are safe to publish in client-side code — Firebase protects your
// data with Firestore Security Rules (see firestore.rules), not by hiding this
// config. Do NOT put your Firebase Admin/service-account key here — that one
// actually is secret and does not belong in a browser at all.

export const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID",
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

// Email sending (marking sheet + completion report) goes through a small
// Google Apps Script Web App you deploy yourself under your own Gmail
// account — no third-party email vendor. See
// ../coach-sql/mailer/README.md (same deployment, shared by every product)
// for what it is and step-by-step deploy instructions.
export const MAILER_URL = "";
export const MAILER_SECRET = "";
export const MARKING_EMAIL_TO = "posinsideragent@gmail.com";
