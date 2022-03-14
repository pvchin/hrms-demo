import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Navigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import { Flex } from "@chakra-ui/react";
// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";

import Appbanner from "./Appbanner";
import Example from "./Example6";
import SideDrawer from "./SideDrawer";
import SingleEmployee from "./SingleEmployee";
import SingleLeave from "./SingleLeave";
import SingleExpense from "./SingleExpense";
import SingleDailyAllowance from "./SingleDailyAllowance";
import SingleDailyAllowsDetls from "./SingleDailyAllowsDetls";
import BatchDailyAllowances from "./BatchDailyAllowances";
import SinglePayslip from "./SinglePayslip";
import { loginLevelState } from "./data/atomdata";
import Login from "./LoginForm";
import Payrun from "./Payrun";
import Payrunbatch from "./Payrunbatch";
import SingleEmployeeStaff from "./SingleEmployeeStaff";
import SingleDailyAllowsDetlsStaff from "./SingleDailyAllowsDetlsStaff";
import ApprovalManager from "./ApprovalManager";
import UserAccessTable from "./UserAccessTable";

import {
  Home,
  AllEmployees,
  Leave,
  DailyAllowancesStaff,
  Expenses,
  Hoc,
  LeaveStaff,
  Payslip,
  BatchPayslips,
  Payroll,
  PayslipStaff,
  TrainingsStaff,
  ExpensesStaff,
  Departments,
  Designation,
  Tables,
  Clients,
  Allowances,
  DailyAllowances,
  PrivateRoute,
  Error,
} from "../pages";

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
        {select === "Staff" && (
          // <DashboardStaff
          //   open={open}
          //   handleDrawerOpen={handleDrawerOpen}
          //   handleDrawerClose={handleDrawerClose}
          // />
          <Routes>
            <Route exact path="/" element={<Home />} />

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
              path="/payslips"
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
              path="/leave"
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
              path="/trainings"
              element={
                <React.Suspense fallback={<>...</>}>
                  <TrainingsStaff />
                </React.Suspense>
              }
            />

            <Route
              exact
              path="/dailyallowances"
              element={
                <React.Suspense fallback={<>...</>}>
                  <DailyAllowancesStaff />
                </React.Suspense>
              }
            />

            <Route
              exact
              path="/singledailyallowsdetlstable"
              element={
                <React.Suspense fallback={<>...</>}>
                  <SingleDailyAllowsDetlsStaff />
                </React.Suspense>
              }
            ></Route>
            <Route
              exact
              path="/expenses"
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
              path="/singleemployee"
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
            <Route exact path="/error" element={<Error />} />

            <Route path="*" element={<Error />} />
          </Routes>
        )}
        {select === "Admin" && (
          // <DashboardAdmin
          //   open={open}
          //   handleDrawerOpen={handleDrawerOpen}
          //   handleDrawerClose={handleDrawerClose}
          // />
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
              path="/clients"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Clients />
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
              path="/singleemployee"
              element={
                <React.Suspense fallback={<>...</>}>
                  <SingleEmployee />
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
            ></Route>
            <Route exact path="/error" element={<Error />}></Route>
            <Route exact path="/leave" element={<Leave />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        )}
        {select === "OpsSpvr" && (
          // <DashboardOpsSpvr
          //   open={open}
          //   handleDrawerOpen={handleDrawerOpen}
          //   handleDrawerClose={handleDrawerClose}
          // />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route
              exact
              path="/allemployees"
              element={<AllEmployees />}
            ></Route>

            <Route exact path="/departments" element={<Departments />}></Route>
            <Route exact path="/designation" element={<Designation />}></Route>
            <Route exact path="/tables" element={<Tables />}></Route>
            <Route exact path="/allowances" element={<Allowances />}></Route>
            <Route exact path="/clients" element={<Clients />}></Route>
            <Route exact path="/example" element={<Example />}></Route>
            <Route
              exact
              path="/singleemployee"
              element={<SingleEmployee />}
            ></Route>
            <Route exact path="/singleleave" element={<SingleLeave />}></Route>
            <Route
              exact
              path="/singleexpense"
              element={<SingleExpense />}
            ></Route>
            <Route exact path="/error" element={<Error />}></Route>
            <Route exact path="/leave" element={<Leave />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        )}
        {select === "AdminManager" && (
          // <DashboardAdminManager
          //   open={open}
          //   handleDrawerOpen={handleDrawerOpen}
          //   handleDrawerClose={handleDrawerClose}
          // />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route
              exact
              path="/allemployees"
              element={<AllEmployees />}
            ></Route>
            <Route exact path="/payroll" element={<Payroll />}></Route>
            <Route exact path="/payslip" element={<Payslip />}></Route>
            <Route
              exact
              path="/singlepayslip"
              element={<SinglePayslip />}
            ></Route>
            <Route
              exact
              path="/batchpayslips"
              element={<BatchPayslips />}
            ></Route>
            <Route exact path="/leave" element={<Leave />}></Route>
            <Route exact path="/payrun" element={<Payrun />}></Route>
            <Route exact path="/payrunbatch" element={<Payrunbatch />}></Route>
            <Route
              exact
              path="/dailyallowances"
              element={<DailyAllowances />}
            ></Route>
            <Route
              exact
              path="/singledailyallowsdetlstable"
              element={<SingleDailyAllowsDetls />}
            ></Route>
            <Route exact path="/expenses" element={<Expenses />}></Route>
            <Route exact path="/departments" element={<Departments />}></Route>
            <Route exact path="/designation" element={<Designation />}></Route>
            <Route exact path="/tables" element={<Tables />}></Route>
            <Route exact path="/allowances" element={<Allowances />}></Route>
            <Route exact path="/clients" element={<Clients />}></Route>
            <Route exact path="/example" element={<Example />}></Route>
            <Route
              exact
              path="/singleemployee"
              element={<SingleEmployee />}
            ></Route>
            <Route exact path="/singleleave" element={<SingleLeave />}></Route>
            <Route
              exact
              path="/singleexpense"
              element={<SingleExpense />}
            ></Route>
            <Route
              exact
              path="/singledailyallowance"
              element={<SingleDailyAllowance />}
            ></Route>
            <Route
              exact
              path="/batchdailyallowances"
              element={<BatchDailyAllowances />}
            ></Route>
            <Route exact path="/error" element={<Error />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        )}
        {select === "Manager" && (
          // <DashboardManager
          //   open={open}
          //   handleDrawerOpen={handleDrawerOpen}
          //   handleDrawerClose={handleDrawerClose}
          // />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>

            <Route
              exact
              path="/allemployees"
              element={<AllEmployees />}
            ></Route>
            <Route exact path="/payroll" element={<Payroll />}></Route>
            <Route exact path="/payslip" element={<Payslip />}></Route>
            <Route
              exact
              path="/singlepayslip"
              element={<SinglePayslip />}
            ></Route>
            <Route
              exact
              path="/batchpayslips"
              element={<BatchPayslips />}
            ></Route>
            <Route exact path="/approval" element={<ApprovalManager />}></Route>
            <Route exact path="/leave" element={<Leave />}></Route>
            <Route exact path="/payrun" element={<Payrun />}></Route>
            <Route exact path="/payrunbatch" element={<Payrunbatch />}></Route>
            <Route
              exact
              path="/dailyallowances"
              element={<DailyAllowances />}
            ></Route>
            <Route
              exact
              path="/singledailyallowsdetlstable"
              element={<SingleDailyAllowsDetls />}
            ></Route>
            <Route exact path="/expenses" element={<Expenses />}></Route>
            <Route exact path="/departments" element={<Departments />}></Route>
            <Route
              exact
              path="/useraccess"
              element={<UserAccessTable />}
            ></Route>
            <Route exact path="/designation" element={<Designation />}></Route>
            <Route exact path="/tables" element={<Tables />}></Route>
            <Route exact path="/allowances" element={<Allowances />}></Route>
            <Route exact path="/clients" element={<Clients />}></Route>
            <Route exact path="/example" element={<Example />}></Route>
            <Route
              exact
              path="/singleemployee"
              element={<SingleEmployee />}
            ></Route>
            <Route exact path="/singleleave" element={<SingleLeave />}></Route>
            <Route
              exact
              path="/singleexpense"
              element={<SingleExpense />}
            ></Route>
            <Route
              exact
              path="/singledailyallowance"
              element={<SingleDailyAllowance />}
            ></Route>
            <Route
              exact
              path="/batchdailyallowances"
              element={<BatchDailyAllowances />}
            ></Route>
            <Route exact path="/error" element={<Error />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        )}
        {select === "Director" && (
          // <DashboardDirector
          //   open={open}
          //   handleDrawerOpen={handleDrawerOpen}
          //   handleDrawerClose={handleDrawerClose}
          // />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>

            <Route
              exact
              path="/allemployees"
              element={<AllEmployees />}
            ></Route>
            <Route exact path="/payroll" element={<Payroll />}></Route>
            <Route exact path="/payslip" element={<Payslip />}></Route>
            <Route
              exact
              path="/singlepayslip"
              element={<SinglePayslip />}
            ></Route>
            <Route
              exact
              path="/batchpayslips"
              element={<BatchPayslips />}
            ></Route>
            <Route exact path="/approval" element={<ApprovalManager />}></Route>
            <Route exact path="/leave" element={<Leave />}></Route>
            <Route exact path="/payrun" element={<Payrun />}></Route>
            <Route exact path="/payrunbatch" element={<Payrunbatch />}></Route>
            <Route
              exact
              path="/dailyallowances"
              element={<DailyAllowances />}
            ></Route>
            <Route
              exact
              path="/singledailyallowsdetlstable"
              element={<SingleDailyAllowsDetls />}
            ></Route>
            <Route exact path="/expenses" element={<Expenses />}></Route>
            <Route exact path="/departments" element={<Departments />}></Route>
            <Route
              exact
              path="/useraccess"
              element={<UserAccessTable />}
            ></Route>
            <Route exact path="/designation" element={<Designation />}></Route>
            <Route exact path="/tables" element={<Tables />}></Route>
            <Route exact path="/allowances" element={<Allowances />}></Route>
            <Route exact path="/clients" element={<Clients />}></Route>
            <Route exact path="/example" element={<Example />}></Route>
            <Route
              exact
              path="/singleemployee"
              element={<SingleEmployee />}
            ></Route>
            <Route exact path="/singleleave" element={<SingleLeave />}></Route>
            <Route
              exact
              path="/singleexpense"
              element={<SingleExpense />}
            ></Route>
            <Route
              exact
              path="/singledailyallowance"
              element={<SingleDailyAllowance />}
            ></Route>
            <Route
              exact
              path="/batchdailyallowances"
              element={<BatchDailyAllowances />}
            ></Route>
            <Route exact path="/error" element={<Error />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        )}
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
