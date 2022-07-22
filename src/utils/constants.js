export const employees_url = "/api/employees";
export const wpexpiry_url = "/api/wpexpiryview";
export const leaves_url = "/api/leaves";
export const onleaves_url = "/api/onleavesview";
export const expenses_url = "/api/expenses";
export const expensesattachments_url = "/api/expensesattachments";
export const unpaidexpenses_url = "/api/unpaidexpenses";
export const dailyallowances_url = "/api/dailyallowances";
export const dailyallowsdetls_url = "/api/dailyallowsdetls";
export const unpaiddailyallows_url = "/api/unpaiddailyallows";
export const pendingdailyallowsdetls_url = "/api/pendingdailyallowsdetls";
export const periods_url = "/api/periods";
export const payslips_url = "/api/payslips";
export const payslipitems_url = "/api/payslipitems";
export const payitems_url = "/api/payitems";
export const payrun_url = "/api/payrun";
export const allowances_url = "/api/allowances";
export const deductions_url = "/api/deductions";
export const departments_url = "/api/departments";
export const institutes_url = "/api/institutes";
export const currency_url = "/api/currency";
export const designations_url = "/api/designations";
export const payslipearnings_url = "/api/payslipearnings";
export const payslipdeductions_url = "/api/payslipdeductions";
export const family_url = "/api/family";
export const educations_url = "/api/educations";
export const experiences_url = "/api/experiences";
export const trainings_url = "/api/trainings";
export const hoc_url = "/api/hoc";
export const hocwhat_url = "/api/hocwhat";
export const hocwhatdetails_url = "/api/hocwhatdetails";
export const hocwhy_url = "/api/hocwhy";
export const hocwhydetails_url = "/api/hocwhydetails";
export const hoclookup_url = "/api/hoclookup";
export const hoclocation_url = "/api/hoclocation";
export const hoccategory_url = "/api/hoccategory";
export const yearendleavebal_url = "/api/yearendleavebal";
export const jobhistory_url = "/api/jobhistory";
export const jobstatus_url = "/api/jobstatus";
export const payroll_endmonth_day = "25";

export const headEmployeesTableCells = [
  {
    name: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    name: "icno",
    numeric: false,
    disablePadding: true,
    label: "I/C No",
  },
  {
    name: "gender",
    numeric: false,
    disablePadding: true,
    label: "Gender",
  },
  { name: "age", numeric: false, disablePadding: true, label: "Age" },
  {
    name: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
];

export const headLeaveTableCells = [
  {
    name: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    name: "from_date",
    numeric: false,
    disablePadding: true,
    label: "From Date",
  },
  { name: "to_date", numeric: false, disablePadding: true, label: "To Date" },
  {
    name: "no_of_days",
    numeric: false,
    disablePadding: true,
    label: "No of Days",
  },
  {
    name: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
];

export const headExpenseTableCells = [
  {
    name: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    name: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    name: "purchased_date",
    numeric: false,
    disablePadding: true,
    label: "Purchase Date",
  },
  {
    name: "amount",
    numeric: false,
    disablePadding: true,
    label: "Amount",
  },
  {
    name: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
];

export const headDailyAllowanceTableCells = [
  {
    name: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    name: "period",
    numeric: false,
    disablePadding: true,
    label: "Period",
  },
  {
    name: "location",
    numeric: false,
    disablePadding: true,
    label: "Location",
  },
  {
    name: "amount",
    numeric: false,
    disablePadding: true,
    label: "Amount",
  },
  {
    name: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
];

//payslip
export const headPayslipTableCells = [
  {
    name: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    name: "period",
    numeric: false,
    disablePadding: true,
    label: "Period",
  },
  { name: "date", numeric: false, disablePadding: true, label: "Date" },
  {
    name: "amount",
    numeric: false,
    disablePadding: true,
    label: "Amount",
  },
  {
    name: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
];

export const periods = [
  { name: "2021-01", monthenddate: "2021-01-25" },
  { name: "2021-02", monthenddate: "2021-02-25" },
  { name: "2021-03", monthenddate: "2021-03-25" },
  { name: "2021-04", monthenddate: "2021-04-25" },
  { name: "2021-05", monthenddate: "2021-05-25" },
  { name: "2021-06", monthenddate: "2021-06-25" },
  { name: "2021-07", monthenddate: "2021-07-25" },
  { name: "2021-08", monthenddate: "2021-08-25" },
  { name: "2021-09", monthenddate: "2021-09-25" },
  { name: "2021-10", monthenddate: "2021-10-25" },
  { name: "2021-11", monthenddate: "2021-11-25" },
  { name: "2021-12", monthenddate: "2021-12-25" },
];

export const links = [
  {
    id: 1,
    text: "staff",
    url: "/",
  },
  {
    id: 2,
    text: "admin",
    url: "/about",
  },
  {
    id: 3,
    text: "admin",
    url: "/products",
  },
  {
    id: 4,
    text: "orders",
    url: "/userorders",
  },
  {
    id: 5,
    text: "admin",
    url: "/admin",
  },
];

export const events = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },

  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: "Some Event",
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 10, 0, 0, 0),
  },
  {
    id: 5,
    title: "Conference",
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: "Big conference for important people",
  },
  {
    id: 6,
    title: "Meeting",
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
  },
  {
    id: 7,
    title: "Lunch",
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: "Power lunch",
  },
  {
    id: 8,
    title: "Meeting",
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: "Happy Hour",
    start: new Date(2015, 3, 12, 17, 0, 0, 0),
    end: new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: "Most important meal of the day",
  },
  {
    id: 10,
    title: "Dinner",
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: "Planning Meeting with Paige",
    start: new Date(2015, 3, 13, 8, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
  },
  {
    id: 11.1,
    title: "Inconvenient Conference Call",
    start: new Date(2015, 3, 13, 9, 30, 0),
    end: new Date(2015, 3, 13, 12, 0, 0),
  },
  {
    id: 11.2,
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2015, 3, 13, 11, 30, 0),
    end: new Date(2015, 3, 13, 14, 0, 0),
  },
  {
    id: 11.3,
    title: "Quote Follow-up - Tea by Tina",
    start: new Date(2015, 3, 13, 15, 30, 0),
    end: new Date(2015, 3, 13, 16, 0, 0),
  },
  {
    id: 12,
    title: "Late Night Event",
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 18, 2, 0, 0),
  },
  {
    id: 12.5,
    title: "Late Same Night Event",
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 17, 23, 30, 0),
  },
  {
    id: 13,
    title: "Multi-day Event",
    start: new Date(2015, 3, 20, 19, 30, 0),
    end: new Date(2015, 3, 22, 2, 0, 0),
  },
  {
    id: 14,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 15,
    title: "Point in Time Event",
    start: new Date(),
    end: new Date(),
  },
  {
    id: 16,
    title: "Video Record",
    start: new Date(2015, 3, 14, 15, 30, 0),
    end: new Date(2015, 3, 14, 19, 0, 0),
  },
  {
    id: 17,
    title: "Dutch Song Producing",
    start: new Date(2015, 3, 14, 16, 30, 0),
    end: new Date(2015, 3, 14, 20, 0, 0),
  },
  {
    id: 18,
    title: "Itaewon Halloween Meeting",
    start: new Date(2015, 3, 14, 16, 30, 0),
    end: new Date(2015, 3, 14, 17, 30, 0),
  },
  {
    id: 19,
    title: "Online Coding Test",
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 20, 30, 0),
  },
  {
    id: 20,
    title: "An overlapped Event",
    start: new Date(2015, 3, 14, 17, 0, 0),
    end: new Date(2015, 3, 14, 18, 30, 0),
  },
  {
    id: 21,
    title: "Phone Interview",
    start: new Date(2015, 3, 14, 17, 0, 0),
    end: new Date(2015, 3, 14, 18, 30, 0),
  },
  {
    id: 22,
    title: "Cooking Class",
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 19, 0, 0),
  },
  {
    id: 23,
    title: "Go to the gym",
    start: new Date(2015, 3, 14, 18, 30, 0),
    end: new Date(2015, 3, 14, 20, 0, 0),
  },
];
