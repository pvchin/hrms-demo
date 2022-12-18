import React, { useState, useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import getYear from "date-fns/getYear";
import { makeStyles } from "@material-ui/core/styles";
import { GrFormView } from "react-icons/gr";
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
import { useLeavesPeriod } from "./leaves/useLeavesPeriod";

const YEAR = new Date().getFullYear();

export default function EmployeeTableLeaveView() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { employees, setEmployeeId } = useEmployees();
  const { leavesperiod, setLeavePeriodYrId } = useLeavesPeriod();
  const [empdata, setEmpData] = useState([]);
  const [toBuild, setToBuild] = useState(true);

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
      },
      // { title: "IC No", field: "ic_no" },
      // { title: "Gender", field: "gender" },
      { title: "Emp No", field: "empno" },
      { title: "Designation", field: "designation" },
      // { title: "Department", field: "department" },

      {
        title: "Leave Entitled",
        field: "leave_entitled",
        type: "numeric",
        cellStyle: {
          width: 60,
        },
      },
      {
        title: "Leave C/F",
        field: "leave_bf",
        type: "numeric",
        cellStyle: {
          width: 60,
        },
      },
      {
        title: "Total Leave",
        field: "leave_total",
        type: "numeric",
        cellStyle: {
          width: 60,
        },
      },
      {
        title: "Leave Taken",
        field: "leave_taken",
        type: "numeric",
        cellStyle: {
          width: 60,
        },
      },
      // {
      //   title: "Leave Pending",
      //   field: "leave_pending",
      //   type: "numeric",
      //   cellStyle: {
      //     width: 60,
      //   },
      // },
      {
        title: "Leave Balance",
        field: "leave_bal",
        type: "numeric",
        cellStyle: {
          width: 60,
        },
      },
      {
        title: "Others",
        field: "leave_others",
        type: "numeric",
        cellStyle: {
          width: 60,
        },
      },
      // { title: "Email", field: "email" },
    ],
    []
  );

  const update_Employee = (data) => {
    const { id } = data;
    resetSingleEmployee();
    resetEmployees();
    setEditEmployeeID(id);
    setIsEditingOn();
    setEmployeeId(id);

    navigate("/singleemployee");
  };

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
          emp[index].leave_cd = leaveCd;
          emp[index].leave_total = leaveEntitled + leaveBf;
          emp[index].leave_taken = leaveTaken + leaveCd;
          emp[index].leave_pending = leavePending;
          emp[index].leave_others = leaveOthers;
          emp[index].leave_bal = leaveEntitled + leaveBf - leaveCd - leaveTaken;
          setEmpData(emp);
        });
    }
  };

  useEffect(() => {
    setLeavePeriodYrId(YEAR);
  }, []);

  useEffect(() => {
    console.log("leaveperiod", leavesperiod);
    Build_EmpData(YEAR);
  }, []);

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
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={empdata
            .filter((r) => !r.hasresigned)
            .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))}
          title="Employee Leave Details"
          actions={[
            (rowData) => ({
              //disabled: rowData.status !== "Pending",
              icon: () => <GrFormView size="33px" />,
              tooltip: "View",
              onClick: (event, rowData) => {
                update_Employee(rowData);
              },
            }),
          ]}
          options={{
            filtering: true,
            search: true,
            toolbar: false,
            paging: false,
            headerStyle: {
              backgroundColor: "rgba(75, 192, 192, 1)",
              color: "white",
            },
            showTitle: false,
          }}
        />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
