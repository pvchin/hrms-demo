import React, { useState, useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import getYear from "date-fns/getYear";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  HStack,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useRadioGroup,
  useDisclosure,
} from "@chakra-ui/react";
//import AddIcon from "@material-ui/icons/Add";
//import EditIcon from "@material-ui/icons/Edit";
//import DeleteIcon from "@material-ui/icons/Delete";
//import CheckIcon from "@material-ui/icons/Check";
//import SearchIcon from "@material-ui/icons/Search";
//import LeaveForm from "./LeaveForm";
//import { CustomDialog } from "../helpers/CustomDialog";
//import { AlertDialog } from "../helpers/AlertDialogBox";
//import { useExpensesPeriod } from "./expenses/useExpensesPeriod";
import { useEmployeesContext } from "../context/employees_context";
import { useEmployees } from "./employees/useEmployees";
import { useUpdateEmployees } from "./employees/useUpdateEmployees";
import { useLeavesPeriod } from "./leaves/useLeavesPeriod";
import { usePeriods } from "./periods/usePeriods";
import { useUpdatePeriods } from "./periods/useUpdatePeriods";
import { AlertDialogBox } from "../helpers/AlertDialogBox";

export default function EmployeeTableLeaveBF() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { employees, setEmployeeId } = useEmployees();
  const { periods } = usePeriods();
  const updatePeriods = useUpdatePeriods();
  const updateEmployees = useUpdateEmployees();
  const { leavesperiod, setLeavePeriodYrId } = useLeavesPeriod();
  const [empdata, setEmpData] = useState([]);
  const [toBuild, setToBuild] = useState(true);
  const [selectleaveyear, setSelectLeaveYear] = useState("");

  const yearperiod = periods.filter((r) => r.status !== "C");
  // console.log('yearperiod', yearperiod)
  // const YEAR = "2022"

  //console.log("empdata", empdata);

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const {
    //editEmployeeID,
    //employees_loading,
    //deleteEmployee,
    //loadEmployees,
    setEditEmployeeID,
    setIsEditingOn,
    //setIsEditingOff,
    resetSingleEmployee,
    resetEmployees,
    //getSingleEmployee,
  } = useEmployeesContext();

  const columns = useMemo(
    () => [
      {
        title: "Name",
        field: "name",
        cellStyle: {
          width: 250,
          maxWidth: 250,
        },
        editable: "never",
      },
      // { title: "IC No", field: "ic_no" },
      // { title: "Gender", field: "gender" },
      // { title: "Emp No", field: "empno" },
      // { title: "Designation", field: "designation" },
      // { title: "Department", field: "department" },
      {
        title: "Last Year Leave Balance",
        field: "leave_bal",
        type: "numeric",
        cellStyle: {
          width: 60,
        },
        editable: "never",
      },
      {
        title: "Leave Entitled",
        field: "leave_entitled",
        type: "numeric",
        cellStyle: {
          width: 60,
          backgroundColor: "#e6e7e3",
        },
      },
      {
        title: "Leave B/F",
        field: "newleave_bf",
        type: "numeric",
        cellStyle: {
          width: 60,
          backgroundColor: "#e6e7e3",
        },
      },
      {
        title: "Total Leave",
        field: "newleaves_total",
        type: "numeric",
        cellStyle: {
          width: 60,
          backgroundColor: "#e6e7e3",
        },
      },
    ],
    []
  );

  const Build_EmpData = (YEAR) => {
    // eslint-disable-next-line no-lone-blocks
    {
      const emp = employees.map((rec) => {
        return { ...rec, leave_total: 0, leave_taken: 0, leave_pending: 0 };
      });
      emp &&
        emp.forEach((rec, index) => {
          const {
            id,
            //name,
            //icno,
            //gender,
            //designation,
            //department,
            //leave_entitled,
            //leave_bf,
            //leave_cd,
          } = rec;
          // calculate leaves

          const leavesdata = leavesperiod.filter(
            (r) => r.empid === id && getYear(new Date(r.from_date)) === YEAR
          );

          console.log("leavedata", YEAR, leavesdata);
          const leaveTaken = leavesdata.reduce((acc, item) => {
            if (
              item.status === "Approved" &&
              item.leavetype === "Annual Leave"
            ) {
              return acc + item.no_of_days;
            } else {
              return acc;
            }
          }, 0);
          const leavePending = leavesdata.reduce((acc, item) => {
            if (item.status === "Pending") {
              return acc + item.no_of_days;
            } else {
              return acc;
            }
          }, 0);
          const leaveOthers = leavesdata.reduce((acc, item) => {
            if (
              item.status === "Approved" &&
              item.leavetype !== "Annual Leave"
            ) {
              return acc + item.no_of_days;
            } else {
              return acc;
            }
          }, 0);
          const leaveEntitled = isNaN(emp[index].leave_entitled)
            ? 0
            : emp[index].leave_entitled;
          const leaveBf = isNaN(emp[index].leave_bf) ? 0 : emp[index].leave_bf;
          //const leaveCd = isNaN(emp[index].leave_cd) ? 0 : emp[index].leave_cd;
          const leaveCd = 0;
          const leavebal = leaveEntitled + leaveBf - leaveCd - leaveTaken;
          const newleavebf = leavebal > 5 ? 5 : leavebal;
          const newtotalleaves = newleavebf + leaveEntitled;
          emp[index].leave_entitled = leaveEntitled;
          emp[index].leave_cd = leaveCd;
          emp[index].leave_total = leaveEntitled + leaveBf;
          emp[index].leave_taken = leaveTaken + leaveCd;
          emp[index].leave_pending = leavePending;
          emp[index].leave_others = leaveOthers;
          emp[index].leave_bal = leavebal;

          emp[index].newleave_bf = newleavebf;
          emp[index].newleaves_total = newtotalleaves;
          setEmpData(emp);
        });
    }
  };

  const handleBuildEmpData = () => {
    if (selectleaveyear === "") {
      return null;
    }
    Build_EmpData(selectleaveyear);
  };

  const UpdateLeaveYear = (e) => {
    setSelectLeaveYear((prev) => (prev = parseInt(e.target.value)));
    //Calc_Leave()
    //setIsLoad(true);
  };

  const UpdateEmpProfile = () => {
    empdata.forEach((rec) => {
      const { id, leave_entitled, newleave_bf, newleaves_total } = rec;
      const olddata = employees
        .filter((r) => r.id === id)
        .map((rec) => {
          return { ...rec };
        });
      const newdata = {
        ...olddata[0],
        leave_entitled: leave_entitled,
        leave_bf: newleave_bf,
        leave_bal: newleaves_total,
      };
      updateEmployees({ id: id, ...newdata });
    });
  };

  const handleOnUpdateConfirm = () => {
    UpdateEmpProfile()
    //console.log("post", selectleaveyear, typeof selectleaveyear, periods);

    //update periods
    const currperiod = periods.filter(
      (r) => r.period === selectleaveyear.toString()
    );
    const updatedperiod = { ...currperiod[0], status: "C" };
    const { id, rec_id, ...fields } = updatedperiod;
    updatePeriods({ id: updatedperiod.id, ...fields });
    setEmpData([]);
  };

  useEffect(() => {
    setLeavePeriodYrId(selectleaveyear);
  }, []);

  // useEffect(() => {
  //   console.log("leaveperiod", leavesperiod);
  //   Build_EmpData(YEAR);
  // }, []);

  // useEffect(() => {
  //   setLeavePeriodYrId(YEAR);
  //   console.log("leaveperiod", leavesperiod)
  //   if (leavesperiod.length > 0) {
  //     Build_EmpData(YEAR);
  //     setToBuild(false);
  //   } else {
  //     setToBuild(true);
  //   }
  // }, [toBuild]);

  return (
    <Container minW="container.lg" minH={900}>
      <Box py={2}>
        <HStack>
          <Heading size="md">Leaves Balance Calculation B/F from Year </Heading>
          <Select
            value={selectleaveyear}
            fontSize={20}
            maxWidth={100}
            onChange={(e) => UpdateLeaveYear(e)}
          >
            <option value="">None</option>
            {periods
              .filter((r) => r.status !== "C")
              .map((row) => {
                return (
                  <option key={row.period} value={row.period}>
                    {row.period}
                  </option>
                );
              })}
          </Select>
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={handleBuildEmpData}
            disabled={selectleaveyear === ""}
          >
            Calc Leaves
          </Button>
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={onAlertOpen}
            disabled={selectleaveyear === ""}
          >
            Update Employees Profile
          </Button>
        </HStack>
      </Box>
      <Box>
        <MaterialTable
          columns={columns}
          data={empdata
            .filter((r) => !r.hasresigned)
            .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))}
          title="Employee Leave Details"
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...empdata];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setEmpData([...dataUpdate]);
                  resolve();
                }, 1000);
              }),
          }}
          options={{
            filtering: true,
            search: true,
            toolbar: false,
            pageSize: 10,
            headerStyle: {
              backgroundColor: "rgba(75, 192, 192, 1)",
              color: "white",
            },
            showTitle: false,
          }}
        />
      </Box>
      <AlertDialogBox
        onClose={onAlertClose}
        onConfirm={handleOnUpdateConfirm}
        isOpen={isAlertOpen}
        title="Update Employees Profile"
      >
        <h2>Are you sure you want to update to Employee Profiles ?</h2>
      </AlertDialogBox>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
