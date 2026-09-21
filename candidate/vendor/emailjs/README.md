Put EmailJS's browser SDK file here as `email.min.js`.

Why it has to be a local file instead of a `<script src="https://cdn...">` tag:
this app runs inside Safe Exam Browser (SEB), which URL-filters/blocks calls to
domains outside the exam site during a locked-down session (same reason
Firebase's SDK is vendored in `vendor/firebase/` instead of loaded from a CDN
— see the comment at the top of `js/firebase-init.js`).

How to get the file:
1. Create a free account at https://www.emailjs.com/
2. Add an Email Service (e.g. connect a Gmail account) and an Email Template.
   Give the template these merge fields so `js/email-notify.js`'s payload maps
   cleanly: `to_email`, `candidate_name`, `day`, `topic`, `score`, `max_score`,
   `level`, `flags_count`, `submitted_at`.
3. Copy the three IDs (Service ID, Template ID, Public Key) into your
   `firebase-config.js` as `EMAILJS_SERVICE_ID` / `EMAILJS_TEMPLATE_ID` /
   `EMAILJS_PUBLIC_KEY`.
4. Download the SDK file (e.g. from the npm package `@emailjs/browser`'s
   `dist/email.min.js`, or EmailJS's own CDN URL fetched once and saved) and
   place it at `vendor/emailjs/email.min.js`.

Until this file exists, the app will still work end to end — `sendMarkingEmail`
detects the missing SDK, logs a warning, and skips the email without blocking
the candidate's score screen.
