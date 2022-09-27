import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
//import {
  //payPeriodState,
  //payPeriodEndMonthState,
  //payPeriodEmpIdState,
//} from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";

const FILTERSTRING = "Verified";

const columns = [
  {
    title: "Batch",
    field: "payrun",
    editable: "never",
  },
  // { title: "Period", field: "period", editable: "never" },
  // {
  //   title: "PayDate",
  //   field: "pay_date",
  //   type: "date",
  //   dateSetting: { locale: "en-GB" },
  //   editable: "never",
  // },
  {
    title: "Wages",
    field: "totalwages",
    type: "currency",
    editable: "never",
  },
  {
    title: "TAP Amount",
    field: "totaltap",
    type: "currency",
    editable: "never",
  },
  {
    title: "SCP Amount",
    field: "totalscp",
    type: "currency",
    editable: "never",
  },
  {
    title: "Site Allowances",
    field: "totalsitesallows",
    type: "currency",
    editable: "never",
  },
  {
    title: "Expenses Claims",
    field: "totalexpensesclaims",
    type: "currency",
    editable: "never",
  },
  {
    title: "Allowances",
    field: "totalallows",
    type: "currency",
    editable: "never",
  },
  {
    title: "Deductions",
    field: "totaldeducts",
    type: "currency",
    editable: "never",
  },
  {
    title: "Payroll",
    field: "totalpayroll",
    type: "currency",
    editable: "never",
  },
  // { title: "Bank Name", field: "bank_name" },
  // { title: "Bank AC No", field: "bank_accno" },
  { title: "Status", field: "status", editable: "never" },
];

export default function PayslipTableVIew() {
  //et history = useHistory();
  const classes = useStyles();
  
  const {
    batchpayrun,
    getBatchPayrun,
    //batchpayrun_loading,
    //batchpayrun_error,
    //loadPendingPayslips,
  } = usePayslipsContext();
  //const { loadEmployees, employees } = useEmployeesContext();

  useEffect(() => {
    getBatchPayrun(FILTERSTRING);
  }, []);

  
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={batchpayrun}
          title="Payslips"
          options={{
            filtering: false,
            search: false,
            toolbar: false,
            headerStyle: {
              backgroundColor: "#90CDF4",
              color: "black",
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
