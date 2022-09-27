import React, { useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLeavesContext } from "../context/leaves_context";

const FILTERSTRING = "Pending";

export default function LeaveTableView() {
  const classes = useStyles();
  //const [isDialogOpen, setIsDialogOpen] = useState(false);
  //const [isAlertOpen, setIsAlertOpen] = useState(false);
  //const { loadEmployees } = useEmployeesContext();
  const {
    leaves,
    //eaves_error,
    //editLeaveID,
    //leaves_loading,
    //deleteLeave,
    loadPendingLeaves,
    //getSingleLeave,
    //setEditLeaveID,
    //setIsLeaveEditingOn,
    //setIsLeaveEditingOff,
    //resetSingleLeave,
  } = useLeavesContext();

  const columns = useMemo(
    () => [
      {
        title: "Name",
        field: "name",
        editable: "never",
      },
      {
        title: "From",
        field: "from_date",
        type: "date",
        dateSetting: { locale: "en-GB" },
        editable: "never",
      },
      {
        title: "To",
        field: "to_date",
        type: "date",
        dateSetting: { locale: "en-GB" },
        editable: "never",
      },
      { title: "Days", field: "no_of_days", editable: "never" },
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

  useEffect(() => {
    loadPendingLeaves(FILTERSTRING);
  }, []);

  // const handleDialogOpen = () => {
  //   setIsDialogOpen(true);
  // };

  // const handleDialogClose = () => {
  //   setIsDialogOpen(false);
  //   loadPendingLeaves(FILTERSTRING);
  // };

  // const handleAlertOpen = () => {
  //   setIsAlertOpen(true);
  // };

  // const handleAlertClose = () => {
  //   setIsAlertOpen(false);
  // };

  // const handleOnDeleteConfirm = () => {
  //   const id = editLeaveID;
  //   deleteLeave(id);
  //   loadPendingLeaves(FILTERSTRING);
  // };

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={leaves}
          title="Leave Application"
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
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
