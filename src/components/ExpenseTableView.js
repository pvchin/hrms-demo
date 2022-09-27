import React, { useState, useMemo } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { CustomDialog } from "../helpers/CustomDialog";
import { useExpenses } from "./expenses/useExpenses";
import { GrFormView } from "react-icons/gr";
import { useExpensesContext } from "../context/expenses_context";
import ExpenseFormView from "./ExpenseFormView";

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

export default function ExpenseTableView() {
  const classes = useStyles();
  //const [isDialogOpen, setIsDialogOpen] = useState(false);
  //const [isAlertOpen, setIsAlertOpen] = useState(false);
  //const { loadEmployees } = useEmployeesContext();
  const { expenses } = useExpenses();
  const [formdata, setFormdata] = useState(initial_form);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
  // const {
  //   //expenses,
  //   addExpense,
  //   expenses_loading,
  //   updateExpense,
  //   deleteExpense,
  //   loadPendingExpenses,
  //   getSingleExpense,
  //   setEditExpenseID,
  //   setIsExpenseEditingOn,
  //   setIsExpenseEditingOff,
  //   resetSingleExpense,
  // } = useExpensesContext();

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

  // useEffect(() => {
  //   loadPendingExpenses(FILTERSTRING);
  // }, []);

  // const handleDialogOpen = () => {
  //   setIsDialogOpen(true);
  //};

  // const handleDialogClose = () => {
  //   setIsDialogOpen(false);
  //   //loadPendingExpenses(FILTERSTRING);
  // };

  // const handleAlertOpen = () => {
  //   setIsAlertOpen(true);
  // };

  // const handleAlertClose = () => {
  //   setIsAlertOpen(false);
  // };

  const View_Expenses = (data) => {
    const { id } = data;
    setFormdata({ ...data });
    setFormdata((prev) => (prev = { ...data }));
    setEditExpenseID(id);
    setIsExpenseEditingOn();
    handleDialogOpen();
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={expenses
            .filter((r) => r.status === "Pending")
            .map((rec) => {
              return { ...rec };
            })}
          title="Expenses Claims Application"
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
            headerStyle: {
              backgroundColor: "#90CDF4",
              color: "primary",
            },
            showTitle: false,
          }}
        />
      </div>
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
