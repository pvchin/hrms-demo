import React, { useState, useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { GrTask } from "react-icons/gr";
import { useRecoilState } from "recoil";
//import AddIcon from "@material-ui/icons/Add";
//import EditIcon from "@material-ui/icons/Edit";
//import DeleteIcon from "@material-ui/icons/Delete";
//import CheckIcon from "@material-ui/icons/Check";
//import SearchIcon from "@material-ui/icons/Search";
//import LeaveForm from "./LeaveForm";
//import { CustomDialog } from "../helpers/CustomDialog";
//import { AlertDialog } from "../helpers/AlertDialogBox";
import { CustomDialog } from "../helpers/CustomDialog";
import { useLeavesPeriodbyMth } from "./leaves/useLeavesPeriodbyMth";
import { useUpdateLeaves } from "./leaves/useUpdateLeaves";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import { loginLevelState } from "./data/atomdata";
import ApprovalManagerScreen from "./ApprovalManagerScreen";

//const FILTERSTRING = "Pending";

const initial_form = {
  name: "",
  to_date: "",
  from_date: "",
  reason: "",
  status: "Pending",
  no_of_days: 0,
  leave_bal: 0,
  reporting_email: "",
};

export default function LeaveTableViewSummary({ year, month }) {
  const classes = useStyles();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { leavesperiodbymth, setLeavePeriodMthId, setLeavePeriodYrId } =
    useLeavesPeriodbyMth();
  const updateLeave = useUpdateLeaves();
  const [formdata, setFormdata] = useState(initial_form);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [editLeaveID, setEditLeaveID] = useState("");
  const {
    isOpen: isAppScreenOpen,
    onOpen: onAppScreenOpen,
    onClose: onAppScreenClose,
  } = useDisclosure();

  const columns = useMemo(
    () => [
      {
        title: "Name",
        field: "name",
        width: "250px",
      },

      {
        title: "From Date",
        field: "from_date",
        type: "date",
        dateSetting: { locale: "en-GB" },
        editable: "never",
        width: "140px",
      },
      {
        title: "To Date",
        field: "to_date",
        type: "date",
        dateSetting: { locale: "en-GB" },
        editable: "never",
        width: "140px",
      },
      {
        title: "No of Days",
        field: "no_of_days",
        type: "numeric",
        editable: "never",
        width: "140px",
      },
      {
        title: "Type of Leaves",
        field: "leavetype",
        editable: "never",
        width: "200px",
      },
      {
        title: "Reason",
        field: "reason",
        editable: "never",
        width: "250px",
      },
      { title: "Status", field: "status", width: "140px" },
    ],
    []
  );

  useEffect(() => {
    setLeavePeriodYrId(year);
    setLeavePeriodMthId(month);
  }, []);

  const Update_Leave = (data) => {
    //console.log("del data", data);
    const { id, attachmentid, rec_id, tableData, ...fields } = data;
    const editData = { ...fields };

    setFormdata({ ...editData });
    setFormdata({ ...editData });
    setEditLeaveID(id);
    handleAppScreenOpen();
  };

  const handleAppScreenOpen = () => {
    onAppScreenOpen();
  };
  const handleAppScreenClose = () => {
    onAppScreenClose();
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };
  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    const upddata = { ...formdata, posted: "D" };
    updateLeave({ id: editLeaveID, ...upddata });
    // const id = editExpenseID;
    // deleteExpenses(id);
    // expensesattachments
    //   .filter((r) => r.attachmentid === expattachId)
    //   .forEach((rec) => {
    //     const id = rec.id;
    //     deleteExpensesAttachment(id);
    //   });
  };

  const handleOnUpdateConfirm = (data) => {
    //console.log("update", data)
    const posted = data.status === "Delete" ? "D" : "";
    const upddata = { ...data, posted: posted };
    updateLeave({ id: editLeaveID, ...upddata });
  };

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      {/* <div style={{ maxWidth: "100%", paddingTop: "5px" }}> */}

      <Box maxW="100%" pt="5px" overflow="scroll">
        <MaterialTable
          columns={columns}
          data={leavesperiodbymth}
          title="Leave Application"
          actions={[
            (rowData) => ({
              icon: () => <GrTask size="23px" />,
              hidden: loginLevel.loginLevel !== "Manager",
              tooltip: "Edit",
              onClick: (event, rowData) => {
                Update_Leave(rowData);
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
          tabIndex={0}
        />
      </CustomDialog>
      <AlertDialogBox
        onClose={handleAlertClose}
        onConfirm={handleOnDeleteConfirm}
        isOpen={isAlertOpen}
        title="Delete Leave"
      >
        <h2>
          Are you sure you want to delete {formdata.name} leave from{" "}
          {formdata.from_date} to {formdata.to_date} ?
        </h2>
      </AlertDialogBox>
    </div>
    // </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
