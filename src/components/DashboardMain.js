import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Navigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Flex } from "@chakra-ui/react";

import Appbanner from "./Appbanner";
import Example from "./Example6";
import SideDrawer from "./SideDrawer";
//import SingleEmployee from "./SingleEmployee";
//import SingleLeave from "./SingleLeave";
import SingleExpense from "./SingleExpense";
import SingleDailyAllowance from "./SingleDailyAllowance";
import SingleDailyAllowsDetls from "./SingleDailyAllowsDetls";
import BatchDailyAllowances from "./BatchDailyAllowances";
//import SinglePayslip from "./SinglePayslip";
import { loginLevelState } from "./data/atomdata";
import Login from "./LoginForm";
import Payrun from "./Payrun";
//import Payrunbatch from "./Payrunbatch";
import SingleEmployeeStaff from "./SingleEmployeeStaff";
import SingleDailyAllowsDetlsStaff from "./SingleDailyAllowsDetlsStaff";
import ApprovalManager from "./ApprovalManager";
import UserAccessTable from "./UserAccessTable";

import {
  Home,
  //AllEmployees,
  //Leave,
  //DailyAllowancesStaff,
  //Expenses,
  //Hoc,
  //LeaveStaff,
  //Payslip,
  //BatchPayslips,
  //Payroll,
  //PayslipStaff,
  //TrainingsStaff,
  //ExpensesStaff,
  //Departments,
  //Designation,
  //Tables,
  //Allowances,
  //DailyAllowances,
  PrivateRoute,
  Error,
} from "../pages";

const AllEmployees = React.lazy(() => import("../pages/AllEmployeesPage"));
const Hoc = React.lazy(() => import("../pages/HocPage"));
const Leave = React.lazy(() => import("../pages/LeavePage"));
const Expenses = React.lazy(() => import("../pages/ExpensesPage"));
const DailyAllowancesStaff = React.lazy(() =>
  import("../pages/DailyAllowancesStaffPage")
);
const LeaveStaff = React.lazy(() => import("../pages/LeaveStaffPage"));
const Payroll = React.lazy(() => import("../pages/PayrollPage"));
const Payslip = React.lazy(() => import("../pages/PayslipPage"));
const BatchPayslips = React.lazy(() => import("../pages/BatchPayslipsPage"));
const PayslipStaff = React.lazy(() => import("../pages/PayslipStaffPage"));
const TrainingsStaff = React.lazy(() => import("../pages/TrainingsStaffPage"));
const ExpensesStaff = React.lazy(() => import("../pages/ExpensesStaffPage"));
const Departments = React.lazy(() => import("../pages/DepartmentsPage"));
const Designation = React.lazy(() => import("../pages/DesignationPage"));
const Allowances = React.lazy(() => import("../pages/AllowancesPage"));
const DailyAllowances = React.lazy(() =>
  import("../pages/DailyAllowancesPage")
);
const Tables = React.lazy(() => import("../pages/TablesPage"));
const SingleEmployee = React.lazy(() => import("./SingleEmployee"));
const SingleLeave = React.lazy(() => import("./SingleLeave"));
const SinglePayslip = React.lazy(() => import("./SinglePayslip"));
const Payrunbatch = React.lazy(() => import("./Payrunbatch"));

const drawerWidth = 0;

export default function DashboardMain() {
  const classes = useStyles();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [open, setOpen] = React.useState(true);
  const [login, setLogin] = React.useState(true);
  const [select, setSelect] = React.useState("Staff");
  //console.log("loginLevel", loginLevel);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSelect = (title) => {
    setLoginLevel({ ...loginLevel, loginLevel: title });
    setSelect(title);
    <Navigate to="/" />;
  };

  //  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (!login) {
    return <Login setLogin={setLogin} />;
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <Router> */}
      <Appbanner
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        handleSelect={handleSelect}
        open={open}
        setLogin={setLogin}
        title="HRMS V1.5 - AppSmiths Sutera Sdn Bhd"
      />
      <SideDrawer
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        open={open}
      />
      <Flex>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <React.Suspense fallback={<>...</>}>
                <Home />
              </React.Suspense>
            }
          />
          <Route
            exact
            path="/payroll"
            element={
              <React.Suspense fallback={<>...</>}>
                <Payroll />
              </React.Suspense>
            }
          />

          <Route
            exact
            path="/payslipstaff"
            element={
              <React.Suspense fallback={<>...</>}>
                <PayslipStaff />
              </React.Suspense>
            }
          />

          <Route
            exact
            path="/singlepayslip"
            element={
              <React.Suspense fallback={<>...</>}>
                <SinglePayslip />
              </React.Suspense>
            }
          />

          <Route
            exact
            path="/batchpayslips"
            element={
              <React.Suspense fallback={<>...</>}>
                <BatchPayslips />
              </React.Suspense>
            }
          />

          <Route
            exact
            path="/leavestaff"
            element={
              <React.Suspense fallback={<>...</>}>
                <LeaveStaff />
              </React.Suspense>
            }
          />

          <Route
            exact
            path="/hoc"
            element={
              <React.Suspense fallback={<>...</>}>
                <Hoc />
              </React.Suspense>
            }
          />

          <Route
            exact
            path="/trainingsstaff"
            element={
              <React.Suspense fallback={<>...</>}>
                <TrainingsStaff />
              </React.Suspense>
            }
          />

          <Route
            exact
            path="/dailyallowancesstaff"
            element={
              <React.Suspense fallback={<>...</>}>
                <DailyAllowancesStaff />
              </React.Suspense>
            }
          />

          <Route
            exact
            path="/singledailyallowsdetlsstaff"
            element={
              <React.Suspense fallback={<>...</>}>
                <SingleDailyAllowsDetlsStaff />
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/expensesstaff"
            element={
              <React.Suspense fallback={<>...</>}>
                <ExpensesStaff />
              </React.Suspense>
            }
          />

          <Route
            exact
            path="/example"
            element={
              <React.Suspense fallback={<>...</>}>
                <Example />
              </React.Suspense>
            }
          />
          <Route
            exact
            path="/singleemployeestaff"
            element={
              <React.Suspense fallback={<>...</>}>
                <SingleEmployeeStaff />
              </React.Suspense>
            }
          />

          <Route
            exact
            path="/singleleave"
            element={
              <React.Suspense fallback={<>...</>}>
                <SingleLeave />
              </React.Suspense>
            }
          />
          <Route
            exact
            path="/singleexpense"
            element={
              <React.Suspense fallback={<>...</>}>
                <SingleExpense />
              </React.Suspense>
            }
          />
          <Route
            exact
            path="/singledailyallowance"
            element={
              <React.Suspense fallback={<>...</>}>
                <SingleDailyAllowance />
              </React.Suspense>
            }
          />
          <Route
            exact
            path="/batchdailyallowances"
            element={
              <React.Suspense fallback={<>...</>}>
                <BatchDailyAllowances />
              </React.Suspense>
            }
          />

          <Route
            exact
            path="/allemployees"
            element={
              <React.Suspense fallback={<>...</>}>
                <AllEmployees />
              </React.Suspense>
            }
          ></Route>

          <Route
            exact
            path="/departments"
            element={
              <React.Suspense fallback={<>...</>}>
                <Departments />
              </React.Suspense>
            }
          />
          <Route
            exact
            path="/designation"
            element={
              <React.Suspense fallback={<>...</>}>
                <Designation />
              </React.Suspense>
            }
          />
          <Route
            exact
            path="/tables"
            element={
              <React.Suspense fallback={<>...</>}>
                <Tables />
              </React.Suspense>
            }
          />
          <Route
            exact
            path="/allowances"
            element={
              <React.Suspense fallback={<>...</>}>
                <Allowances />
              </React.Suspense>
            }
          />

          <Route
            exact
            path="/singleemployee"
            element={
              <React.Suspense fallback={<>...</>}>
                <SingleEmployee />
              </React.Suspense>
            }
          />

          <Route
            exact
            path="/payslip"
            element={
              <React.Suspense fallback={<>...</>}>
                <Payslip />
              </React.Suspense>
            }
          />

          <Route
            exact
            path="/leave"
            element={
              <React.Suspense fallback={<>...</>}>
                <Leave />
              </React.Suspense>
            }
          />
          <Route
            exact
            path="/payrun"
            element={
              <React.Suspense fallback={<>...</>}>
                <Payrun />
              </React.Suspense>
            }
          />
          <Route
            exact
            path="/payrunbatch"
            element={
              <React.Suspense fallback={<>...</>}>
                <Payrunbatch />
              </React.Suspense>
            }
          />
          <Route
            exact
            path="/dailyallowances"
            element={
              <React.Suspense fallback={<>...</>}>
                <DailyAllowances />
              </React.Suspense>
            }
          />
          <Route
            exact
            path="/singledailyallowsdetls"
            element={
              <React.Suspense fallback={<>...</>}>
                <SingleDailyAllowsDetls />
              </React.Suspense>
            }
          />

          <Route
            exact
            path="/approvalmanager"
            element={
              <React.Suspense fallback={<>...</>}>
                <ApprovalManager />
              </React.Suspense>
            }
          ></Route>

          <Route
            exact
            path="/useraccesstable"
            element={
              <React.Suspense fallback={<>...</>}>
                <UserAccessTable />
              </React.Suspense>
            }
          />

          <Route exact path="/error" element={<Error />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </Flex>
      {/* </Router> */}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));
