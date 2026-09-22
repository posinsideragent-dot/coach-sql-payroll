// Visual step-by-step demo tutorial for SQL Payroll support onboarding.
// Real screenshots pulled from the official SQL Payroll KB PDFs
// (cdn.sql.com.my, see the Notion 'SQL Payroll Knowledge Base'), curated
// down to each guide's most instructive pages (up to 5) rather than every
// raw page — the same tight-lesson approach as the SQL Account app's
// js/tutorials.js. Each lesson is a short visual sequence, not the full PDF.

export const DEMO_STEPS = {
  1: {
    topic: "Getting Started & Employee Setup",
    goal: "The new hire understands the Payroll module and can set up a company and an employee from scratch.",
    lessons: [
      {
        title: "Employment Contract - Stamp Duty",
        steps: [
          { image: "assets/tutorials/day1/employment-contract-stamp-duty/page1.jpg", caption: "Employment Contract - Stamp Duty — key screen from the guide." },
          { image: "assets/tutorials/day1/employment-contract-stamp-duty/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day1/employment-contract-stamp-duty/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day1/employment-contract-stamp-duty/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day1/employment-contract-stamp-duty/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "Maintain Employee",
        steps: [
          { image: "assets/tutorials/day1/maintain-employee/page1.jpg", caption: "Add a new employee record: personal info, IC number, employment date, and basic salary.", explanation: "This is the master record every other Payroll screen (wages, contributions, payment method) reads from." },
          { image: "assets/tutorials/day1/maintain-employee/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day1/maintain-employee/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day1/maintain-employee/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day1/maintain-employee/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "Maintain Employee using MyKad Reader",
        steps: [
          { image: "assets/tutorials/day1/maintain-employee-using-mykad-reader/page1.jpg", caption: "Scan the employee's MyKad to auto-populate name and IC number instead of typing them manually.", explanation: "Saves time and reduces data-entry errors for high-volume hiring, but always let the client verify the scanned fields before saving." },
          { image: "assets/tutorials/day1/maintain-employee-using-mykad-reader/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day1/maintain-employee-using-mykad-reader/page3.jpg", caption: "Continued — step 3." },
        ],
      },
      {
        title: "Maintain Payroll Company Profile",
        steps: [
          { image: "assets/tutorials/day1/maintain-payroll-company-profile/page1.jpg", caption: "Open the company payroll profile and fill in the legal company name, registration number, and address.", explanation: "These details flow onto every payslip, EA form, and statutory submission generated later — errors here cascade into every downstream document." },
          { image: "assets/tutorials/day1/maintain-payroll-company-profile/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day1/maintain-payroll-company-profile/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day1/maintain-payroll-company-profile/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day1/maintain-payroll-company-profile/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "Payroll Bulk Email with Password",
        steps: [
          { image: "assets/tutorials/day1/payroll-bulk-email-with-password/page1.jpg", caption: "Payroll Bulk Email with Password — key screen from the guide." },
          { image: "assets/tutorials/day1/payroll-bulk-email-with-password/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day1/payroll-bulk-email-with-password/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day1/payroll-bulk-email-with-password/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day1/payroll-bulk-email-with-password/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "Print Appointment/Confirmation/Increment Letter",
        steps: [
          { image: "assets/tutorials/day1/print-appointment-confirmation-increment-letter/page1.jpg", caption: "Generate an Appointment Letter once the new hire's record is saved.", explanation: "Confirmation and Increment letters use the same feature later in the employee's lifecycle — worth knowing they're one shared tool, not three separate ones." },
          { image: "assets/tutorials/day1/print-appointment-confirmation-increment-letter/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day1/print-appointment-confirmation-increment-letter/page3.jpg", caption: "Continued — step 3." },
        ],
      },
      {
        title: "SQL Payroll User Guide",
        steps: [
          { image: "assets/tutorials/day1/sql-payroll-user-guide/page1.jpg", caption: "SQL Payroll User Guide — key screen from the guide." },
          { image: "assets/tutorials/day1/sql-payroll-user-guide/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day1/sql-payroll-user-guide/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day1/sql-payroll-user-guide/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day1/sql-payroll-user-guide/page5.jpg", caption: "Continued — step 5." },
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
        title: "Brought Forward Leave",
        steps: [
          { image: "assets/tutorials/day2/brought-forward-leave/page1.jpg", caption: "Run the Brought Forward Leave process at the start of a new leave year to carry over unused balances.", explanation: "This doesn't happen automatically — it's a process the client (or support agent) must run. A '0 balance' complaint right after year-end is almost always a missed run here." },
          { image: "assets/tutorials/day2/brought-forward-leave/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day2/brought-forward-leave/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day2/brought-forward-leave/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day2/brought-forward-leave/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "E Claim - Setup User Guide",
        steps: [
          { image: "assets/tutorials/day2/e-claim-setup-user-guide/page1.jpg", caption: "E Claim - Setup User Guide — key screen from the guide." },
          { image: "assets/tutorials/day2/e-claim-setup-user-guide/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day2/e-claim-setup-user-guide/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day2/e-claim-setup-user-guide/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day2/e-claim-setup-user-guide/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "E Leave - Setup User Guide",
        steps: [
          { image: "assets/tutorials/day2/e-leave-setup-user-guide/page1.jpg", caption: "Enable the E-Leave employee self-service portal and confirm it syncs against the Leave Module rules just configured.", explanation: "E-Leave is the employee-facing layer; the rules underneath still live in the Leave Module. A sync issue here shows up as 'my balance online looks wrong.'" },
          { image: "assets/tutorials/day2/e-leave-setup-user-guide/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day2/e-leave-setup-user-guide/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day2/e-leave-setup-user-guide/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day2/e-leave-setup-user-guide/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "E Payroll - Sync Payslip & EA Form",
        steps: [
          { image: "assets/tutorials/day2/e-payroll-sync-payslip-ea-form/page1.jpg", caption: "E Payroll - Sync Payslip & EA Form — key screen from the guide." },
          { image: "assets/tutorials/day2/e-payroll-sync-payslip-ea-form/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day2/e-payroll-sync-payslip-ea-form/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day2/e-payroll-sync-payslip-ea-form/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day2/e-payroll-sync-payslip-ea-form/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "E TMS - Setup User Guide",
        steps: [
          { image: "assets/tutorials/day2/e-tms-setup-user-guide/page1.jpg", caption: "E TMS - Setup User Guide — key screen from the guide." },
          { image: "assets/tutorials/day2/e-tms-setup-user-guide/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day2/e-tms-setup-user-guide/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day2/e-tms-setup-user-guide/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day2/e-tms-setup-user-guide/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "How to Make Leave Apply as Hourly (Time)",
        steps: [
          { image: "assets/tutorials/day2/how-to-make-leave-apply-as-hourly-time/page1.jpg", caption: "Switch a leave type's application unit from full/half day to hours.", explanation: "Useful for shift-based staff taking partial-day leave — the conversion rate against normal working hours matters if a deduction looks off." },
          { image: "assets/tutorials/day2/how-to-make-leave-apply-as-hourly-time/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day2/how-to-make-leave-apply-as-hourly-time/page3.jpg", caption: "Continued — step 3." },
        ],
      },
      {
        title: "HRMS - Payroll setup user guide",
        steps: [
          { image: "assets/tutorials/day2/hrms-payroll-setup-user-guide/page1.jpg", caption: "HRMS - Payroll setup user guide — key screen from the guide." },
          { image: "assets/tutorials/day2/hrms-payroll-setup-user-guide/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day2/hrms-payroll-setup-user-guide/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day2/hrms-payroll-setup-user-guide/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day2/hrms-payroll-setup-user-guide/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "Leave Module",
        steps: [
          { image: "assets/tutorials/day2/leave-module/page1.jpg", caption: "Define a leave type (e.g. Annual, Medical) and set its entitlement rules.", explanation: "This is the rulebook every other leave feature — brought-forward balances, hourly leave, E-Leave — builds on top of." },
          { image: "assets/tutorials/day2/leave-module/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day2/leave-module/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day2/leave-module/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day2/leave-module/page5.jpg", caption: "Continued — step 5." },
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
        title: "Advance Paid",
        steps: [
          { image: "assets/tutorials/day3/advance-paid/page1.jpg", caption: "Record a salary advance for an employee, to be deducted from a future run.", explanation: "Advance Paid and Bonus use different screens — a common mix-up for new hires." },
          { image: "assets/tutorials/day3/advance-paid/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day3/advance-paid/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day3/advance-paid/page4.jpg", caption: "Continued — step 4." },
        ],
      },
      {
        title: "Bonus",
        steps: [
          { image: "assets/tutorials/day3/bonus/page1.jpg", caption: "Process a one-time bonus for select employees in this run only.", explanation: "A one-time bonus should not be set up as a recurring entry — that would repeat it into future runs unintentionally." },
          { image: "assets/tutorials/day3/bonus/page2.jpg", caption: "Continued — step 2." },
        ],
      },
      {
        title: "Daily Pay Method",
        steps: [
          { image: "assets/tutorials/day3/daily-pay-method/page1.jpg", caption: "Daily Pay Method — key screen from the guide." },
          { image: "assets/tutorials/day3/daily-pay-method/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day3/daily-pay-method/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day3/daily-pay-method/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day3/daily-pay-method/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "Final Payroll",
        steps: [
          { image: "assets/tutorials/day3/final-payroll/page1.jpg", caption: "Final Payroll — key screen from the guide." },
          { image: "assets/tutorials/day3/final-payroll/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day3/final-payroll/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day3/final-payroll/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day3/final-payroll/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "Hide Bonus Process",
        steps: [
          { image: "assets/tutorials/day3/hide-bonus-process/page1.jpg", caption: "Hide Bonus Process — key screen from the guide." },
          { image: "assets/tutorials/day3/hide-bonus-process/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day3/hide-bonus-process/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day3/hide-bonus-process/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day3/hide-bonus-process/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "How to Change Payment Method After Payroll Has Been Processed",
        steps: [
          { image: "assets/tutorials/day3/how-to-change-payment-method-after-payroll-has-been-processed/page1.jpg", caption: "How to Change Payment Method After Payroll Has Been Processed — key screen from the guide." },
          { image: "assets/tutorials/day3/how-to-change-payment-method-after-payroll-has-been-processed/page2.jpg", caption: "Continued — step 2." },
        ],
      },
      {
        title: "How to Change the Payroll Description",
        steps: [
          { image: "assets/tutorials/day3/how-to-change-the-payroll-description/page1.jpg", caption: "How to Change the Payroll Description — key screen from the guide." },
          { image: "assets/tutorials/day3/how-to-change-the-payroll-description/page2.jpg", caption: "Continued — step 2." },
        ],
      },
      {
        title: "Maintain Contribution",
        steps: [
          { image: "assets/tutorials/day3/maintain-contribution/page1.jpg", caption: "Maintain Contribution — key screen from the guide." },
          { image: "assets/tutorials/day3/maintain-contribution/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day3/maintain-contribution/page3.jpg", caption: "Continued — step 3." },
        ],
      },
      {
        title: "Maintain Employee's Opening Balance",
        steps: [
          { image: "assets/tutorials/day3/maintain-employees-opening-balance/page1.jpg", caption: "Maintain Employee's Opening Balance — key screen from the guide." },
          { image: "assets/tutorials/day3/maintain-employees-opening-balance/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day3/maintain-employees-opening-balance/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day3/maintain-employees-opening-balance/page4.jpg", caption: "Continued — step 4." },
        ],
      },
      {
        title: "Maintain Payment Method",
        steps: [
          { image: "assets/tutorials/day3/maintain-payment-method/page1.jpg", caption: "Maintain Payment Method — key screen from the guide." },
          { image: "assets/tutorials/day3/maintain-payment-method/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day3/maintain-payment-method/page3.jpg", caption: "Continued — step 3." },
        ],
      },
      {
        title: "Maintain Wages",
        steps: [
          { image: "assets/tutorials/day3/maintain-wages/page1.jpg", caption: "Set the employee's basic wage structure in Maintain Wages.", explanation: "This is the base figure every payroll run calculates from — get this wrong and everything downstream is wrong too." },
          { image: "assets/tutorials/day3/maintain-wages/page2.jpg", caption: "Continued — step 2." },
        ],
      },
      {
        title: "Payroll Frequency Method",
        steps: [
          { image: "assets/tutorials/day3/payroll-frequency-method/page1.jpg", caption: "Confirm the company's Payroll Frequency Method (monthly, bi-monthly, weekly).", explanation: "Determines how often a run happens — worth confirming before processing the first run for a new client." },
          { image: "assets/tutorials/day3/payroll-frequency-method/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day3/payroll-frequency-method/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day3/payroll-frequency-method/page4.jpg", caption: "Continued — step 4." },
        ],
      },
      {
        title: "Process Payroll with Commission",
        steps: [
          { image: "assets/tutorials/day3/process-payroll-with-commission/page1.jpg", caption: "Add a salesperson's commission figure for this run.", explanation: "Commission processing is typically a per-run entry, not a recurring one, unless it's genuinely fixed month to month." },
          { image: "assets/tutorials/day3/process-payroll-with-commission/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day3/process-payroll-with-commission/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day3/process-payroll-with-commission/page4.jpg", caption: "Continued — step 4." },
        ],
      },
      {
        title: "Process Payroll with Overtime",
        steps: [
          { image: "assets/tutorials/day3/process-payroll-with-overtime/page1.jpg", caption: "Add overtime hours for the pay period and let the system calculate OT pay.", explanation: "OT and commission are documented as separate guides because they're entered on different screens — don't assume one covers the other." },
          { image: "assets/tutorials/day3/process-payroll-with-overtime/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day3/process-payroll-with-overtime/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day3/process-payroll-with-overtime/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day3/process-payroll-with-overtime/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "Recurring Payroll for Advance Paid, Allowance, Overtime",
        steps: [
          { image: "assets/tutorials/day3/recurring-payroll-for-advance-paid-allowance-overtime/page1.jpg", caption: "Set up a recurring entry so a stable allowance or advance auto-applies every future run.", explanation: "Saves repetitive manual entry, but should only be used for genuinely recurring items — not one-off bonuses." },
          { image: "assets/tutorials/day3/recurring-payroll-for-advance-paid-allowance-overtime/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day3/recurring-payroll-for-advance-paid-allowance-overtime/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day3/recurring-payroll-for-advance-paid-allowance-overtime/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day3/recurring-payroll-for-advance-paid-allowance-overtime/page5.jpg", caption: "Continued — step 5." },
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
        title: "CP38",
        steps: [
          { image: "assets/tutorials/day4/cp38/page1.jpg", caption: "Set up a CP38 additional tax deduction instruction for a specific employee.", explanation: "CP38 is a specific instruction from LHDN for one employee, separate from the regular monthly PCB deduction." },
          { image: "assets/tutorials/day4/cp38/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day4/cp38/page3.jpg", caption: "Continued — step 3." },
        ],
      },
      {
        title: "Foreign Worker EPF",
        steps: [
          { image: "assets/tutorials/day4/foreign-worker-epf/page1.jpg", caption: "Apply the foreign-worker EPF rule/rate on a non-Malaysian employee's record.", explanation: "Foreign workers may be subject to different EPF rules than local employees — this is the first thing to check if a foreign worker's contribution looks off." },
          { image: "assets/tutorials/day4/foreign-worker-epf/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day4/foreign-worker-epf/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day4/foreign-worker-epf/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day4/foreign-worker-epf/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "How to Get The Text File for Monthly Online Submission",
        steps: [
          { image: "assets/tutorials/day4/how-to-get-the-text-file-for-monthly-online-submission/page1.jpg", caption: "Generate the combined statutory text file covering EPF, SOCSO, EIS, and PCB for the period.", explanation: "Confirm every employee's contribution figures are finalized before generating this file — a rejected submission is often a data issue, not a system issue." },
          { image: "assets/tutorials/day4/how-to-get-the-text-file-for-monthly-online-submission/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day4/how-to-get-the-text-file-for-monthly-online-submission/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day4/how-to-get-the-text-file-for-monthly-online-submission/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day4/how-to-get-the-text-file-for-monthly-online-submission/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "How to Process Payroll for Resigned Staff After Resign Date",
        steps: [
          { image: "assets/tutorials/day4/how-to-process-payroll-for-resigned-staff-after-resign-date/page1.jpg", caption: "How to Process Payroll for Resigned Staff After Resign Date — key screen from the guide." },
          { image: "assets/tutorials/day4/how-to-process-payroll-for-resigned-staff-after-resign-date/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day4/how-to-process-payroll-for-resigned-staff-after-resign-date/page3.jpg", caption: "Continued — step 3." },
        ],
      },
      {
        title: "PCB & CP38 Receipt No & Date",
        steps: [
          { image: "assets/tutorials/day4/pcb-cp38-receipt-no-and-date/page1.jpg", caption: "PCB & CP38 Receipt No & Date — key screen from the guide." },
          { image: "assets/tutorials/day4/pcb-cp38-receipt-no-and-date/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day4/pcb-cp38-receipt-no-and-date/page3.jpg", caption: "Continued — step 3." },
        ],
      },
      {
        title: "Recurring Zakat in Maintain Employee",
        steps: [
          { image: "assets/tutorials/day4/recurring-zakat-in-maintain-employee/page1.jpg", caption: "Recurring Zakat in Maintain Employee — key screen from the guide." },
          { image: "assets/tutorials/day4/recurring-zakat-in-maintain-employee/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day4/recurring-zakat-in-maintain-employee/page3.jpg", caption: "Continued — step 3." },
        ],
      },
      {
        title: "Submit CP 39 to E PCB Plus (E Data PCB)",
        steps: [
          { image: "assets/tutorials/day4/submit-cp39-to-e-pcb-plus-e-data-pcb/page1.jpg", caption: "Submit the monthly PCB data via E-PCB Plus (E Data PCB) — this is the CP39 process.", explanation: "CP39 and CP38 are often confused — CP39 is the submission process, CP38 is a specific deduction instruction." },
          { image: "assets/tutorials/day4/submit-cp39-to-e-pcb-plus-e-data-pcb/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day4/submit-cp39-to-e-pcb-plus-e-data-pcb/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day4/submit-cp39-to-e-pcb-plus-e-data-pcb/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day4/submit-cp39-to-e-pcb-plus-e-data-pcb/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "Where to Change The Employee/Employer EPF Rate",
        steps: [
          { image: "assets/tutorials/day4/where-to-change-the-employee-employer-epf-rate/page1.jpg", caption: "Locate and update an employee's EPF contribution rate.", explanation: "Getting this wrong before the first payroll run means every subsequent EPF figure needs correcting and possibly resubmitting." },
          { image: "assets/tutorials/day4/where-to-change-the-employee-employer-epf-rate/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day4/where-to-change-the-employee-employer-epf-rate/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day4/where-to-change-the-employee-employer-epf-rate/page4.jpg", caption: "Continued — step 4." },
        ],
      },
      {
        title: "Zakat and Tabung Haji",
        steps: [
          { image: "assets/tutorials/day4/zakat-and-tabung-haji/page1.jpg", caption: "Zakat and Tabung Haji — key screen from the guide." },
          { image: "assets/tutorials/day4/zakat-and-tabung-haji/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day4/zakat-and-tabung-haji/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day4/zakat-and-tabung-haji/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day4/zakat-and-tabung-haji/page5.jpg", caption: "Continued — step 5." },
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
        title: "Batch Email - Email Client Batch & SMTP Batch",
        steps: [
          { image: "assets/tutorials/day5/batch-email-email-client-batch-and-smtp-batch/page1.jpg", caption: "Batch-send payslips to multiple employees at once, choosing Email Client Batch or SMTP Batch.", explanation: "If an employee says they never got their payslip, check whether the batch send actually succeeded for that specific address first." },
          { image: "assets/tutorials/day5/batch-email-email-client-batch-and-smtp-batch/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day5/batch-email-email-client-batch-and-smtp-batch/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day5/batch-email-email-client-batch-and-smtp-batch/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day5/batch-email-email-client-batch-and-smtp-batch/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "Comparison the Precious Month Payroll Data for Each Employees",
        steps: [
          { image: "assets/tutorials/day5/comparison-the-precious-month-payroll-data-for-each-employees/page1.jpg", caption: "Run the month-over-month payroll comparison report to spot unusual changes before approving a run.", explanation: "Useful for catching anomalies (e.g. a wage change that shouldn't be there) before a client escalates it as a bug." },
          { image: "assets/tutorials/day5/comparison-the-precious-month-payroll-data-for-each-employees/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day5/comparison-the-precious-month-payroll-data-for-each-employees/page3.jpg", caption: "Continued — step 3." },
        ],
      },
      {
        title: "Employee Login",
        steps: [
          { image: "assets/tutorials/day5/employee-login/page1.jpg", caption: "Employee Login — key screen from the guide." },
          { image: "assets/tutorials/day5/employee-login/page2.jpg", caption: "Continued — step 2." },
        ],
      },
      {
        title: "Online Mobile Approval",
        steps: [
          { image: "assets/tutorials/day5/online-mobile-approval/page1.jpg", caption: "Online Mobile Approval — key screen from the guide." },
          { image: "assets/tutorials/day5/online-mobile-approval/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day5/online-mobile-approval/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day5/online-mobile-approval/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day5/online-mobile-approval/page5.jpg", caption: "Continued — step 5." },
        ],
      },
      {
        title: "Print EA Form",
        steps: [
          { image: "assets/tutorials/day5/print-ea-form/page1.jpg", caption: "Print an EA form for an employee, pulling from their full year of processed payroll.", explanation: "If totals look wrong, check whether every payroll run for the year was actually processed and included." },
          { image: "assets/tutorials/day5/print-ea-form/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day5/print-ea-form/page3.jpg", caption: "Continued — step 3." },
        ],
      },
      {
        title: "SQL View",
        steps: [
          { image: "assets/tutorials/day5/sql-view/page1.jpg", caption: "Build a custom query against payroll data for a report not covered by a standard printout.", explanation: "SQL View is for cases where the default reports don't cover what a client needs — some familiarity with querying helps here." },
          { image: "assets/tutorials/day5/sql-view/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day5/sql-view/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day5/sql-view/page4.jpg", caption: "Continued — step 4." },
        ],
      },
      {
        title: "Tax Benefit",
        steps: [
          { image: "assets/tutorials/day5/tax-benefit/page1.jpg", caption: "Tax Benefit — key screen from the guide." },
          { image: "assets/tutorials/day5/tax-benefit/page2.jpg", caption: "Continued — step 2." },
          { image: "assets/tutorials/day5/tax-benefit/page3.jpg", caption: "Continued — step 3." },
          { image: "assets/tutorials/day5/tax-benefit/page4.jpg", caption: "Continued — step 4." },
          { image: "assets/tutorials/day5/tax-benefit/page5.jpg", caption: "Continued — step 5." },
        ],
      },
    ],
    practiceTask: "Print an EA form for the demo employee, run a month-over-month payroll comparison report, and batch-email payslips. Afternoon: shadow a real support ticket or call with a senior teammate, and freely re-browse the Knowledge Base for anything unclear before the evaluation.",
  },
};
