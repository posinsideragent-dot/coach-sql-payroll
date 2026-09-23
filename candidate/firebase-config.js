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

// Email sending (marking sheet + completion report) goes through a small
// Google Apps Script Web App you deploy yourself under your own Gmail
// account — no third-party email vendor, no per-template caps to worry
// about. See ../coach-sql/mailer/README.md (same deployment, shared by
// every product) for what it is and step-by-step deploy instructions.
export const MAILER_URL = "https://script.google.com/macros/s/AKfycbyddpzS4M7uQQuTDuCpVkq-u88ywKRqgpf-hYI7WMCStr5WAXQOzxiJc1xueMAUbwrBmA/exec";
export const MAILER_SECRET = "posinsider@6855";
export const MARKING_EMAIL_TO = "posinsideragent@gmail.com";
