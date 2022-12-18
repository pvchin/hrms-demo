import React, { useEffect, useMemo, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Box, useDisclosure } from "@chakra-ui/react";
import { GrTask } from "react-icons/gr";
import { useRecoilState } from "recoil";
//import { useHistory } from "react-router-dom";
//import { useSetRecoilState } from "recoil";
import //payPeriodState,
//payPeriodEndMonthState,
//payPeriodEmpIdState,
"./data/atomdata";
//import { usePayslipsContext } from "../context/payslips_context";
import { CustomDialog } from "../helpers/CustomDialog";
import { usePayrunStatus } from "./payrun/usePayrunStatus";
import { loginLevelState } from "./data/atomdata";
import { useUpdatePayrun } from "./payrun/useUpdatePayrun";
import ApprovalManagerScreen from "./ApprovalManagerScreen";

//const FILTERSTRING = "Pending";

export default function PayslipTableVIew({ status }) {
  //let history = useHistory();
  const classes = useStyles();
   const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  //const setPayPeriodEmpId = useSetRecoilState(payPeriodEmpIdState);
  //const { payrun, getPayrun,payrun_loading, loadPendingPayslips } =
  //  usePayslipsContext();
  //const { loadEmployees, employees } = useEmployeesContext();
  const updatePayrun = useUpdatePayrun()
  const { payrunstatus, setPayrunStatusId } = usePayrunStatus();
  const [payrunID, setPayrunID] = useState("")
  const [formdata, setFormdata] = useState({});
  const {
    isOpen: isAppScreenOpen,
    onOpen: onAppScreenOpen,
    onClose: onAppScreenClose,
  } = useDisclosure();

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

  const Update_Payrun = (data) => {
     const { id, rec_id, tableData, ...fields } = data;
     const editData = { ...fields };

     setFormdata({ ...editData });
     setFormdata({ ...editData });
     setPayrunID(id);
     handleAppScreenOpen();
  }

  const handleAppScreenOpen = () => {
    onAppScreenOpen();
  };
  const handleAppScreenClose = () => {
    onAppScreenClose();
  };

   const handleOnUpdateConfirm = (data) => {
     console.log("update", data);
     const posted = data.status === "Delete" ? "D" : "";
     const upddata = { ...data };
     updatePayrun({ id: payrunID, ...upddata });
  };
  
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
          actions={[
            (rowData) => ({
              icon: () => <GrTask size="23px" />,
              hidden: loginLevel.loginLevel !== "Manager",
              tooltip: "Edit",
              onClick: (event, rowData) => {
                Update_Payrun(rowData);
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
              color: "#FFF",
            },
            showTitle: false,
          }}
        />
      </Box>
      <CustomDialog
        isOpen={isAppScreenOpen}
        handleClose={handleAppScreenClose}
        title=""
        showButton={true}
        isFullscree={false}
      >
        <ApprovalManagerScreen
          formdata={formdata}
          setFormdata={setFormdata}
          handleDialogClose={handleAppScreenClose}
          onConfirm={handleOnUpdateConfirm}
          tabIndex={3}
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
