import React, { useState, useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import {
  //useSetRecoilState,
  useRecoilValue,
  //useRecoilState,
  //useRecoilValueLoadable,
} from "recoil";
import {
  allowsPeriodState,
  //allowsDataState,
  //empidState,
} from "./data/atomdata";
//import { fetchDailyAllowancesSelector } from "./data/selectordata";
//import AddIcon from "@material-ui/icons/Add";
//import EditIcon from "@material-ui/icons/Edit";
//import DeleteIcon from "@material-ui/icons/Delete";
//import CheckIcon from "@material-ui/icons/Check";
//import SearchIcon from "@material-ui/icons/Search";
//import ArrowBackIcon from "@material-ui/icons/ArrowBack";
//import { CustomDialog } from "../helpers/CustomDialog";
//import { useDailyAllowancesContext } from "../context/dailyallowances_context";
//import { useEmployeesContext } from "../context/employees_context";
//import DailyAllowsDetlsTable from "./DailyAllowsDetlsTable";
import { useDailyAllowsStatus } from "./dailyallows/useDailyAllowsStatus";

const FILTERSTRING = "Verified";

export default function DailyAllowancesTable() {
  //let history = useHistory();
  const classes = useStyles();
  //const [isDialogOpen, setIsDialogOpen] = useState(false);
  //const [tmpallowsdata, setTmpallowsdata] = useState([]);
  const allows_period = useRecoilValue(allowsPeriodState);
  //const allows_empid = useRecoilValue(empidState);
  //const [allowsdata, setAllowsdata] = useRecoilState(allowsDataState);
  const { dailyallowsstatus, setDailyAllowsStatusId } = useDailyAllowsStatus();
  //const setEmpID = useSetRecoilState(empidState);
  const title = `Site Allowances (${allows_period})`;
  //const {
  //dailyallowances,
  //loadPendingDailyAllowances,
  //singlebatch_dailyallowance,
  //inglebatch_dailyallowance_loading,
  //deleteDailyAllowance,
  //setEditDailyAllowanceID,
  //setIsDailyAllowanceEditingOn,
  //setIsDailyAllowanceEditingOff,
  //resetSingleDailyAllowance,
  //dailyallowance_period,
  //getSingleBatchDailyAllowance,
  //} = useDailyAllowancesContext();

  const columns = useMemo(() => [
    {
      title: "Name",
      field: "name",
    },
    { title: "Period", field: "period" },
    { title: "Location", field: "location" },
    { title: "Manager", field: "manager" },
    { title: "Days", field: "no_of_days", type: "numeric" },
    { title: "Amount", field: "amount", type: "currency" },
    { title: "Status", field: "status" },
  ],[]);

  useEffect(() => {
    setDailyAllowsStatusId(FILTERSTRING);
  }, []);

  //const handleDialogOpen = () => {
  //console.log("allowsdetls", allowsdata, allowsdataRef, singlebatch_dailyallowsdetl);
  //setAllowsdata({ singlebatch_dailyallowsdetl });
  //setIsDialogOpen(true);
  //};

  //const handleDialogClose = () => {
  //setIsDialogOpen(false);
  //getSingleBatchDailyAllowance(dailyallowance_period);
  //};

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={dailyallowsstatus}
          title={title}
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
  dialog: {
    width: 1000,
  },
}));
