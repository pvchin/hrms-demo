import React, { useState, useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@chakra-ui/react";

//import AddIcon from "@material-ui/icons/Add";
//import { EditIcon } from "@material-ui/icons";
import { GrFormView } from "react-icons/gr";
//import DeleteIcon from "@material-ui/icons/Delete";
//import CheckIcon from "@material-ui/icons/Check";
//import SearchIcon from "@material-ui/icons/Search";
//import LeaveForm from "./LeaveForm";
//import { CustomDialog } from "../helpers/CustomDialog";
//import { AlertDialog } from "../helpers/AlertDialogBox";
//import { useExpensesStatus } from "./expenses/useExpensesStatus";
import { CustomDialog } from "../helpers/CustomDialog";
import { useExpensesPeriod } from "./expenses/useExpensesPeriod";
import { useExpensesContext } from "../context/expenses_context";
import ExpenseFormView from "./ExpenseFormView";
//import { useEmployeesContext } from "../context/employees_context";

//const FILTERSTRING = "Pending";

const initial_form = {
  name: "",
  date: "",
  purchased_from: "",
  description: "",
  status: "Pending",
  amount: 0,
  attachment1_name: "",
  attachment1_url: "",
  attachment2_name: "",
  attachment2_url: "",
  attachment3_name: "",
  attachment3_url: "",
};

export default function ExpenseTableView({ year, month }) {
  const classes = useStyles();
  //const [isDialogOpen, setIsDialogOpen] = useState(false);
  //const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [totals, setTotals] = useState(0);
  const [isCalc, setIsCalc] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  //const { loadEmployees } = useEmployeesContext();
  //const { expensesstatus, setExpStatusId } = useExpensesStatus();
  const [formdata, setFormdata] = useState(initial_form);
  const { expensesperiod, setExpPeriodYrId, setExpPeriodMthId } =
    useExpensesPeriod();
  const {
    //expenses,
    editExpenseID,
    //updateExpense,
    //addExpense,
    //deleteExpense,
    setEditExpenseID,
    setIsExpenseEditingOn,
    setIsExpenseEditingOff,
  } = useExpensesContext();

  const columns = useMemo(
    () => [
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Date",
        field: "date",
        type: "date",
        dateSetting: { locale: "en-GB" },
      },

      { title: "Description", field: "description" },
      { title: "Amount", field: "amount", type: "currency" },
      { title: "Status", field: "status" },
    ],
    []
  );

  useEffect(() => {
    setExpPeriodYrId(year);
    setExpPeriodMthId(month);
    setIsCalc(true);
  }, []);

  useEffect(() => {
    if (expensesperiod) {
      Calc_Totals();
      setIsCalc(false);
    }
  }, [isCalc]);

  const Calc_Totals = () => {
    const amount = expensesperiod.reduce((acc, r) => {
      if (r.status === "Approved" || r.status === "Approve") {
        return acc + r.amount;
      } else {
        return acc;
      }
    }, 0);
    setTotals(amount);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const View_Expenses = (data) => {
    const { id } = data;
    setFormdata({ ...data });
    setFormdata({ ...data });
    setEditExpenseID(id);
    setIsExpenseEditingOn();
    handleDialogOpen();
  };

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <Box maxW="100%" pt="5px" overflow="scroll">
        <MaterialTable
          columns={columns}
          data={expensesperiod}
          title="Leave Application"
          actions={[
            (rowData) => ({
              icon: () => <GrFormView size="33px" />,
              tooltip: "View",
              onClick: (event, rowData) => {
                View_Expenses(rowData);
              },
            }),
          ]}
          options={{
            filtering: false,
            search: false,
            toolbar: false,
            paging: false,
            headerStyle: {
              backgroundColor: "rgba(75, 192, 192, 1)",
              color: "white",
            },
            showTitle: false,
          }}
        />
      </Box>
      <CustomDialog
        isOpen={isDialogOpen}
        handleClose={handleDialogClose}
        title=""
        showButton={true}
        isFullscreen={false}
        isFullwidth={false}
      >
        <ExpenseFormView
          formdata={formdata}
          setFormdata={setFormdata}
          handleDialogClose={handleDialogClose}
        />
      </CustomDialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
