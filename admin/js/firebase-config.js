// A separate Firebase project from the SQL Account app (assistant-3d5d4) —
// this is its own project, its own Firestore database. This admin site is
// a separate deployment (Firebase Hosting) from the candidate site
// (coach-sql-payroll) so it never runs inside SEB, but it talks to the
// same Firestore database as that candidate site.
export const firebaseConfig = {
  apiKey: "AIzaSyDMv8GvRGnJAd-1NLjpNdg_wLsNqyKYU9g",
  authDomain: "coach-sql-payroll.firebaseapp.com",
  projectId: "coach-sql-payroll",
  storageBucket: "coach-sql-payroll.firebasestorage.app",
  messagingSenderId: "121383571640",
  appId: "1:121383571640:web:6309e4749c63056415e44d",
};

// Same Apps Script mailer as every other product (../coach-sql/mailer/) —
// used both for the marking-sheet email (candidate site) and, from this
// admin dashboard's Candidates tab, the admin-approved "completion report"
// send once a candidate has passed all 5 days.
export const MAILER_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
export const MAILER_SECRET = "PASTE_YOUR_SHARED_SECRET_HERE";
export const MARKING_EMAIL_TO = "posinsideragent@gmail.com";
