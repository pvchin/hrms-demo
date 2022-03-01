import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import AddIcon from "@material-ui/icons/Add";
//import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
//import { useCustomToast } from "../helpers/useCustomToast";
//import { useExpensesContext } from "../context/expenses_context";
import HocForm from "./HocForm";
//import { useEmployeesContext } from "../context/employees_context";
import { CustomDialog } from "../helpers/CustomDialog";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import { useHoc } from "./hoc/useHoc";
//import { useAddHoc } from "./hoc/useAddHoc";
import { useDeleteHoc } from "./hoc/useDeleteHoc";
//import { useUpdateHoc } from "./hoc/useUpdateHoc";

const columns = [
  {
    title: "Findings",
    field: "findings",
    editable: "never",
    cellStyle: {
      minWidth: 200,
      maxWidth: 200,
    },
  },
  {
    title: "Risks",
    field: "risks",
    editable: "never",
    cellStyle: {
      minWidth: 150,
      maxWidth: 150,
    },
  },
  {
    title: "Type/Category",
    field: "category",
    editable: "never",
  },
  {
    title: "What",
    field: "what",
    editable: "never",
  },
  {
    title: "What Details",
    field: "what_details",
    editable: "never",
    cellStyle: {
      minWidth: 150,
      maxWidth: 150,
    },
  },
  {
    title: "Why",
    field: "why",
    editable: "never",
  },
  {
    title: "Why Details",
    field: "why_details",
    editable: "never",
  },
  {
    title: "Discussion",
    field: "discussion",
    editable: "never",
  },
  {
    title: "Action",
    field: "action",
    editable: "never",
    cellStyle: {
      minWidth: 200,
      maxWidth: 200,
    },
  },
  {
    title: "Follow-up required?",
    field: "isfollowup",
    editable: "never",
  },
  {
    title: "Work Related?",
    field: "isworkrelated",
    editable: "never",
  },
  {
    title: "Raised By",
    field: "raisedby",
    editable: "never",
  },
  {
    title: "Raised On",
    field: "raisedon",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "Company",
    field: "company",
    editable: "never",
  },
  {
    title: "Location",
    field: "location",
    editable: "never",
  },
  // {
  //   title: "Department",
  //   field: "department",
  //   editable: "never",
  // },
];

const initial_form = {
  findings: "",
  category: "",
  what: "",
  what_details: "",
  why: "",
  why_details: "",
  discussion: "No",
  action: "",
  isfollowup: "No",
  isworkrelated: "No",
  raisedby: "",
  email: "",
  raisedon: null,
  company: "APPSMITH SUTERA",
  location: " ",
  department: "",
};

export default function HocTable() {
  const classes = useStyles();
  //const toast = useCustomToast();
  //const [isLoad, setIsLoad] = useState(false);
  const { hoc, setHocId } = useHoc();
  //const updateHoc = useUpdateHoc();
  //const addHoc = useAddHoc();
  const deleteHoc = useDeleteHoc();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  //const [hocdata, setHocdata] = useState([]);
  //const [alertSuccess, setAlertSuccess] = useState(false);
  const [formdata, setFormdata] = useState(initial_form);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [isEditId, setIsEditId] = useState("");

  useEffect(() => {
    //console.log("loginid", loginLevel.loginUserId)
    setHocId(loginLevel.loginUserId);
  }, []);

  const add_Hoc = async (data) => {
    //const { id } = data;
    let today = format(new Date(), "yyyy-MM-dd");
    //console.log("today", today);
    setIsEditId((prev) => (prev = ""));
    setFormdata(
      (prev) =>
        (prev = {
          ...data,
          raisedby: loginLevel.loginUser,
          email: loginLevel.loginEmail,
          company: "APPSMITHS SUTERA",
          raisedon: today,
        })
    );
    //setFormdata(initial_form);
    //setIsHocEditingOff();
    handleDialogOpen();
    // history.push("/singleexpense");
  };

  const update_Hoc = async (data) => {
    console.log("hoc", data);
    const { id } = data;
    setIsEditId((prev) => (prev = id));
    setFormdata((prev) => (prev = { ...data }));
    //setFormdata({ ...data });
    //setHocId(prev => prev = id)
    //setEditHocID(id);
    //setIsExpenseEditingOn();
    handleDialogOpen();

    // history.push("/singleexpense");
  };

  const delete_Hoc = (data) => {
    const { id } = data;
    setIsEditId((prev) => (prev = id));
    handleAlertOpen();

    // deleteExpense(id);
    // loadExpenses();
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    //const id = isEditId;
    deleteHoc(isEditId);
  };

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={hoc}
          title="HOC Tables"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <CheckCircleOutlineOutlinedIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
          }}
          // editable={{
          //   onRowUpdate: (newData, oldData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         const dataUpdate = [...expensesdata];
          //         const index = oldData.tableData.id;
          //         dataUpdate[index] = newData;
          //         setExpensesdata([...dataUpdate]);
          //         //approve_Expense(newData);

          //         resolve();
          //       }, 1000);
          //     }),
          // }}
          actions={[
            (rowData) => ({
              icon: "edit",
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                update_Hoc(rowData);
              },
            }),
            (rowData) => ({
              icon: "delete",
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                delete_Hoc(rowData);
              },
            }),
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_Hoc(rowData);
              },
            },
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
        <CustomDialog
          isOpen={isDialogOpen}
          handleClose={handleDialogClose}
          title=""
          showButton={true}
          isFullscreen={false}
          isFullwidth={false}
          isEditId={isEditId}
        >
          <HocForm
            formdata={formdata}
            setFormdata={setFormdata}
            handleDialogClose={handleDialogClose}
          />
        </CustomDialog>

        <AlertDialogBox
          onClose={handleAlertClose}
          onConfirm={handleOnDeleteConfirm}
          isOpen={isAlertOpen}
          title="Delete HOC"
        >
          <h2>Are you sure you want to delete ?</h2>
        </AlertDialogBox>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
