import React, { useState, useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
//import AddIcon from "@material-ui/icons/Add";
//import { EditIcon } from "@material-ui/icons";
import { GrFormView, GrTrash, GrTask } from "react-icons/gr";
//import DeleteIcon from "@material-ui/icons/Delete";
//import CheckIcon from "@material-ui/icons/Check";
//import SearchIcon from "@material-ui/icons/Search";
//import LeaveForm from "./LeaveForm";
//import { CustomDialog } from "../helpers/CustomDialog";
//import { AlertDialog } from "../helpers/AlertDialogBox";
//import { useExpensesStatus } from "./expenses/useExpensesStatus";
import { useCustomToast } from "../helpers/useCustomToast";
import { CustomDialog } from "../helpers/CustomDialog";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import { loginLevelState } from "./data/atomdata";
import { useExpensesPeriod } from "./expenses/useExpensesPeriod";
import { useExpensesContext } from "../context/expenses_context";
import ExpenseFormView from "./ExpenseFormView";
import { useDeleteExpenses } from "./expenses/useDeleteExpenses";
import { useUpdateExpenses } from "./expenses/useUpdateExpenses";
import { useExpensesAttachments } from "./expensesattachments/useExpensesAttachments";
import { useDeleteExpensesAttachment } from "./expensesattachments/useDeleteExpensesAttachment";
import ApprovalManagerScreen from "./ApprovalManagerScreen";
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
  const toast = useCustomToast();
  //const [isDialogOpen, setIsDialogOpen] = useState(false);
  //const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [totals, setTotals] = useState(0);
  const [isCalc, setIsCalc] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  //const { loadEmployees } = useEmployeesContext();
  //const { expensesstatus, setExpStatusId } = useExpensesStatus();
  const [formdata, setFormdata] = useState(initial_form);
  const deleteExpenses = useDeleteExpenses();
  const updateExpenses = useUpdateExpenses();
  const { expensesattachments, setAttachmentId } = useExpensesAttachments();
  const deleteExpensesAttachment = useDeleteExpensesAttachment();
  const [expattachId, setExpattachId] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const {
    isOpen: isErrOpen,
    onClose: onErrClose,
    onOpen: onErrOpen,
  } = useDisclosure({ defaultIsOpen: false });
  const {
    isOpen: isAppScreenOpen,
    onOpen: onAppScreenOpen,
    onClose: onAppScreenClose,
  } = useDisclosure();
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

  const Update_Expenses = (data) => {
    //console.log("del data", data);
    const { id, attachmentid, rec_id, tableData, ...fields } = data;
    const editData = { ...fields };

    setFormdata({ ...editData });
    setFormdata({ ...editData });
    setEditExpenseID(id);
    setAttachmentId(attachmentid);
    setExpattachId(attachmentid);
    data.payrun
      ? toast({
          title: "This expense has been paid. It can not be modified!",
          status: "error",
        })
      : handleAppScreenOpen();
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };
  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    const upddata = { ...formdata, posted: "D" };
    updateExpenses({ id: editExpenseID, ...upddata });
    // const id = editExpenseID;
    // deleteExpenses(id);
    // expensesattachments
    //   .filter((r) => r.attachmentid === expattachId)
    //   .forEach((rec) => {
    //     const id = rec.id;
    //     deleteExpensesAttachment(id);
    //   });
  };

  const handleAppScreenOpen = () => {
    onAppScreenOpen();
  };
  const handleAppScreenClose = () => {
    onAppScreenClose();
  };

  const handleOnUpdateConfirm = (data) => {
    console.log("update", data);
    const posted = data.status === "Delete" ? "D" : "";
    const upddata = { ...data, posted: posted };
    updateExpenses({ id: editExpenseID, ...upddata });
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
            (rowData) => ({
              icon: () => <GrTask size="23px" />,
              hidden: loginLevel.loginLevel !== "Manager",
              tooltip: "Edit",
              onClick: (event, rowData) => {
                Update_Expenses(rowData);
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
          tabIndex={1}
        />
      </CustomDialog>
      <AlertDialogBox
        onClose={handleAlertClose}
        onConfirm={handleOnDeleteConfirm}
        isOpen={isAlertOpen}
        title="Delete Expenses"
      >
        <h2>
          Are you sure you want to delete {formdata.name} expense dated on{" "}
          {formdata.date} with amount ${formdata.amount} ?
        </h2>
      </AlertDialogBox>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
