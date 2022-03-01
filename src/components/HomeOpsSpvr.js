import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import clsx from "clsx";
//import { useHistory } from "react-router-dom";
import {
  Box,
  Divider,
  Heading,
  HStack,
  Stack,
  Select,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import {  Container } from "@material-ui/core";
//import CardLayout from "../helpers/CardLayout";
//import CardLayout2 from "../helpers/CardLayout2";
//import CardLayout3 from "../helpers/CardLayout3";
import Copyright from "./Copyright";
//import { useEmployees } from "./employees/useEmployees";
import { CustomDialog } from "../helpers/CustomDialog";
//import { useRecoilState } from "recoil";
//import { loginLevelState } from "./data/atomdata";
import { useLeavesContext } from "../context/leaves_context";
import { useExpensesContext } from "../context/expenses_context";
import { usePayslipsContext } from "../context/payslips_context";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
//import LeaveTableViewAdmin from "./LeaveTableViewAdmin";
import LeaveTableAdmin from "./LeaveTableManager";
//import ExpenseTableView from "./ExpenseTableView";
import ExpenseTableAdmin from "./ExpenseTableAdmin";
//import PayslipTableView from "./PayslipTableView";
import PayslipTableAdmin from "./PayslipTableAdmin";
//import DailyAllowancesTableView from "./DailyAllowancesTableView";
import DailyAllowancesTableAdmin from "./DailyAllowancesTableAdmin";
import DailyAllowanceTableViewSummary from "./DailyAllowancesTableViewSummary";
//import TrainingsTableViewAdmin from "./TrainingsTableViewAdmin";
//import WPExpiryViewAdmin from "./WPExpiryViewAdmin";
//import EmployeeTableLeaveView from "./EmployeeTableLeaveView";
import LeavesTableViewSummary from "./LeavesTableViewSummary";
import LeavesTableApproval from "./LeaveTableApproval";
import DailyAllowancesTableApproval from "./DailyAllowancesTableVeryfy";

const drawerWidth = 240;

const FILTERSTRING = "Pending";

const EmployeeView = () => {
  //let history = useHistory();
  const classes = useStyles();
  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  //const { employees } = useEmployees();
  //const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [leavesdata, setLeavesdata] = useState([]);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [expensesdata, setExpensesdata] = useState([]);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [payslipsdata, setPayslipsdata] = useState([]);
  const [isPayslipDialogOpen, setIsPayslipDialogOpen] = useState(false);
  const [dailyallowancesdata, setDailyAllowancesdata] = useState([]);
  const [isDailyAllowancesDialogOpen, setIsDailyAllowancesDialogOpen] =
    useState(false);

  const {  loadPendingLeaves } = useLeavesContext();
  const {  loadPendingExpenses } = useExpensesContext();
  const {  loadPendingPayslips } = usePayslipsContext();
  const {  loadPendingDailyAllowances } =
    useDailyAllowancesContext();
  const [selectleaveyear, setSelectLeaveYear] = useState("");
  const [selectsiteallowsyear, setSelectSiteAllowsYear] = useState("");
  const currentyear = new Date().getFullYear();
  const currentmonth = new Date().getMonth();

  // const handleLeaveDialogOpen = () => {
  //   setLeavesdata([]);
  //   setLeavesdata([...leaves]);
  //   setIsLeaveDialogOpen(true);
  // };

  const handleLeaveDialogClose = () => {
    setIsLeaveDialogOpen(false);
    loadPendingLeaves(FILTERSTRING);
  };

  // const handleExpenseDialogOpen = () => {
  //   setExpensesdata([]);
  //   setExpensesdata([...expenses]);
  //   setIsExpenseDialogOpen(true);
  // };

  const handleExpenseDialogClose = () => {
    setIsExpenseDialogOpen(false);
    loadPendingExpenses(FILTERSTRING);
  };

  // const handlePayslipDialogOpen = () => {
  //   setPayslipsdata([]);
  //   setPayslipsdata([...payslips]);
  //   setIsPayslipDialogOpen(true);
  // };

  const handlePayslipDialogClose = () => {
    setIsPayslipDialogOpen(false);
    loadPendingPayslips(FILTERSTRING);
  };

  // const handleDailyAllowancesDialogOpen = () => {
  //   setDailyAllowancesdata([]);
  //   setDailyAllowancesdata([...dailyallowances]);
  //   setIsDailyAllowancesDialogOpen(true);
  //};

  const handleDailyAllowancesDialogClose = () => {
    setIsDailyAllowancesDialogOpen(false);
    loadPendingDailyAllowances(FILTERSTRING);
  };

  useEffect(() => {
    setSelectLeaveYear(currentyear);
    setSelectSiteAllowsYear(currentyear);
  }, []);

  return (
    <div>
      <div className={classes.appBarSpacer} />
      <div style={{ paddingLeft: 50 }}>
        {/* <h2>Welcome {loginLevel.loginUser}!</h2>
        <h3>Dashboard</h3> */}
      </div>
      <Container maxWidth="full" className={classes.container}>
        <Stack direction="column">
          {/* <Box>
            <CardLayout2>
              <LeaveTableViewAdmin />
            </CardLayout2>
          </Box> */}
          {/* <Box>
            <CardLayout2>
              <WPExpiryViewAdmin />
            </CardLayout2>
          </Box> */}
          {/* <Box>
            <CardLayout2>
              <TrainingsTableViewAdmin />
            </CardLayout2>
          </Box> */}
          <Box
            maxW="x3"
            padding="4"
            width="100%"
            height="750"
            borderColor="blue.500"
            borderWidth="1px"
            borderRadius="lg"
            overflow="scroll"
          >
            <Tabs>
              <TabList>
                {/* <Tab>Employees</Tab> */}
                <Tab>Leaves</Tab>
                <Tab>Site Allowances</Tab>
                <Tab>Leaves Approval</Tab>
                <Tab>Site Allows Verify</Tab>
              </TabList>
              <TabPanels>
                {/* <TabPanel>
                  <Box
                    maxW="full"
                    padding="4"
                    width="100%"
                    height="700"
                    borderColor="blue.500"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="scroll"
                  >
                    <SimpleGrid>
                      <Box>
                        <Heading as="h2" size="lg">
                          Employees
                        </Heading>
                      </Box>
                      <Divider />
                      <Box>
                        <Tabs isLazy>
                          <TabPanels>
                            <TabPanel>
                              <EmployeeTableLeaveView />
                            </TabPanel>
                          </TabPanels>
                        </Tabs>
                      </Box>
                      <Divider />
                    </SimpleGrid>
                  </Box>
                </TabPanel> */}
                <TabPanel>
                  <Box
                    maxW="100%"
                    padding="4"
                    width="full"
                    height="700"
                    borderColor="blue.500"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="scroll"
                  >
                    <SimpleGrid w="168vh">
                      <HStack>
                        <Box>
                          <Heading as="h2" size="lg">
                            Leaves
                          </Heading>
                        </Box>
                        <Box alignSelf="flex-end">
                          <HStack>
                            <Select
                              value={selectleaveyear}
                              fontSize={20}
                              onChange={(e) =>
                                setSelectLeaveYear(e.target.value)
                              }
                            >
                              <option value="2021">2021</option>
                              <option value="2022">2022</option>
                            </Select>
                            {/* <Box size="xl" py={2}>
                              <Text fontSize="lg">
                                <ExportLeave2Excel
                                  filename="leave"
                                  dataset={dataset}
                                  title="Leave"
                                />
                              </Text>
                            </Box> */}
                          </HStack>
                        </Box>
                      </HStack>
                      <Divider />
                      <Box>
                        <Tabs defaultIndex={currentmonth} isLazy>
                          <TabList>
                            {/* <Tab>Chart</Tab>
                          <Tab>Summary</Tab> */}
                            <Tab>January</Tab>
                            <Tab>February</Tab>
                            <Tab>March</Tab>
                            <Tab>April</Tab>
                            <Tab>May</Tab>
                            <Tab>June</Tab>
                            <Tab>July</Tab>
                            <Tab>August</Tab>
                            <Tab>September</Tab>
                            <Tab>October</Tab>
                            <Tab>November</Tab>
                            <Tab>December</Tab>
                          </TabList>
                          <TabPanels>
                            {/* <TabPanel>
                  <BarChart
                    heading="Expenses for the Month"
                    barchartdata={expchartdata}
                  />
                </TabPanel>
                <TabPanel>
                  <SummaryTableView columns={columns} data={data} />
                </TabPanel> */}
                            <TabPanel>
                              <LeavesTableViewSummary
                                year={
                                  selectleaveyear
                                    ? selectleaveyear
                                    : currentyear
                                }
                                month={1}
                              />
                            </TabPanel>
                            <TabPanel>
                              <LeavesTableViewSummary
                                year={
                                  selectleaveyear
                                    ? selectleaveyear
                                    : currentyear
                                }
                                month={2}
                              />
                            </TabPanel>
                            <TabPanel>
                              <LeavesTableViewSummary
                                year={
                                  selectleaveyear
                                    ? selectleaveyear
                                    : currentyear
                                }
                                month={3}
                              />
                            </TabPanel>
                            <TabPanel>
                              <LeavesTableViewSummary
                                year={
                                  selectleaveyear
                                    ? selectleaveyear
                                    : currentyear
                                }
                                month={4}
                              />
                            </TabPanel>
                            <TabPanel>
                              <LeavesTableViewSummary
                                year={
                                  selectleaveyear
                                    ? selectleaveyear
                                    : currentyear
                                }
                                month={5}
                              />
                            </TabPanel>
                            <TabPanel>
                              <LeavesTableViewSummary
                                year={
                                  selectleaveyear
                                    ? selectleaveyear
                                    : currentyear
                                }
                                month={6}
                              />
                            </TabPanel>
                            <TabPanel>
                              <LeavesTableViewSummary
                                year={
                                  selectleaveyear
                                    ? selectleaveyear
                                    : currentyear
                                }
                                month={7}
                              />
                            </TabPanel>
                            <TabPanel>
                              <LeavesTableViewSummary
                                year={
                                  selectleaveyear
                                    ? selectleaveyear
                                    : currentyear
                                }
                                month={8}
                              />
                            </TabPanel>
                            <TabPanel>
                              <LeavesTableViewSummary
                                year={
                                  selectleaveyear
                                    ? selectleaveyear
                                    : currentyear
                                }
                                month={9}
                              />
                            </TabPanel>
                            <TabPanel>
                              <LeavesTableViewSummary
                                year={
                                  selectleaveyear
                                    ? selectleaveyear
                                    : currentyear
                                }
                                month={10}
                              />
                            </TabPanel>
                            <TabPanel>
                              <LeavesTableViewSummary
                                year={
                                  selectleaveyear
                                    ? selectleaveyear
                                    : currentyear
                                }
                                month={11}
                              />
                            </TabPanel>
                            <TabPanel>
                              <LeavesTableViewSummary
                                year={
                                  selectleaveyear
                                    ? selectleaveyear
                                    : currentyear
                                }
                                month={12}
                              />
                            </TabPanel>
                          </TabPanels>
                        </Tabs>
                      </Box>
                      <Divider />
                    </SimpleGrid>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box
                    maxW="x3"
                    padding="4"
                    width="100%"
                    height="700"
                    borderColor="blue.500"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="scroll"
                  >
                    <SimpleGrid w="168vh">
                      <HStack>
                        <Box>
                          <Heading as="h2" size="lg">
                            Site Allowances
                          </Heading>
                        </Box>
                        <Box alignSelf="flex-end">
                          <HStack>
                            <Select
                              value={selectsiteallowsyear}
                              fontSize={20}
                              onChange={(e) =>
                                setSelectSiteAllowsYear(e.target.value)
                              }
                            >
                              <option value="2021">2021</option>
                              <option value="2022">2022</option>
                            </Select>
                            {/* <Box size="xl" py={2}>
                              <Text fontSize="lg">
                                <ExportLeave2Excel
                                  filename="leave"
                                  dataset={dataset}
                                  title="Leave"
                                />
                              </Text>
                            </Box> */}
                          </HStack>
                        </Box>
                      </HStack>
                      <Divider />
                      <Box>
                        <Tabs defaultIndex={currentmonth} isLazy>
                          <TabList>
                            {/* <Tab>Chart</Tab>
                <Tab>Summary</Tab> */}
                            <Tab>January</Tab>
                            <Tab>February</Tab>
                            <Tab>March</Tab>
                            <Tab>April</Tab>
                            <Tab>May</Tab>
                            <Tab>June</Tab>
                            <Tab>July</Tab>
                            <Tab>August</Tab>
                            <Tab>September</Tab>
                            <Tab>October</Tab>
                            <Tab>November</Tab>
                            <Tab>December</Tab>
                          </TabList>
                          <TabPanels>
                            {/* <TabPanel>
                  <BarChart
                    heading="Site Allowances for the Month"
                    barchartdata={paychartdata}
                  />
                </TabPanel>
                <TabPanel>
                  <SummaryTableView columns={columns} data={data} />
                </TabPanel> */}
                            <TabPanel>
                              <DailyAllowanceTableViewSummary
                                year={
                                  selectsiteallowsyear
                                    ? selectsiteallowsyear
                                    : currentyear
                                }
                                month="01"
                              />
                            </TabPanel>
                            <TabPanel>
                              <DailyAllowanceTableViewSummary
                                year={
                                  selectsiteallowsyear
                                    ? selectsiteallowsyear
                                    : currentyear
                                }
                                month="02"
                              />
                            </TabPanel>
                            <TabPanel>
                              <DailyAllowanceTableViewSummary
                                year={
                                  selectsiteallowsyear
                                    ? selectsiteallowsyear
                                    : currentyear
                                }
                                month="03"
                              />
                            </TabPanel>
                            <TabPanel>
                              <DailyAllowanceTableViewSummary
                                year={
                                  selectsiteallowsyear
                                    ? selectsiteallowsyear
                                    : currentyear
                                }
                                month="04"
                              />
                            </TabPanel>
                            <TabPanel>
                              <DailyAllowanceTableViewSummary
                                year={
                                  selectsiteallowsyear
                                    ? selectsiteallowsyear
                                    : currentyear
                                }
                                month="05"
                              />
                            </TabPanel>
                            <TabPanel>
                              <DailyAllowanceTableViewSummary
                                year={currentyear}
                                month="06"
                              />
                            </TabPanel>
                            <TabPanel>
                              <DailyAllowanceTableViewSummary
                                year={
                                  selectsiteallowsyear
                                    ? selectsiteallowsyear
                                    : currentyear
                                }
                                month="07"
                              />
                            </TabPanel>
                            <TabPanel>
                              <DailyAllowanceTableViewSummary
                                year={
                                  selectsiteallowsyear
                                    ? selectsiteallowsyear
                                    : currentyear
                                }
                                month="08"
                              />
                            </TabPanel>
                            <TabPanel>
                              <DailyAllowanceTableViewSummary
                                year={
                                  selectsiteallowsyear
                                    ? selectsiteallowsyear
                                    : currentyear
                                }
                                month="09"
                              />
                            </TabPanel>
                            <TabPanel>
                              <DailyAllowanceTableViewSummary
                                year={
                                  selectsiteallowsyear
                                    ? selectsiteallowsyear
                                    : currentyear
                                }
                                month="10"
                              />
                            </TabPanel>
                            <TabPanel>
                              <DailyAllowanceTableViewSummary
                                year={
                                  selectsiteallowsyear
                                    ? selectsiteallowsyear
                                    : currentyear
                                }
                                month="11"
                              />
                            </TabPanel>
                            <TabPanel>
                              <DailyAllowanceTableViewSummary
                                year={
                                  selectsiteallowsyear
                                    ? selectsiteallowsyear
                                    : currentyear
                                }
                                month="12"
                              />
                            </TabPanel>
                          </TabPanels>
                        </Tabs>
                      </Box>
                      <Divider />
                    </SimpleGrid>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box
                    maxW="full"
                    padding="4"
                    width="100%"
                    height="700"
                    borderColor="blue.500"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="scroll"
                  >
                    <LeavesTableApproval />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box
                    maxW="full"
                    padding="4"
                    width="100%"
                    height="700"
                    borderColor="blue.500"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="scroll"
                  >
                    <DailyAllowancesTableApproval />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Stack>

        <Box pt={4}>
          <Copyright />
        </Box>
        <CustomDialog
          isOpen={isLeaveDialogOpen}
          handleClose={handleLeaveDialogClose}
          title=""
          showButton={true}
          isFullscreen={false}
          isFullwidth={false}
        >
          <LeaveTableAdmin
            setLeavesdata={setLeavesdata}
            leavesdata={leavesdata}
            handleDialogClose={handleLeaveDialogClose}
          />
        </CustomDialog>
        <CustomDialog
          isOpen={isExpenseDialogOpen}
          handleClose={handleExpenseDialogClose}
          title=""
          showButton={true}
          isFullscreen={false}
          isFullwidth={false}
        >
          <ExpenseTableAdmin
            setExpensesdata={setExpensesdata}
            expensesdata={expensesdata}
            handleDialogClose={handleExpenseDialogClose}
          />
        </CustomDialog>
        <CustomDialog
          isOpen={isPayslipDialogOpen}
          handleClose={handlePayslipDialogClose}
          title=""
          showButton={true}
          isFullscreen={true}
          isFullwidth={false}
        >
          <PayslipTableAdmin
            setPayslipsdata={setPayslipsdata}
            payslipsdata={payslipsdata}
            handleDialogClose={handlePayslipDialogClose}
          />
        </CustomDialog>
        <CustomDialog
          isOpen={isDailyAllowancesDialogOpen}
          handleClose={handleDailyAllowancesDialogClose}
          title=""
          showButton={true}
          isFullscreen={true}
          isFullwidth={false}
        >
          <DailyAllowancesTableAdmin
            setDailyAllowancesdata={setDailyAllowancesdata}
            dailyallowancesdata={dailyallowancesdata}
            handleDialogClose={handleDailyAllowancesDialogClose}
          />
        </CustomDialog>
      </Container>
    </div>
  );
};

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

export default EmployeeView;
