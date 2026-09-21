# SQL Payroll Support Coach

A 5-day onboarding/assessment LMS for SQL Payroll support agents, mirroring the structure of the SQL Account version of this project.

- [`candidate/`](candidate/) — the candidate-facing app (learn.html / test.html), runs inside Safe Exam Browser for the timed assessment.
- [`admin/`](admin/) — the admin dashboard: live progress, question bank management, candidate records, completion reports.

Both apps talk to the same Firebase project (`coach-sql-payroll`) — see each folder's own README for setup details.

Content source: the 5-day onboarding plan, knowledge base, and question banks live in Notion under "SQL Payroll Support Onboarding Path & Evaluation," built from the official [SQL Payroll Help Center](https://www.sql.com.my/support/payroll/).
