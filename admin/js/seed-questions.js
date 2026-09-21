// One-time seed data for the "questions" Firestore collection, sourced from
// the 250-question Notion banks (Day 1-5 Question Bank pages under
// "Theory Quiz — SQL Payroll Support"). Stored here in a compact raw form
// (type m=MCQ / t=True-False / s=Short-or-Scenario) and expanded into the
// {day, topic, q, options[4], correct, why} shape quiz.js expects at seed
// time — see buildQuestionDocs(). The correct answer is always placed at
// options[0] here; that's safe because quiz.js re-shuffles each question's
// option order client-side per attempt (see pickQuestionsForAttempt), so
// the stored order never leaks the answer.
//
// For 's' (short/scenario) and 't' (true/false) items, which don't come
// with 4 answer choices from the source material, 3 distractors are pulled
// mechanically from other real answers in the same day's pool (offset by
// a fixed stride so they don't repeat) rather than hand-authored per
// question — still topically plausible since they're genuine facts about
// that same day's topic, just wrong for that specific question.

const DAY_NAMES = {
  1: "Getting Started & Employee Setup",
  2: "Leave & HR Modules",
  3: "Payroll Processing",
  4: "Statutory & Compliance",
  5: "Reports, Tools & Troubleshooting",
};

const RAW = {
  1: [
    { t: "m", q: "Before EPF contributions can calculate correctly, what must be set on the company profile?", o: ["EPF employer number", "SST number", "Bank SWIFT code", "None of the above"] },
    { t: "t", q: "The Maintain Payroll Company Profile screen stores the employer's EPF, SOCSO, EIS, and PCB registration numbers.", a: true },
    { t: "s", q: "What is the SQL Payroll User Guide primarily used for?", a: "A general reference covering core Payroll module features and how to use them." },
    { t: "m", q: "Which of these is required when registering a new payroll company?", o: ["All of the above", "Company name", "EPF/SOCSO/EIS/PCB numbers", "Financial year start"] },
    { t: "t", q: "A MyKad Reader can scan an employee's IC and auto-fill their Maintain Employee record.", a: true },
    { t: "s", q: "Name two fields typically captured in Maintain Employee besides name and IC.", a: "Bank account details and employment date (also statutory numbers, basic salary)." },
    { t: "m", q: "Which feature sends payslips to many employees at once, password-protected?", o: ["Payroll Bulk Email with Password", "Batch Email", "SQL View", "None of the above"] },
    { t: "s", q: "A new hire's payslip PDF needs a password so only they can open it. What feature applies?", a: "Payroll Bulk Email with Password." },
    { t: "s", q: "What's the purpose of an Appointment Letter generated from SQL Payroll?", a: "Formal documentation confirming a new employee's hire and terms." },
    { t: "t", q: "Confirmation and Increment Letters can also be printed from the same feature as Appointment Letters.", a: true },
    { t: "m", q: "A new employment contract needs its stamp duty handled. Which feature applies?", o: ["Employment Contract - Stamp Duty", "Maintain Wages", "CP38", "None of the above"] },
    { t: "s", q: "Why might a support agent confirm which statutory numbers a client already has before setup?", a: "The company profile needs them to calculate EPF/SOCSO/EIS/PCB correctly." },
    { t: "s", q: "An employee's IC number was scanned wrong via MyKad Reader. What's the fix?", a: "Manually correct the IC field in Maintain Employee." },
    { t: "t", q: "MyKad Reader setup is optional; employee details can also be entered manually.", a: true },
    { t: "m", q: "Which detail is NOT typically part of Maintain Employee?", o: ["Stock reorder level", "Bank account", "Statutory numbers", "Employment date"] },
    { t: "s", q: "What's a likely reason a support agent would use Payroll Bulk Email with Password instead of manual email?", a: "To send payslips to many employees at once securely, without emailing one by one." },
    { t: "s", q: "A company is onboarding 50 new staff at once. What tool speeds up letter generation?", a: "Print Appointment/Confirmation/Increment Letter (bulk letter printing)." },
    { t: "t", q: "Employment Contract - Stamp Duty is a \"new topic,\" meaning it's a newer feature added to SQL Payroll.", a: true },
    { t: "s", q: "What's the first thing a support agent should confirm before helping a customer set up a new payroll company?", a: "Which employer statutory numbers they already have." },
    { t: "m", q: "Which guide would you point a client to for a general how-to reference across the whole module?", o: ["SQL Payroll User Guide", "Maintain Employee", "CP38", "None of the above"] },
    { t: "s", q: "A client says the appointment letter printed with the wrong company address. What should you check first?", a: "The company profile's address setting in Maintain Payroll Company Profile." },
    { t: "s", q: "What's one risk of not setting up the EPF employer number correctly before the first payroll run?", a: "EPF contributions calculate incorrectly or fail to generate for statutory submission." },
    { t: "t", q: "Increment letters reflect a change in an employee's salary/wage.", a: true },
    { t: "m", q: "Which KB category covers Maintain Employee and Appointment Letters?", o: ["Human Resource", "Getting Started", "Report", "None of the above"] },
    { t: "s", q: "Why would a support agent double check company registration details before going live with a client?", a: "Errors there cascade into every statutory calculation and printed document afterward." },
    { t: "s", q: "A client wants to issue a confirmation letter after an employee's probation ends. Which feature?", a: "Print Appointment/Confirmation/Increment Letter." },
    { t: "t", q: "Bank account details entered in Maintain Employee are later used by Maintain Payment Method during payroll processing.", a: true },
    { t: "m", q: "What does the MyKad Reader primarily save time on?", o: ["Manual data entry of IC/personal details", "Payroll calculation", "Report printing", "None of the above"] },
    { t: "s", q: "What's the difference between \"Getting Started\" and \"Human Resource\" categories in the KB?", a: "Getting Started covers company-level setup; Human Resource covers employee-level records and letters." },
    { t: "s", q: "A support agent is asked to help a brand-new client from zero. What's the logical first step?", a: "Set up the company payroll profile before adding any employees." },
    { t: "t", q: "SQL Payroll can generate an Appointment Letter automatically once an employee record is saved, with no manual data entry.", a: false },
    { t: "s", q: "What information should a support agent gather before troubleshooting a company profile setup issue?", a: "Which statutory numbers are missing/incorrect, and what error (if any) appears." },
    { t: "m", q: "Employment Contract - Stamp Duty primarily addresses which compliance area?", o: ["Contract stamping/legal requirement", "Leave entitlement", "EPF rate", "None of the above"] },
    { t: "s", q: "Why is Day 1 focused on company + employee setup rather than payroll processing?", a: "Processing depends on correct company/employee master data being set up first." },
    { t: "s", q: "A client's employee record shows a blank bank account field, and payroll payment fails. What do you check?", a: "Whether bank details were completed in Maintain Employee." },
    { t: "t", q: "A support agent should only practice setup steps in a demo company, never a live client's data.", a: true },
    { t: "s", q: "What's the value of a written step-by-step KB guide for company/employee setup versus verbal explanation?", a: "Consistency, fewer missed steps, and something the client can revisit later." },
    { t: "m", q: "Which of these would you check first if EPF calculates as zero for an employee?", o: ["Employee's EPF eligibility/rate setting", "Printer driver", "SQL View", "None of the above"] },
    { t: "s", q: "List two details captured on the company profile besides statutory numbers.", a: "Company name and registration number (also address)." },
    { t: "s", q: "A client asks if they can update their company address after initial registration. What do you tell them?", a: "Yes, it can be edited later in Maintain Payroll Company Profile." },
    { t: "t", q: "Every field in Maintain Employee is mandatory before the first payroll run.", a: false },
    { t: "s", q: "Why might a support agent recommend MyKad Reader to a client with high hiring volume?", a: "It reduces manual entry time and data-entry errors for IC/personal details." },
    { t: "m", q: "Which letter type documents a pay raise?", o: ["Increment Letter", "Appointment Letter", "Confirmation Letter", "None of the above"] },
    { t: "s", q: "What's the purpose of the Day 1 hands-on task (setting up a demo company + employee)?", a: "To ensure the new hire can complete real setup steps, not just recognize them from reading." },
    { t: "s", q: "A new support hire isn't sure whether a setup change is safe to test. What should they do?", a: "Only test in the demo/training company and ask a senior teammate if unsure." },
    { t: "t", q: "SQL Payroll User Guide and Maintain Payroll Company Profile cover the same content.", a: false },
    { t: "s", q: "What's one reason a client might need Employment Contract - Stamp Duty rather than handling stamping manually outside the system?", a: "To handle the stamping requirement directly within their existing payroll workflow." },
    { t: "m", q: "Which category would \"Payroll Bulk Email with Password\" fall under?", o: ["Human Resource", "Getting Started", "Payroll", "Report"] },
    { t: "s", q: "Why does the onboarding day pair reading with a hands-on task instead of reading alone?", a: "So the new hire practices the real steps, not just recognizes them." },
    { t: "s", q: "A support agent finishes Day 1 but the new employee they created has no bank details. What should they finish before moving to Day 2?", a: "Complete the bank account details in Maintain Employee before proceeding." },
  ],
  2: [
    { t: "m", q: "Brought Forward Leave carries over what?", o: ["Unused annual leave balance", "Sick leave only", "OT hours", "None of the above"] },
    { t: "t", q: "Leave can be configured to apply in hourly (time) units instead of full/half days.", a: true },
    { t: "s", q: "What does the Leave Module primarily define?", a: "Leave types and entitlement/application rules." },
    { t: "m", q: "Which module lets employees self-serve leave applications?", o: ["E-Leave", "E-Claim", "E-TMS", "SQL View"] },
    { t: "s", q: "An employee's brought-forward leave shows 0 despite unused days last year. First check?", a: "Whether Brought Forward Leave was run for the new leave year for that employee." },
    { t: "t", q: "E-TMS syncs clock-in/out and attendance data into payroll.", a: true },
    { t: "s", q: "What's the difference between Leave Module and E-Leave?", a: "Leave Module defines the rules in SQL Payroll; E-Leave is the employee self-service portal applying against those rules." },
    { t: "m", q: "Which module handles employee expense claims?", o: ["E-Claim", "E-Leave", "E-TMS", "HRMS setup"] },
    { t: "s", q: "What does E-Payroll - Sync Payslip & EA Form do?", a: "Syncs payslips and EA forms to the employee self-service portal." },
    { t: "s", q: "A client wants staff to clock in via mobile and have it reflect in payroll. What's relevant?", a: "E-TMS setup." },
    { t: "t", q: "HRMS - Payroll setup user guide covers integrating HRMS modules with SQL Payroll overall.", a: true },
    { t: "s", q: "Why might hourly leave application matter for shift-based staff?", a: "They may take partial-day leave in hours rather than whole/half days." },
    { t: "m", q: "Which of these is NOT an HRMS module listed in the KB?", o: ["SQL View", "E-Claim", "E-Leave", "E-TMS"] },
    { t: "s", q: "A manager wants employees to view/approve leave from their phone. Which feature?", a: "E-Leave (self-service leave application/approval)." },
    { t: "t", q: "Brought Forward Leave must be re-run manually every new leave year; it doesn't happen automatically without action.", a: true },
    { t: "s", q: "List two things E-Leave setup requires before employees can use it.", a: "Leave types configured and employee portal access set up (also entitlement rules defined)." },
    { t: "s", q: "What's a common reason a leave balance looks wrong right after year-end?", a: "Brought Forward Leave wasn't processed correctly for that employee." },
    { t: "s", q: "A client asks whether leave taken in hours affects their monthly wage calculation. What do you explain?", a: "Hourly leave typically deducts pay/leave balance proportionally, depending on configured settings." },
    { t: "t", q: "E-Claim is used for salary advances rather than expense claims.", a: false },
    { t: "m", q: "Which module would help a client reduce manual timesheet entry?", o: ["E-TMS", "E-Leave", "E-Claim", "SQL View"] },
    { t: "s", q: "What's the benefit of syncing payslips and EA forms via E-Payroll?", a: "Employees can view/download them directly without HR emailing individually." },
    { t: "s", q: "A client's employees complain they can't see updated leave balances online. What should you check?", a: "Whether E-Leave is properly synced/set up with the latest Payroll data." },
    { t: "t", q: "HRMS - Payroll setup user guide and E-Leave Setup User Guide cover the exact same steps.", a: false },
    { t: "s", q: "Why would a support agent confirm leave year start date before troubleshooting a balance issue?", a: "Because Brought Forward Leave and entitlement calculations are tied to the configured leave year." },
    { t: "m", q: "Which of the following best describes \"hourly leave\"?", o: ["Leave applied in specific hour units", "Leave applied in whole days only", "Unpaid leave only", "None of the above"] },
    { t: "s", q: "A new client wants Payroll and E-Claim to share the same employee master data. What should you verify first?", a: "That E-Claim setup correctly references the existing employee records in Payroll." },
    { t: "t", q: "Employees can approve their own leave requests without supervisor sign-off by default.", a: false },
    { t: "s", q: "What's one advantage of self-service HR modules (E-Leave, E-Claim) for a growing company?", a: "Reduces HR's manual workload and speeds up approvals." },
    { t: "m", q: "Which guide would you use to set up expense claim workflows?", o: ["E-Claim Setup User Guide", "Leave Module", "E-TMS Setup User Guide", "None of the above"] },
    { t: "s", q: "A support agent needs to confirm why an employee's leave request in hours didn't deduct the expected amount. What should they check?", a: "The hourly leave configuration/conversion rate against normal working hours." },
    { t: "t", q: "Leave Module setup must happen before Brought Forward Leave can be meaningfully used.", a: true },
    { t: "s", q: "Why might a support agent test hourly leave in a demo company before advising a live client?", a: "To confirm behavior matches expectations without risking incorrect live data." },
    { t: "m", q: "Which HRMS module is most directly tied to attendance/time tracking?", o: ["E-TMS", "E-Claim", "E-Leave", "None of the above"] },
    { t: "s", q: "A client's E-Leave portal shows outdated employee names after a Maintain Employee update. What's likely needed?", a: "A re-sync between Payroll and the E-Leave portal." },
    { t: "t", q: "HRMS setup guides are only relevant to large enterprise clients, never SMEs.", a: false },
    { t: "s", q: "What's the risk of skipping HR/leave setup before the first payroll run for a new client?", a: "Leave deductions/entitlements may calculate incorrectly, or self-service portals may not reflect correct data." },
    { t: "m", q: "Which of these tasks belongs to Day 2 rather than Day 1?", o: ["Configure leave type", "Register company", "Print appointment letter", "None of the above"] },
    { t: "s", q: "An employee disputes their brought-forward balance shown online via E-Leave. What should support verify first?", a: "The balance in SQL Payroll itself, then whether E-Leave is correctly synced." },
    { t: "t", q: "Employees using E-Claim submit claims that then need approval before reimbursement.", a: true },
    { t: "s", q: "What's a practical reason to test both Leave Module and E-Leave together during onboarding?", a: "Configuration in one affects what employees see/can do in the other." },
    { t: "m", q: "Which detail most directly affects whether an employee's leave carries forward?", o: ["Brought Forward Leave processing", "Their bank account", "Their appointment letter", "None of the above"] },
    { t: "s", q: "A client wants part-time staff to accrue leave differently from full-time staff. What should be checked first?", a: "Whether the Leave Module supports separate entitlement rules per employee group/type." },
    { t: "t", q: "E-TMS data can feed directly into payroll processing for attendance-based pay.", a: true },
    { t: "s", q: "Why is HRMS - Payroll setup often done before individual module setups like E-Claim or E-Leave?", a: "It establishes the overall integration/connection between HRMS and Payroll that the individual modules depend on." },
    { t: "m", q: "Which category in the KB includes Brought Forward Leave?", o: ["Leave", "HRMS", "Payroll", "Report"] },
    { t: "s", q: "A support agent is asked to demo hourly leave application live. What should they confirm beforehand?", a: "That the demo company has hourly leave correctly configured." },
    { t: "t", q: "A support agent should be able to explain the difference between Leave, HRMS, and Payroll categories when answering tickets.", a: true },
    { t: "s", q: "What's the Day 2 hands-on task meant to prove the new hire can do?", a: "Configure a leave type with brought-forward balance, set up E-Leave, and apply an hourly leave request." },
    { t: "m", q: "Which of these would most likely cause an E-Leave sync issue?", o: ["Outdated employee data in Payroll not yet synced", "Wrong company address", "Wrong printer driver", "None of the above"] },
    { t: "s", q: "At the end of Day 2, a new hire can configure leave types but isn't sure how E-Leave reflects those changes. What should they do before moving on?", a: "Test the sync/visibility in E-Leave themselves and ask a senior teammate to confirm understanding." },
  ],
  3: [
    { t: "m", q: "Which setting determines pay frequency (monthly/bi-monthly/weekly)?", o: ["Payroll Frequency Method", "Maintain Wages", "Maintain Contribution", "Maintain Payment Method"] },
    { t: "t", q: "Recurring Payroll lets you auto-apply the same advance/allowance/OT entry every run without re-entering it.", a: true },
    { t: "s", q: "What is Maintain Wages used for?", a: "Setting up an employee's basic wage/salary structure." },
    { t: "m", q: "A salesperson's commission needs to be included this run. Where?", o: ["Process Payroll with Commission", "Maintain Wages", "Bonus", "CP38"] },
    { t: "s", q: "Payroll was already processed and payment method needs correcting. What do you do?", a: "Use \"How to Change Payment Method After Payroll Has Been Processed\" rather than reprocessing from scratch." },
    { t: "t", q: "Advance Paid and Bonus are processed through the same screen.", a: false },
    { t: "s", q: "What's Daily Pay Method used for?", a: "Employees paid based on days worked rather than a fixed monthly wage." },
    { t: "m", q: "Which feature lets you hide the bonus column/step when not in use?", o: ["Hide Bonus Process", "Final Payroll", "Maintain Contribution", "None of the above"] },
    { t: "s", q: "What's Final Payroll used for?", a: "Processing an employee's last payroll run, e.g. on resignation/termination." },
    { t: "s", q: "A client wants to compare this month's payroll totals to last month to catch anomalies. What tool?", a: "Comparison the Previous Month Payroll Data for Each Employees." },
    { t: "t", q: "Maintain Payment Method configures how salary is disbursed (bank transfer, cash, cheque).", a: true },
    { t: "s", q: "What does Maintain Contribution generally cover?", a: "Statutory/voluntary contribution settings per employee." },
    { t: "m", q: "Which feature is used to enter YTD balances when migrating an employee mid-year?", o: ["Maintain Employee's Opening Balance", "Final Payroll", "Recurring Payroll", "None of the above"] },
    { t: "s", q: "A client's payslip shows the wrong description text for a payroll run. What do you check?", a: "How to Change the Payroll Description setting." },
    { t: "t", q: "Process Payroll with Overtime calculates OT pay and includes it in the run.", a: true },
    { t: "s", q: "Why would recurring entries (advance/allowance/OT) save time for a payroll processor?", a: "They auto-apply each run instead of being manually re-entered." },
    { t: "m", q: "Which of these determines an employee's basic pay structure?", o: ["Maintain Wages", "Payroll Frequency Method", "CP38", "None of the above"] },
    { t: "s", q: "An employee resigned mid-month. What feature ensures they're paid correctly for their last partial period?", a: "Final Payroll (and How to Process Payroll for Resigned Staff After Resign Date)." },
    { t: "t", q: "Payroll Frequency Method only supports monthly pay cycles.", a: false },
    { t: "s", q: "What's the purpose of Advance Paid?", a: "Recording and processing a salary advance given to an employee, later deducted from pay." },
    { t: "m", q: "Which report/tool helps spot unusual month-to-month pay changes across staff?", o: ["Comparison the Previous Month Payroll Data", "SQL View", "CP38", "None of the above"] },
    { t: "s", q: "A client needs to give a one-time bonus to select employees this run only. What's the correct approach?", a: "Process it via Bonus (not a recurring entry), scoped to that run." },
    { t: "t", q: "Hide Bonus Process permanently deletes bonus history.", a: false },
    { t: "s", q: "What's a likely reason to change an employee's payment method after payroll was already processed?", a: "Bank details were wrong or the employee switched banks after the run was processed." },
    { t: "m", q: "Which of these employees would use Daily Pay Method most naturally?", o: ["Daily-rated worker", "Fixed monthly-salary manager", "Commission-only agent", "None of the above"] },
    { t: "s", q: "A payroll processor needs consistent OT and allowance amounts applied every month for one employee. What feature reduces repetitive entry?", a: "Recurring Payroll for Advance Paid, Allowance, Overtime." },
    { t: "t", q: "Maintain Contribution settings can affect both statutory and voluntary employee contributions.", a: true },
    { t: "s", q: "What should a support agent verify before processing Final Payroll for a resigned employee?", a: "The correct resign date and that no essential balances/entries are missing." },
    { t: "m", q: "Which feature would you check if an employee's opening EPF balance looks wrong after mid-year onboarding?", o: ["Maintain Employee's Opening Balance", "Payroll Frequency Method", "Bonus", "None of the above"] },
    { t: "s", q: "A client wants payroll processed twice a month instead of once. What's the relevant setting?", a: "Payroll Frequency Method." },
    { t: "t", q: "Commission processing and overtime processing use the exact same screen and fields.", a: false },
    { t: "s", q: "Why might a support agent recommend Recurring Payroll rather than manual monthly entry for a stable allowance?", a: "Reduces repetitive manual entry and the chance of missing it in a future run." },
    { t: "m", q: "Which of these tasks is part of the Day 3 hands-on exercise?", o: ["Process a payroll run with OT and bonus", "Print an EA form", "Set up E-Leave", "None of the above"] },
    { t: "s", q: "A client asks why their payroll description reads generically instead of a custom label. What do you check?", a: "How to Change the Payroll Description setting." },
    { t: "t", q: "Maintain Payment Method must be set correctly before the payslip payment can be disbursed via the intended method.", a: true },
    { t: "s", q: "What's a key difference between Final Payroll and a normal monthly payroll run?", a: "Final Payroll settles an employee's last pay including any final entitlements/deductions, not just regular wages." },
    { t: "m", q: "Which of these would most likely require Maintain Contribution changes?", o: ["A change in statutory contribution rate", "A change in company address", "A change in printer driver", "None of the above"] },
    { t: "s", q: "A client complains that comparing payroll month-to-month is tedious manually. What tool addresses this?", a: "Comparison the Previous Month Payroll Data for Each Employees." },
    { t: "t", q: "An employee can have both a recurring advance and a one-time bonus in the same payroll run.", a: true },
    { t: "s", q: "Why is Payroll Processing considered the \"core\" day in the onboarding week?", a: "It's the central task support agents will handle most often — running and correcting actual payroll." },
    { t: "m", q: "Which of these is a common reason to use Hide Bonus Process?", o: ["The company doesn't currently need the bonus step visible", "To delete bonus data", "To change EPF rates", "None of the above"] },
    { t: "s", q: "A daily-rated employee's pay looks wrong this month. What should be checked first?", a: "The Daily Pay Method configuration and the number of days recorded as worked." },
    { t: "t", q: "Maintain Employee's Opening Balance is typically a one-time setup step when onboarding an employee mid-year.", a: true },
    { t: "s", q: "What's the risk of processing payroll without first confirming Maintain Wages is correctly set?", a: "The base salary calculation will be wrong, cascading into all other payroll figures." },
    { t: "m", q: "Which feature would you use to correct a payment method mistake discovered after payroll was finalized?", o: ["How to Change Payment Method After Payroll Has Been Processed", "Recurring Payroll", "CP38", "None of the above"] },
    { t: "s", q: "A support agent needs to explain why a resigned employee's final pay differs from a normal month. What should they cover?", a: "Final Payroll settlement includes prorated pay and any outstanding entitlements/deductions specific to their exit." },
    { t: "t", q: "Process Payroll with Commission and Process Payroll with Overtime are documented as separate guides because they're handled differently.", a: true },
    { t: "s", q: "What's one reason a support agent should always double-check Maintain Contribution before the first payroll run for a new company?", a: "Incorrect contribution setup leads to wrong statutory deductions across all employees." },
    { t: "m", q: "Which of these would NOT normally be reviewed during Day 3 processing training?", o: ["EA Form printing", "Overtime processing", "Commission processing", "Recurring payroll setup"] },
    { t: "s", q: "At the end of Day 3, the new hire successfully processes a run with OT and bonus but forgets to set up the recurring advance. What should they do before moving to Day 4?", a: "Go back and complete the recurring advance setup task before continuing." },
  ],
  4: [
    { t: "m", q: "Where do you change an employee's EPF contribution rate?", o: ["Where to Change The Employee/Employer EPF Rate", "Maintain Contribution", "CP38", "Maintain Wages"] },
    { t: "t", q: "CP38 is an additional statutory tax deduction instructed by LHDN, separate from normal monthly PCB.", a: true },
    { t: "s", q: "What does the monthly online submission text file typically cover?", a: "EPF, SOCSO, EIS, and PCB data for statutory online submission." },
    { t: "m", q: "Which submission process is CP39 associated with?", o: ["E-PCB Plus (E Data PCB)", "EA Form", "SQL View", "None of the above"] },
    { t: "s", q: "A foreign worker's EPF contribution looks wrong. What should you check first?", a: "Whether the Foreign Worker EPF rate/rule was applied instead of the standard local rate." },
    { t: "t", q: "Zakat and Tabung Haji deductions are configurable as recurring items on the employee record.", a: true },
    { t: "s", q: "What's the purpose of PCB & CP38 Receipt No & Date fields?", a: "To record the official payment receipt reference for statutory PCB/CP38 payments." },
    { t: "m", q: "Which employee type does the \"Foreign Worker EPF\" guide specifically address?", o: ["Foreign/non-Malaysian workers", "Local full-time staff", "Part-time interns", "None of the above"] },
    { t: "s", q: "A client processed payroll for a resigned staff member after their resign date and statutory figures look off. What guide addresses this?", a: "How to Process Payroll for Resigned Staff After Resign Date." },
    { t: "t", q: "CP38 deductions are typically instructed by the tax authority (LHDN) for a specific employee, not set at the company's discretion.", a: true },
    { t: "s", q: "What's Benefits In Kind (BIK), broadly?", a: "Non-cash benefits given to an employee (e.g. company car, housing) that may be taxable." },
    { t: "m", q: "Which of these would most likely require Recurring Zakat setup?", o: ["A Muslim employee opting into regular Zakat deduction", "A foreign worker's EPF rate", "A resigned employee's final pay", "None of the above"] },
    { t: "s", q: "A client's EPF submission text file is rejected by the statutory portal. What should you check first?", a: "The file format/contents match the required statutory format, and that contribution figures are correct in Payroll." },
    { t: "t", q: "Submit CP 39 to E PCB Plus is described as a \"hot topic,\" suggesting it's a frequently asked-about process.", a: true },
    { t: "s", q: "Why might a support agent need to double-check statutory rates yearly?", a: "EPF/SOCSO/EIS/PCB rates and thresholds can change with government policy updates." },
    { t: "m", q: "Which record type does CP38 attach to?", o: ["Specific employee", "Company profile", "Vendor", "None of the above"] },
    { t: "s", q: "A client asks whether Zakat deductions affect their PCB calculation. What should you clarify?", a: "Zakat deductions may be considered in PCB/tax relief calculations depending on setup; check the specific configuration." },
    { t: "t", q: "BIK doesn't need to be reported at all if the value is small.", a: false },
    { t: "s", q: "What's the risk of not correctly setting the Employee/Employer EPF rate before the first payroll run?", a: "EPF contributions will be miscalculated, requiring correction and possibly late/incorrect statutory submission." },
    { t: "m", q: "Which guide addresses generating the combined EPF/SOCSO/EIS/PCB submission file?", o: ["How to Get The Text File for Monthly Online Submission", "Maintain Contribution", "Bonus", "None of the above"] },
    { t: "s", q: "A client wants to confirm a PCB payment was properly recorded with LHDN. What field should they check?", a: "PCB & CP38 Receipt No & Date." },
    { t: "t", q: "Foreign Worker EPF contributions always use the exact same rate table as local employees.", a: false },
    { t: "s", q: "What's a key difference between CP38 and standard monthly PCB?", a: "CP38 is an additional, specifically instructed deduction; PCB is the regular monthly tax deduction." },
    { t: "m", q: "Which of these is a statutory body/scheme, not a payroll feature?", o: ["SOCSO", "Maintain Wages", "Recurring Payroll", "Batch Email"] },
    { t: "s", q: "A client's foreign worker resigned mid-month. What two Day 4 topics intersect here?", a: "Foreign Worker EPF and How to Process Payroll for Resigned Staff After Resign Date." },
    { t: "t", q: "Zakat and Tabung Haji are both configured the same way as a standard statutory deduction like EPF.", a: false },
    { t: "s", q: "Why is Day 4 considered high-stakes compared to other onboarding days?", a: "Errors here can lead to statutory non-compliance, penalties, or rejected government submissions." },
    { t: "m", q: "Which of these would most directly affect PCB calculation for an employee?", o: ["Their tax reliefs/deductions (e.g. Zakat)", "Their leave balance", "Their appointment letter date", "None of the above"] },
    { t: "s", q: "A support agent needs to explain CP39 vs CP38 to a confused client. What's the key distinction?", a: "CP39 relates to the monthly PCB data submission process (via E-PCB Plus); CP38 is a specific additional deduction instruction for one employee." },
    { t: "t", q: "BIK values can affect an employee's taxable income even though no cash changes hands.", a: true },
    { t: "s", q: "What's one thing a support agent should confirm before helping submit the monthly statutory text file?", a: "That all employee contribution figures for the period are finalized and correct." },
    { t: "m", q: "Which of these is least related to statutory compliance?", o: ["Batch Email", "CP38", "Zakat and Tabung Haji", "EPF rate"] },
    { t: "s", q: "A client is confused about why their foreign worker's EPF differs from a Malaysian employee's. What should you explain?", a: "Foreign workers may be subject to different EPF contribution rules/rates than local employees." },
    { t: "t", q: "A support agent should verify statutory rates against the live product/current year rather than relying purely on memory, since rates can change.", a: true },
    { t: "s", q: "What's the purpose of recording PCB & CP38 Receipt No & Date?", a: "To maintain an audit trail of statutory payments made to the tax authority." },
    { t: "m", q: "Which of these tasks is part of the Day 4 hands-on exercise?", o: ["Generate the monthly statutory text file", "Print an EA form", "Set up E-Leave", "None of the above"] },
    { t: "s", q: "A client processed a resigned employee's final statutory contributions incorrectly. What two guides should you point them to?", a: "How to Process Payroll for Resigned Staff After Resign Date, and the relevant EPF/SOCSO/EIS/PCB submission guide." },
    { t: "t", q: "Recurring Zakat setup means the deduction applies automatically each payroll run once configured.", a: true },
    { t: "s", q: "Why might BIK matter even for a small company with few benefits given?", a: "Any taxable non-cash benefit must still be correctly reported regardless of company size." },
    { t: "m", q: "Which of the following would most likely trigger a CP38 instruction?", o: ["A directive from LHDN for a specific employee", "The employee's own request", "A company policy change", "None of the above"] },
    { t: "s", q: "A client asks if EPF rate changes apply automatically to all employees system-wide. What should you clarify?", a: "Rate changes may need to be applied per employee or via a system update; confirm the specific mechanism in the version they use." },
    { t: "t", q: "The monthly statutory text file submission removes the need to also keep records of PCB/CP38 receipt numbers.", a: false },
    { t: "s", q: "What's the value of practicing statutory submission in a demo company before doing it live?", a: "Avoids the risk of submitting incorrect data to a real government portal." },
    { t: "m", q: "Which category best fits \"Submit CP 39 to E PCB Plus\"?", o: ["Payroll", "Report", "Miscellaneous", "Leave"] },
    { t: "s", q: "A support agent is unsure whether a deduction should be Zakat or a standard tax relief. What should they do?", a: "Confirm with the client/senior teammate which category applies rather than guessing, since it affects tax calculation." },
    { t: "t", q: "Statutory compliance topics are generally considered lower priority than reporting topics in a support role.", a: false },
    { t: "s", q: "What's one consequence of missing a monthly statutory submission deadline?", a: "Possible penalties or compliance issues with the relevant statutory body." },
    { t: "m", q: "Which of these best describes the overall goal of Day 4?", o: ["Learn to handle statutory contribution setup and submissions", "Learn to process a basic payroll run", "Learn to print reports", "None of the above"] },
    { t: "s", q: "Why does the onboarding path place Statutory & Compliance after Payroll Processing rather than before?", a: "Statutory calculations build on a correctly processed payroll run, so processing fundamentals come first." },
    { t: "s", q: "At the end of Day 4, the new hire generated the statutory text file but hasn't set up CP38 yet. What should they do before Day 5?", a: "Complete the CP38 setup task to finish the Day 4 hands-on exercise." },
  ],
  5: [
    { t: "m", q: "Which report is printed for an employee's yearly income summary for tax filing?", o: ["EA Form", "CP38 receipt", "Payroll comparison", "SQL View"] },
    { t: "t", q: "SQL View lets you query payroll data directly for custom reporting.", a: true },
    { t: "s", q: "What's Batch Email used for in SQL Payroll?", a: "Sending payslips/reports to multiple employees at once via Email Client Batch or SMTP Batch." },
    { t: "m", q: "Which feature lets employees view their own salary/payslip info?", o: ["Employee Login", "SQL View", "CP38", "None of the above"] },
    { t: "s", q: "A manager wants to spot unusual month-to-month pay changes across staff before approving payroll. Which tool helps?", a: "Comparison the Previous Month Payroll Data for Each Employees." },
    { t: "t", q: "Online Mobile Approval lets managers approve payroll-related requests via a mobile app.", a: true },
    { t: "s", q: "What's Tax Benefit configuration used for?", a: "Setting up tax reliefs/benefits applied to an employee's tax calculation." },
    { t: "m", q: "Which of these two batch email options exist?", o: ["Email Client Batch and SMTP Batch", "Local Batch and Cloud Batch", "Manual Batch and Auto Batch", "None of the above"] },
    { t: "s", q: "A client wants to give end-of-year EA forms to all staff at once. What's the process?", a: "Print EA Form for each employee, then batch-email them out." },
    { t: "t", q: "SQL View can only display data already covered by SQL Payroll's default reports.", a: false },
    { t: "s", q: "Why might a support agent recommend Employee Login to a client with a large headcount?", a: "Reduces HR workload by letting employees self-check their own payslip/salary info." },
    { t: "m", q: "Which tool would a support agent use to build a custom report not available as a standard printout?", o: ["SQL View", "Employee Login", "Online Mobile Approval", "None of the above"] },
    { t: "s", q: "A client's SMTP batch emails aren't sending. What should you check first?", a: "The SMTP server settings/credentials configured for Batch Email." },
    { t: "t", q: "Comparison the Previous Month Payroll Data is primarily used for troubleshooting/anomaly detection.", a: true },
    { t: "s", q: "What's a likely reason a company would adopt Online Mobile Approval?", a: "To let approvers (e.g. managers) act on requests remotely without being at a desktop." },
    { t: "m", q: "Which of these is a Report category item rather than Miscellaneous?", o: ["Print EA Form", "SQL View", "Employee Login", "Tax Benefit"] },
    { t: "s", q: "A client says an employee never received their payslip email. What should you check?", a: "Whether Batch Email was sent successfully to that employee's correct email address." },
    { t: "t", q: "EA Form data pulls from the full year's processed payroll for each employee.", a: true },
    { t: "s", q: "What's the purpose of Day 5's focus on \"Tools\"?", a: "To ensure the new hire can produce reports and use supporting tools like SQL View and batch communication." },
    { t: "m", q: "Which of these tasks is part of the Day 5 hands-on exercise?", o: ["Print EA form", "Configure leave type", "Process overtime", "None of the above"] },
    { t: "s", q: "A client's manager wants to approve leave/claims without opening a desktop app. What feature addresses this?", a: "Online Mobile Approval." },
    { t: "t", q: "SQL View requires technical/query knowledge to get full value from it.", a: true },
    { t: "s", q: "Why would a support agent run a payroll comparison report before escalating an \"unusual pay\" complaint?", a: "To confirm whether an actual anomaly exists before treating it as a bug or error." },
    { t: "m", q: "Which of these would most help a client audit changes across pay periods?", o: ["Comparison the Previous Month Payroll Data", "Employee Login", "Batch Email", "None of the above"] },
    { t: "s", q: "An employee can't log in to view their payslip online. What should support check first?", a: "Whether Employee Login access/credentials were set up correctly for that employee." },
    { t: "t", q: "Tax Benefit and BIK cover exactly the same thing.", a: false },
    { t: "s", q: "What's a common troubleshooting first step across most Day 5 tools?", a: "Confirming the relevant setup/configuration is correct before assuming a system bug." },
    { t: "m", q: "Which category best fits \"Batch Email\"?", o: ["Payroll", "Report", "Leave", "HRMS"] },
    { t: "s", q: "A client's EA Form totals don't match their internal records. What should support verify first?", a: "Whether all payroll runs for the year were correctly processed and included." },
    { t: "t", q: "Online Mobile Approval is unrelated to any of the HR/Leave modules covered on Day 2.", a: false },
    { t: "s", q: "Why does the onboarding path place Reports & Tools on the last day rather than earlier?", a: "Reporting and troubleshooting build on understanding of setup, processing, and compliance from earlier days." },
    { t: "m", q: "Which of these would most likely be flagged by SQL View but missed by a standard report?", o: ["A custom cross-field query", "A standard EA Form print", "A standard payslip print", "None of the above"] },
    { t: "s", q: "A support agent needs to consolidate the week's learning before the evaluation. What's recommended on Day 5 afternoon?", a: "Shadow a real support ticket/call and re-browse the Knowledge Base for unclear topics." },
    { t: "t", q: "Every SQL Payroll client is expected to use SQL View regardless of their reporting needs.", a: false },
    { t: "s", q: "What's one reason batch-emailing payslips is preferable to printing and handing them out physically?", a: "Faster, more secure (password-protected), and scales to many employees at once." },
    { t: "m", q: "Which of these is the correct pairing of tool to purpose?", o: ["SQL View — custom querying", "Employee Login — statutory submission", "EA Form — leave approval", "None of the above"] },
    { t: "s", q: "A manager complains that mobile approvals aren't reflecting in the desktop app. What should support check?", a: "Whether the Online Mobile Approval sync/connection to the main system is working correctly." },
    { t: "t", q: "A support agent completing Day 5 should be able to independently print reports, use SQL View basics, and troubleshoot common Report/Tool issues.", a: true },
    { t: "s", q: "What's the value of the Practical Assessment's Task 5 covering Reports & Tools?", a: "Confirms the new hire can actually execute report/tool tasks under observation, not just describe them." },
    { t: "m", q: "Which of these best summarizes the Miscellaneous category's role in the KB?", o: ["Catch-all for features not fitting other categories", "Statutory topics only", "Leave topics only", "None of the above"] },
    { t: "s", q: "A client wants both an EA Form and a payroll comparison report for year-end review. What order makes sense?", a: "Generate EA Forms first (final employee totals), then run the comparison report to review trends." },
    { t: "t", q: "Tax Benefit setup is unrelated to how an employee's PCB is calculated.", a: false },
    { t: "s", q: "Why might a support agent need basic SQL/query familiarity to be effective with SQL View?", a: "Because SQL View is meant for building custom queries beyond default report templates." },
    { t: "m", q: "Which of these would most likely resolve an \"employee can't see payslip online\" ticket?", o: ["Checking Employee Login setup", "Reprocessing payroll", "Changing EPF rate", "None of the above"] },
    { t: "s", q: "At the end of the week, a new hire scores well on the quiz but struggles with the SQL View task in the practical. What does the rubric suggest?", a: "Score that task lower per the 0-8 rubric and note the gap for targeted follow-up training." },
    { t: "t", q: "Reports & Tools topics are as important for day-to-day support tickets as Payroll Processing topics.", a: true },
    { t: "s", q: "What's one reason to keep a per-task score breakdown from the Practical Assessment rather than just a total?", a: "It shows exactly which day/topic to revisit for a Beginner or Junior result." },
    { t: "m", q: "Which of these should a new hire be able to do unaided by end of Day 5?", o: ["All of the above", "Print an EA form", "Register a company from scratch", "Configure hourly leave"] },
    { t: "s", q: "Why is shadowing a real support call valuable on Day 5 specifically?", a: "It exposes the new hire to how all the week's topics come together in a real, unscripted ticket." },
    { t: "s", q: "A new hire finishes all 5 days but is unsure about one specific SQL View query type. What should they do before the evaluation?", a: "Re-browse the Knowledge Base article and ask a senior teammate to clarify before being tested on it." },
  ],
};

function buildQuestionDocs() {
  const docs = [];
  Object.entries(RAW).forEach(([dayStr, items]) => {
    const day = Number(dayStr);
    const topic = DAY_NAMES[day];
    // Pool of "s"/"t" answers in this same day, used as distractor filler.
    const pool = items
      .map((it) => (it.t === "s" ? it.a : it.t === "t" ? (it.a ? "True" : "False") : null))
      .filter(Boolean);

    items.forEach((it, idx) => {
      let options, correct;
      if (it.t === "m") {
        options = it.o;
        correct = 0;
      } else if (it.t === "t") {
        const correctText = it.a ? "True" : "False";
        const oppositeText = it.a ? "False" : "True";
        options = [correctText, oppositeText, pool[(idx + 11) % pool.length], pool[(idx + 23) % pool.length]];
        correct = 0;
      } else {
        // short/scenario
        const d1 = pool[(idx + 7) % pool.length];
        const d2 = pool[(idx + 17) % pool.length];
        const d3 = pool[(idx + 29) % pool.length];
        options = [it.a, d1, d2, d3].filter((v, i, arr) => arr.indexOf(v) === i);
        while (options.length < 4) options.push(pool[(idx + options.length * 5) % pool.length]);
        options = options.slice(0, 4);
        correct = options.indexOf(it.a);
      }
      docs.push({ day, topic, q: it.q, options, correct, why: "" });
    });
  });
  return docs;
}

export async function seedPayrollQuestions(db, collection, addDoc) {
  const docs = buildQuestionDocs();
  let ok = 0;
  let failed = 0;
  for (const d of docs) {
    try {
      await addDoc(collection(db, "questions"), d);
      ok += 1;
    } catch (e) {
      failed += 1;
      console.error("seed failed", d.q, e);
    }
  }
  return { total: docs.length, ok, failed };
}
