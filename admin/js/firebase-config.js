// A separate Firebase project from the SQL Account app (assistant-3d5d4) —
// this is its own project, its own Firestore database, its own EmailJS
// templates. Paste in the real values once the new Firebase project exists.
// This admin site is a separate deployment (Firebase Hosting) from the
// candidate site (coach-sql-payroll) so it never runs inside SEB, but it
// talks to the same Firestore database as that candidate site.
export const firebaseConfig = {
  apiKey: "AIzaSyDMv8GvRGnJAd-1NLjpNdg_wLsNqyKYU9g",
  authDomain: "coach-sql-payroll.firebaseapp.com",
  projectId: "coach-sql-payroll",
  storageBucket: "coach-sql-payroll.firebasestorage.app",
  messagingSenderId: "121383571640",
  appId: "1:121383571640:web:6309e4749c63056415e44d",
};

// Same EmailJS account/service as the SQL Account app (free-tier quota is
// shared), but its own template for the "candidate passed all 5 days"
// completion report. Sending it is an admin-approved action from this
// site's Candidates tab (not automatic), so this is the only place that
// actually calls emailjs.send() with it.
export const EMAILJS_SERVICE_ID = "service_4pvav1n";
export const EMAILJS_COMPLETION_TEMPLATE_ID = "template_oc3xwuf";
export const EMAILJS_PUBLIC_KEY = "qEx9SNi8cHxY8jjxg";
export const MARKING_EMAIL_TO = "posinsideragent@gmail.com";
