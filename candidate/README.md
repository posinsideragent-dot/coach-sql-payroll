# coach-sql — SQL Payroll Support Hard Mode Assessment

A standalone, no-login learn-then-test app for SQL Payroll Support onboarding.
Plain HTML/JS, hosted free on GitHub Pages, with a live Firestore database so
the admin dashboard updates in real time as candidates progress. No Claude
Artifact involved — this runs entirely as your own site.

The candidate picks which onboarding day they're being tested on, works
through a real tutorial for that topic (real lesson content pulled from the
SQL Payroll knowledge base — see `js/tutorials.js` — not just quiz-answer
snippets, budgeted at roughly 30-40 minutes of reading), then takes a
20-question quiz drawn from that day's 20-question bank (100 questions
total, 20 per onboarding day, in `js/questions.js`) — reshuffling both
question order and option order, and auto-scoring per attempt. Both the
tutorial and the quiz comfortably fit inside a single 9am-6pm working day,
with plenty of time left over for real hands-on practice in the software.
Scoring is turned into a level (Advanced / Intermediate / Junior / Beginner,
by percentage) the moment they finish, and a marking-sheet email with their
name, score, day, and level is sent automatically. Meant to run inside SEB
(Safe Exam Browser) as the lockdown layer, the same way your existing SQL
Account Academy LMS does — this app's own in-page tab-switch/fullscreen/
copy-paste logging is a second layer on top of that, not a replacement for it.

## 1. Firebase setup (you said you already have a project)

1. Go to your Firebase project → **Build → Firestore Database** → if you
   haven't already, click **Create database** (choose "production mode",
   any region close to your users).
2. Go to **Firestore Database → Rules**, and paste in the contents of
   `firestore.rules` from this repo, then **Publish**.
3. Go to **Project settings** (gear icon) → **General** → scroll to
   **Your apps**. If you don't have a Web app yet, click the `</>` icon to
   add one (any nickname, no hosting needed). Copy the `firebaseConfig`
   object it shows you.
4. In this project folder, copy `firebase-config.example.js` to
   `firebase-config.js`, and paste your real values in. This file is safe
   to commit — Firebase config isn't a secret, your Firestore Rules are
   what actually protects the data.
5. While you're in that file, you can also change `ADMIN_PIN`,
   `QUESTIONS_PER_DAY`, `TIME_LIMIT_MINUTES`, `POINTS_PER_QUESTION`, and
   `LEARNING_MODULE_MINUTES` if you want different defaults.

## 2. Marking-sheet email setup (EmailJS)

The app emails a marking sheet to `posinsideragent@gmail.com` (set via
`MARKING_EMAIL_TO` in `firebase-config.js`) the moment a candidate finishes.
See `vendor/emailjs/README.md` for the full steps — in short: create a free
EmailJS account, add an Email Service + Template, paste the three IDs into
`firebase-config.js` (`EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`,
`EMAILJS_PUBLIC_KEY`), and download EmailJS's SDK file into
`vendor/emailjs/email.min.js` (it has to be a local file, not a CDN
`<script>` tag, for the same SEB URL-filtering reason Firebase is vendored
locally). Until that file is in place, the app still works normally — it
just skips the email.

## 3. Push to GitHub

From inside this folder:

```bash
git init
git add .
git commit -m "Initial coach-sql hard mode assessment"
git branch -M main
git remote add origin https://github.com/posinsideragent-dot/coach-sql.git
git push -u origin main
```

(If the repo already has a commit in it from being created with a README on
GitHub's side, run `git pull origin main --allow-unrelated-histories` before
the push, and resolve any conflict on `README.md` by keeping this one.)

## 4. Turn on GitHub Pages

1. On GitHub, open the repo → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Save.
4. GitHub will give you a URL like
   `https://posinsideragent-dot.github.io/coach-sql/` — that's the
   candidate link (`index.html`) and the admin link is the same with
   `/admin.html` on the end.

## 5. Wire it into SEB

Point your existing `.seb` config's Start URL at the GitHub Pages
candidate link instead of the old LMS artifact link — everything else in
your SEB setup (Prohibited Processes list, quit password) carries over
unchanged. See `seb-lockdown-guide.md` / `seb-lockdown-guide-sql-account-academy.md`
in your project notes for the full SEB steps if you need a refresher.

## Known limitations (read before using with real hires)

- **No real backend.** All scoring happens in the candidate's own browser,
  and the correct answers are present in this app's JS source. A candidate
  who opens browser devtools and reads the code could find the answers.
  This is the same category of limitation your plan.md already calls out
  for browser-based proctoring generally — SEB blocking devtools/other apps
  at the OS level is what actually closes this gap, not this app by itself.
- **Firestore rules are wide open** (anyone with the site can read every
  candidate's data, not just their own). This matches the same "deterrent,
  not real security" level as your existing LMS's admin PIN. Locking this
  down properly needs Firebase Authentication, which is a bigger change —
  say the word if you want that built next.
- **Tab-switch detection can't catch everything** — a second physical
  device (a phone) next to the candidate is invisible to this app or to
  SEB. Same limitation your plan.md already documents for the other LMS.
