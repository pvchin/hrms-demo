import React, { useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@chakra-ui/react";
//import { useHistory } from "react-router-dom";
//import { useSetRecoilState } from "recoil";
import //payPeriodState,
//payPeriodEndMonthState,
//payPeriodEmpIdState,
"./data/atomdata";
//import { usePayslipsContext } from "../context/payslips_context";
import { usePayrunStatus } from "./payrun/usePayrunStatus";

//const FILTERSTRING = "Pending";

export default function PayslipTableVIew({ status }) {
  //let history = useHistory();
  const classes = useStyles();
  //const setPayPeriodEmpId = useSetRecoilState(payPeriodEmpIdState);
  //const { payrun, getPayrun,payrun_loading, loadPendingPayslips } =
  //  usePayslipsContext();
  //const { loadEmployees, employees } = useEmployeesContext();
  const { payrunstatus, setPayrunStatusId } = usePayrunStatus();

  const columns = useMemo(
    () => [
      // { title: "Period", field: "period" },
      {
        title: "Payrun Batch",
        field: "payrun",
        type: "date",
        dateSetting: { locale: "en-GB" },
      },
      // {
      //   title: "Pay Date",
      //   field: "pay_date",
      //   type: "date",
      //   dateSetting: { locale: "en-GB" },
      // },
      { title: "Total Wages", field: "totalwages", type: "currency" },
      { title: "TAP Amount", field: "totaltap", type: "currency" },
      { title: "SCP Amount", field: "totalscp", type: "currency" },
      { title: "Site Allowances", field: "totalsitesallows", type: "currency" },
      {
        title: "Expenses Claims",
        field: "totalexpensesclaims",
        type: "currency",
      },
      { title: "Total Allowances", field: "totalallows", type: "currency" },
      { title: "Total Deductions", field: "totaldeducts", type: "currency" },
      { title: "Total Payroll", field: "totalpayroll", type: "currency" },
      { title: "Status", field: "status" },
    ],
    []
  );

  useEffect(() => {
    setPayrunStatusId(status);
  }, []);

  return (
    <div className={classes.root}>
      <Box maxW="100%" pt="5px" overflow="Scroll">
        <MaterialTable
          columns={columns}
          data={payrunstatus}
          title="Payslips"
          options={{
            filtering: false,
            search: false,
            toolbar: false,
            paging: false,
            headerStyle: {
              backgroundColor: "rgba(75, 192, 192, 1)",
              color: "#FFF",
            },
            showTitle: false,
          }}
        />
      </Box>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
