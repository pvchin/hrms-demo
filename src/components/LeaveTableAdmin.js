import React, { useState, useMemo } from "react";
import MaterialTable from "material-table";
import { TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
//import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import LeaveFormAdmin from "./LeaveFormAdmin";
import { CustomDialog } from "../helpers/CustomDialog";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import { useLeavesContext } from "../context/leaves_context";
//import { useEmployeesContext } from "../context/employees_context";
import { useLeaves } from "./leaves/useLeaves";
//import { useAddLeaves } from "./leaves/useAddLeaves";
import { useDeleteLeaves } from "./leaves/useDeleteLeaves";
//import { useUpdateLeaves } from "./leaves/useUpdateLeaves";

const initial_form = {
  name: "",
  to_date: "",
  from_date: "",
  reason: "",
  status: "Pending",
  no_of_days: 0,
  leave_bal: 0,
};

export default function LeaveTable() {
  const classes = useStyles();
  const { leaves, setLeaveId } = useLeaves();
  //const updateLeaves = useUpdateLeaves();
  //const addLeaves = useAddLeaves();
  const deleteLeaves = useDeleteLeaves();
  const [formdata, setFormdata] = useState(initial_form);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  //const { loadEmployees } = useEmployeesContext();
  const {
    // leaves,
    editLeaveID,
    //leaves_loading,
    //deleteLeave,
    //loadLeaves,
    getSingleLeave,
    setEditLeaveID,
    setIsLeaveEditingOn,
    setIsLeaveEditingOff,
    resetSingleLeave,
  } = useLeavesContext();

  const columns = useMemo(
    () => [
      {
        title: "Name",
        field: "name",
        editable: "never",
      },
      {
        title: "From Date",
        field: "from_date",
        type: "date",
        dateSetting: { locale: "en-GB" },
        editable: "never",
      },
      {
        title: "To Date",
        field: "to_date",
        type: "date",
        dateSetting: { locale: "en-GB" },
        editable: "never",
      },
      {
        title: "Leave Balance",
        field: "leave_bal",
        type: "numeric",
        editable: "never",
      },
      {
        title: "No of Days",
        field: "no_of_days",
        type: "numeric",
        editable: "never",
      },
      {
        title: "Reason",
        field: "reason",
        editable: "never",
      },
      {
        title: "Status",
        field: "status",
        editComponent: (props) => (
          <TextField
            //defaultValue={props.value || null}
            onChange={(e) => props.onChange(e.target.value)}
            style={{ width: 100 }}
            value={props.value}
            select
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approve">Approve</MenuItem>
            <MenuItem value="Reject">Reject</MenuItem>
            <MenuItem value="Cancel">Cancel</MenuItem>
          </TextField>
        ),
      },
    ],
    []
  );

  // useEffect(() => {
  //   setLeaveId(editLeaveID);
  // }, []);

  const update_Leave = async (data) => {
    const { id } = data;
    setFormdata({ ...data });
    setEditLeaveID(id);
    setIsLeaveEditingOn();
    getSingleLeave(id);
    handleDialogOpen();
    //history.push("/singleleave");
  };

  const add_Leave = async (data) => {
    // const { id } = data;
    setFormdata({ ...data });
    resetSingleLeave();
    setEditLeaveID("");
    setIsLeaveEditingOff();
    handleDialogOpen();
    //history.push("/singleleave");
  };

  // const delete_Leave = (data) => {
  //   const { id } = data;
  //   setEditLeaveID(id);
  //   handleAlertOpen();
  //   //deleteLeave(id);
  //   //loadLeaves();
  // };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  // const handleAlertOpen = () => {
  //   setIsAlertOpen(true);
  // };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    const id = editLeaveID;
    deleteLeaves(id);
  };

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={leaves}
          title="Leave Application"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <AddIcon />,
            View: (props) => <VisibilityIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
          }}
          actions={[
            {
              icon: () => <VisibilityIcon />,
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                update_Leave(rowData);
              },
            },
            // {
            //   icon: "delete",
            //   tooltip: "Delete Record",
            //   onClick: (event, rowData) => {
            //     delete_Leave(rowData);
            //   },
            // },
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_Leave(rowData);
              },
            },
          ]}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#90CDF4",
              color: "primary",
            },
            showTitle: true,
          }}
        />
        <CustomDialog
          isOpen={isDialogOpen}
          handleClose={handleDialogClose}
          title=""
          showButton={true}
          isFullscree={false}
        >
          <LeaveFormAdmin
            formdata={formdata}
            setFormdata={setFormdata}
            handleDialogClose={handleDialogClose}
          />
        </CustomDialog>

        <AlertDialogBox
          onClose={handleAlertClose}
          onConfirm={handleOnDeleteConfirm}
          isOpen={isAlertOpen}
          title="Delete Expenses"
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
