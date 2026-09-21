# coach-sql-admin

A separate admin site for the coach-sql SQL Payroll Support onboarding app — deliberately **not** part of the candidate-facing GitHub Pages site, so it never has any reason to run inside SEB. It talks to the exact same Firebase project (`assistant-3d5d4`) and Firestore database as the candidate site.

What it does:
- **Live Progress tab** — real-time view of who's learning what (which day, which step) and who's testing (progress, score, proctoring flags), replacing the old PIN-gated `admin.html` on the candidate site.
- **Questions tab** — add/edit/delete questions in the live question bank (Firestore `questions` collection). Candidates' quizzes read from this same collection, so edits here take effect immediately, no code deploy needed.

Protected by real Firebase Authentication (email/password), not just a PIN — this is what actually stops a random visitor from rewriting your answer key.

## 1. One-time setup

1. **Enable Email/Password sign-in**: Firebase Console → your project → Build → Authentication → Get started → Sign-in method → Email/Password → Enable.
2. **Create your admin account**: Authentication → Users tab → Add user → enter your email + a password. This is the login you'll use here.
3. **Make sure Firestore rules are the final (locked-down) version** — see `../coach-sql/firestore.rules` in the candidate repo. Questions and deletes should require `request.auth != null`.

## 2. Deploy

From inside this folder:

```bash
npx firebase-tools login
npx firebase-tools deploy --only hosting
```

`login` opens a browser window once to authorize the Firebase CLI with your Google account (the same one that owns the Firebase project) — only needed the first time. `deploy` publishes this folder to Firebase Hosting under your project's default URL (shown in the deploy output, something like `https://assistant-3d5d4.web.app`).

Run `deploy` again any time you change these files to push an update.

## 3. Day-to-day use

Open the Hosting URL, sign in with the admin account you created in step 1, and you're in — no PIN, no SEB, works in any normal browser.
