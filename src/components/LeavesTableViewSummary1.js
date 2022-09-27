import React, {  useEffect } from "react";
import MaterialTable  from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
//import AddIcon from "@material-ui/icons/Add";
//import EditIcon from "@material-ui/icons/Edit";
//import DeleteIcon from "@material-ui/icons/Delete";
//import CheckIcon from "@material-ui/icons/Check";
//import SearchIcon from "@material-ui/icons/Search";
//import LeaveForm from "./LeaveForm";
//import { CustomDialog } from "../helpers/CustomDialog";
//import { AlertDialog } from "../helpers/AlertDialogBox";
import { useLeavesPeriod } from "./leaves/useLeavesPeriod";

//const FILTERSTRING = "Pending";

const columns = [
  {
    title: "Name",
    field: "name",
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
  { title: "Status", field: "status" },
];




export default function LeaveTableViewSummary({ year, month }) {
  const classes = useStyles();
  const { leavesperiod, setLeavePeriodYrId } =
    useLeavesPeriod();

  useEffect(() => {
    setLeavePeriodYrId(year);
    
  }, []);

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      {/* <div style={{ maxWidth: "100%", paddingTop: "5px" }}> */}
      
      <Box maxW="100%" pt="5px" overflow="scroll">
        <MaterialTable
          columns={columns}
          data={leavesperiod}
          title="Leave Application"
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
    </div>
    // </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
