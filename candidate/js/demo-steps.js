// Visual step-by-step demo tutorial for SQL Payroll support onboarding.
// TODO: this file currently has text-only steps (no `image`) — real
// screenshots still need to be extracted from the official SQL Payroll KB
// PDFs (cdn.sql.com.my, see the Notion "SQL Payroll Knowledge Base") the
// same way js/tutorials.js was built for the SQL Account app. Steps render
// fine without an image (see js/learning.js renderCard — `image` is
// optional), so this is safe to ship as-is and backfill screenshots later.
// Each lesson here is meant to be a tight 2-5 step sequence covering the
// key screens/decisions a support agent needs to recognize, instead of the
// full PDF walkthrough — target is ~20 minutes of learning per day.

export const DEMO_STEPS = {
  1: {
    topic: "Getting Started & Employee Setup",
    goal: "The new hire understands the Payroll module and can set up a company and an employee from scratch.",
    lessons: [
      {
        title: "Maintain Payroll Company Profile",
        steps: [
          { caption: "Open the company payroll profile and fill in the legal company name, registration number, and address.", explanation: "These details flow onto every payslip, EA form, and statutory submission generated later — errors here cascade into every downstream document." },
          { caption: "Enter the employer's EPF, SOCSO, EIS, and PCB registration numbers.", explanation: "Without these, statutory contributions can't calculate or submit correctly — always confirm which numbers a client already has before going further." },
        ],
      },
      {
        title: "Maintain Employee",
        steps: [
          { caption: "Add a new employee record: personal info, IC number, employment date, and basic salary.", explanation: "This is the master record every other Payroll screen (wages, contributions, payment method) reads from." },
          { caption: "Fill in the employee's bank account details for salary disbursement.", explanation: "A blank bank field here is a common cause of failed payment runs later — worth double-checking during setup, not after the first payroll run fails." },
        ],
      },
      {
        title: "Maintain Employee using MyKad Reader",
        steps: [
          { caption: "Scan the employee's MyKad to auto-populate name and IC number instead of typing them manually.", explanation: "Saves time and reduces data-entry errors for high-volume hiring, but always let the client verify the scanned fields before saving." },
        ],
      },
      {
        title: "Print Appointment/ Confirmation/ Increment Letter",
        steps: [
          { caption: "Generate an Appointment Letter once the new hire's record is saved.", explanation: "Confirmation and Increment letters use the same feature later in the employee's lifecycle — worth knowing they're one shared tool, not three separate ones." },
        ],
      },
    ],
    practiceTask: "In the demo company, complete the company payroll profile (EPF/SOCSO/EIS/PCB employer numbers), add a new employee record, and print an appointment letter.",
  },
  2: {
    topic: "Leave & HR Modules",
    goal: "The new hire can answer the most common leave and HR self-service questions.",
    lessons: [
      {
        title: "Leave Module",
        steps: [
          { caption: "Define a leave type (e.g. Annual, Medical) and set its entitlement rules.", explanation: "This is the rulebook every other leave feature — brought-forward balances, hourly leave, E-Leave — builds on top of." },
        ],
      },
      {
        title: "Brought Forward Leave",
        steps: [
          { caption: "Run the Brought Forward Leave process at the start of a new leave year to carry over unused balances.", explanation: "This doesn't happen automatically — it's a process the client (or support agent) must run. A '0 balance' complaint right after year-end is almost always a missed run here." },
        ],
      },
      {
        title: "How to Make Leave Apply as Hourly (Time)",
        steps: [
          { caption: "Switch a leave type's application unit from full/half day to hours.", explanation: "Useful for shift-based staff taking partial-day leave — the conversion rate against normal working hours matters if a deduction looks off." },
        ],
      },
      {
        title: "E Leave - Setup User Guide",
        steps: [
          { caption: "Enable the E-Leave employee self-service portal and confirm it syncs against the Leave Module rules just configured.", explanation: "E-Leave is the employee-facing layer; the rules underneath still live in the Leave Module. A sync issue here shows up as 'my balance online looks wrong.'" },
        ],
      },
    ],
    practiceTask: "Configure a leave type with a brought-forward balance, set up E-Leave for the demo employee, and apply a leave request in hourly units.",
  },
  3: {
    topic: "Payroll Processing",
    goal: "The new hire can run a standard monthly payroll and handle common additions (OT, commission, advances, bonus).",
    lessons: [
      {
        title: "Maintain Wages & Payroll Frequency Method",
        steps: [
          { caption: "Set the employee's basic wage structure in Maintain Wages.", explanation: "This is the base figure every payroll run calculates from — get this wrong and everything downstream is wrong too." },
          { caption: "Confirm the company's Payroll Frequency Method (monthly, bi-monthly, weekly).", explanation: "Determines how often a run happens — worth confirming before processing the first run for a new client." },
        ],
      },
      {
        title: "Process Payroll with Overtime & Commission",
        steps: [
          { caption: "Add overtime hours for the pay period and let the system calculate OT pay.", explanation: "OT and commission are documented as separate guides because they're entered on different screens — don't assume one covers the other." },
          { caption: "Add a salesperson's commission figure for this run.", explanation: "Commission processing is typically a per-run entry, not a recurring one, unless it's genuinely fixed month to month." },
        ],
      },
      {
        title: "Advance Paid & Bonus",
        steps: [
          { caption: "Record a salary advance for an employee, to be deducted from a future run.", explanation: "Advance Paid and Bonus use different screens — a common mix-up for new hires." },
          { caption: "Process a one-time bonus for select employees in this run only.", explanation: "A one-time bonus should not be set up as a recurring entry — that would repeat it into future runs unintentionally." },
        ],
      },
      {
        title: "Recurring Payroll for Advance Paid, Allowance, Overtime",
        steps: [
          { caption: "Set up a recurring entry so a stable allowance or advance auto-applies every future run.", explanation: "Saves repetitive manual entry, but should only be used for genuinely recurring items — not one-off bonuses." },
        ],
      },
    ],
    practiceTask: "Process a full monthly payroll run for the demo employee that includes overtime and a bonus, then set up a recurring advance entry.",
  },
  4: {
    topic: "Statutory & Compliance",
    goal: "The new hire can handle statutory contribution setup and monthly government submissions.",
    lessons: [
      {
        title: "Where to Change The Employee_Employer EPF Rate?",
        steps: [
          { caption: "Locate and update an employee's EPF contribution rate.", explanation: "Getting this wrong before the first payroll run means every subsequent EPF figure needs correcting and possibly resubmitting." },
        ],
      },
      {
        title: "How to Get The Text File for Monthly Online Submission (EPF, SOCSO, EIS, PCB)",
        steps: [
          { caption: "Generate the combined statutory text file covering EPF, SOCSO, EIS, and PCB for the period.", explanation: "Confirm every employee's contribution figures are finalized before generating this file — a rejected submission is often a data issue, not a system issue." },
        ],
      },
      {
        title: "CP38 & Submit CP 39 to E PCB Plus (E Data PCB)",
        steps: [
          { caption: "Set up a CP38 additional tax deduction instruction for a specific employee.", explanation: "CP38 is a specific instruction from LHDN for one employee, separate from the regular monthly PCB deduction." },
          { caption: "Submit the monthly PCB data via E-PCB Plus (E Data PCB) — this is the CP39 process.", explanation: "CP39 and CP38 are often confused — CP39 is the submission process, CP38 is a specific deduction instruction." },
        ],
      },
      {
        title: "Foreign Worker EPF",
        steps: [
          { caption: "Apply the foreign-worker EPF rule/rate on a non-Malaysian employee's record.", explanation: "Foreign workers may be subject to different EPF rules than local employees — this is the first thing to check if a foreign worker's contribution looks off." },
        ],
      },
    ],
    practiceTask: "Generate the monthly statutory text file (EPF/SOCSO/EIS/PCB), set up a CP38 deduction, and process a foreign worker's EPF contribution.",
  },
  5: {
    topic: "Reports, Tools & Troubleshooting",
    goal: "The new hire can produce standard reports and use the module's supporting tools, and consolidates the whole week.",
    lessons: [
      {
        title: "Print EA Form",
        steps: [
          { caption: "Print an EA form for an employee, pulling from their full year of processed payroll.", explanation: "If totals look wrong, check whether every payroll run for the year was actually processed and included." },
        ],
      },
      {
        title: "SQL View",
        steps: [
          { caption: "Build a custom query against payroll data for a report not covered by a standard printout.", explanation: "SQL View is for cases where the default reports don't cover what a client needs — some familiarity with querying helps here." },
        ],
      },
      {
        title: "Batch Email - Email Client Batch & SMTP Batch",
        steps: [
          { caption: "Batch-send payslips to multiple employees at once, choosing Email Client Batch or SMTP Batch.", explanation: "If an employee says they never got their payslip, check whether the batch send actually succeeded for that specific address first." },
        ],
      },
      {
        title: "Comparison the Precious Month Payroll Data for Each Employees",
        steps: [
          { caption: "Run the month-over-month payroll comparison report to spot unusual changes before approving a run.", explanation: "Useful for catching anomalies (e.g. a wage change that shouldn't be there) before a client escalates it as a bug." },
        ],
      },
    ],
    practiceTask: "Print an EA form for the demo employee, run a month-over-month payroll comparison report, and batch-email payslips. Afternoon: shadow a real support ticket or call with a senior teammate, and freely re-browse the Knowledge Base for anything unclear before the evaluation.",
  },
};
