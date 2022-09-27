import React, { useState, useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useExpensesStatus } from "./expenses/useExpensesStatus";

const FILTERSTRING = "Pending";

export default function ExpenseTableHistoryView() {
  const classes = useStyles();
  //const [isDialogOpen, setIsDialogOpen] = useState(false);
  //const [isAlertOpen, setIsAlertOpen] = useState(false);
  //const { loadEmployees } = useEmployeesContext();
  const { expensesstatus, setExpStatusId } = useExpensesStatus();
  //const { expensesperiod, setExpPeriodId } = useExpensesPeriod();

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

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={expensesstatus}
          title="Leave Application"
          options={{
            filtering: false,
            search: false,
            toolbar: false,
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
