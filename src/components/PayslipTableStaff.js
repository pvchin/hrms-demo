import React, { useEffect, useState, useMemo } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import PrintIcon from "@material-ui/icons/Print";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
//import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  //payPeriodState,
  //payPeriodEndMonthState,
  //payPeriodEmpIdState,
  loginLevelState,
} from "./data/atomdata";
//import { usePayslipsContext } from "../context/payslips_context";
import { usePayslips } from "./payslips/usePayslips";
import { useEmployees } from "./employees/useEmployees";
import PrintPayslip from "./PrintPayslip";

// const PrintPayslip = React.lazy(() =>
//   import("./PrintPayslip")
// );
//const PrintPayslip = React.lazy(() => import("./PrintPayslip"));

export default function PayslipTable() {
  //let history = useHistory();
  const classes = useStyles();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { employees } = useEmployees();
  const { payslips, setPayslipId } = usePayslips();
  const [isLoad, setIsLoad] = useState(true);

  const columns = useMemo(
    () => [
      {
        title: "Name",
        field: "name",
      },
      { title: "Period", field: "payrun" },
      // {
      //   title: "Date",
      //   field: "date",
      //   type: "date",
      //   dateSetting: { locale: "en-GB" },
      // },
      { title: "Basic Pay", field: "wages_bnd", type: "currency" },
      { title: "TAP Amount", field: "tap_amount_bnd", type: "currency" },
      { title: "SCP Amount", field: "scp_amount_bnd", type: "currency" },
      { title: "Site Allowances", field: "site_allows_bnd", type: "currency" },
      {
        title: "Expenses Claims",
        field: "expenses_claims_bnd",
        type: "currency",
      },
      { title: "Allowances", field: "total_allowances_bnd", type: "currency" },
      { title: "Deductions", field: "total_deductions_bnd", type: "currency" },
      { title: "Nett Pay", field: "nett_pay_bnd", type: "currency" },
      // { title: "Bank Name", field: "bank_name" },
      // { title: "Bank AC No", field: "bank_accno" },
      { title: "Status", field: "status" },
    ],
    []
  );

  const exportPdfTable = ({ data, emp }) => {
    PrintPayslip({ data, emp });
  };

  const print_Payslip = async (data) => {
    const { empid } = data.rowData;
    const emp = employees
      .filter((f) => f.id === empid)
      .map((r) => {
        return { ...r };
      });
    exportPdfTable({ data, emp });
  };

  // const update_Payslip = async (data) => {
  //   const { id } = data;
  //   setPayPeriodEmpId(id); //save to recoil
  //   setEditPayslipID(id);
  //   setIsPayslipEditingOn();
  //   getSinglePayslip(id);
  //   history.push("/singlepayslip");
  //};

  // const add_Payslip = async (data) => {
  //   const { id } = data;
  //   resetSinglePayslip();
  //   setEditPayslipID("");
  //   setIsPayslipEditingOff();
  //   history.push("/singlepayslip");
  // };

  // const delete_Payslip = (data) => {
  //   const { id } = data;
  //   setEditPayslipID(id);
  //   deletePayslip(id);
  //   loadPayslips();
  //};

  useEffect(() => {
    setPayslipId(loginLevel.loginUserId);
    setIsLoad(true);
  }, [isLoad]);

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          //data={payslips}
          data={payslips
            .filter((r) => r.empid === loginLevel.loginUserId)
            .sort((a, b) =>
              a.payrun > b.payrun ? -1 : b.payrun > a.payrun ? 1 : 0
            )}
          title="Payslips"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <EditIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
            Build: (props) => <BuildOutlinedIcon />,
            Print: (props) => <PrintIcon />,
          }}
          actions={[
            {
              icon: "print",
              tooltip: "Print Payslip",
              onClick: (event, rowData) => {
                print_Payslip({ rowData });
              },
            },
            // {
            //   icon: "delete",
            //   tooltip: "Delete Record",
            //   onClick: (event, rowData) => {
            //     delete_Payslip(rowData);
            //   },
            // },
            // {
            //   icon: "add",
            //   tooltip: "Add Record",
            //   isFreeAction: true,
            //   onClick: (event, rowData) => {
            //     add_Payslip(rowData);
            //   },
            // },
          ]}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "orange",
              color: "#FFF",
            },
            showTitle: true,
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
              </div>
            ),
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
