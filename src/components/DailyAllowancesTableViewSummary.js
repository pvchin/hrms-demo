import React, { useState, useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Box, useDisclosure } from "@chakra-ui/react";
import { GrTask } from "react-icons/gr";
import {
  //useSetRecoilState,
  useRecoilValue,
  useRecoilState,
  //useRecoilValueLoadable,
} from "recoil";
import {
  allowsPeriodState,
  loginLevelState,
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
import { CustomDialog } from "../helpers/CustomDialog";
import { useCustomToast } from "../helpers/useCustomToast";
import { useDailyAllowsPeriod } from "./dailyallows/useDailyAllowsPeriod";
import { useUpdateDailyAllows } from "./dailyallows/useUpdateDailyAllows";
import ApprovalManagerScreen from "./ApprovalManagerScreen";
//const FILTERSTRING = "Submitted";

export default function DailyAllowancesTable({ month, year }) {
  //let history = useHistory();
  const classes = useStyles();
  const toast = useCustomToast();
  const period = `${year}-${month}`;

  //const [isDialogOpen, setIsDialogOpen] = useState(false);
  //const [tmpallowsdata, setTmpallowsdata] = useState([]);
  const allows_period = useRecoilValue(allowsPeriodState);
  //const allows_empid = useRecoilValue(empidState);
  //const [allowsdata, setAllowsdata] = useRecoilState(allowsDataState);
  //const setEmpID = useSetRecoilState(empidState);
  const title = `Site Allowances (${allows_period})`;
  const updateDailyAllows = useUpdateDailyAllows();
  const [formdata, setFormdata] = useState({});
  const [editDailyAllowsID, setEditDailyAllowsID] = useState("");
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { dailyallowsperiod, setDailyAllowsPeriodId } = useDailyAllowsPeriod();
  const {
    isOpen: isAppScreenOpen,
    onOpen: onAppScreenOpen,
    onClose: onAppScreenClose,
  } = useDisclosure();
  // const {
  //   dailyallowances,
  //   loadPendingDailyAllowances,
  //   singlebatch_dailyallowance,
  //   singlebatch_dailyallowance_loading,
  //   deleteDailyAllowance,
  //   setEditDailyAllowanceID,
  //   setIsDailyAllowanceEditingOn,
  //   setIsDailyAllowanceEditingOff,
  //   resetSingleDailyAllowance,
  //   dailyallowance_period,
  //   getSingleBatchDailyAllowance,
  // } = useDailyAllowancesContext();

  const columns = useMemo(
    () => [
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
    ],
    []
  );

  const Update_DailyAllows = (data) => {
    //console.log("del data", data);
    const { id, attachmentid, rec_id, tableData, ...fields } = data;
    const editData = { ...fields };

    setFormdata({ ...editData });
    setFormdata({ ...editData });
    setEditDailyAllowsID(id);
    data.payrun
      ? toast({
          title: "This allowance has been paid. It can not be modified!",
          status: "error",
        })
      : handleAppScreenOpen();
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
    const upddata = { ...data };
    updateDailyAllows({ id: editDailyAllowsID, ...upddata });
  };

  useEffect(() => {
    setDailyAllowsPeriodId(period);
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
      <Box maxW="100%" pt="5px" overflow="scroll">
        <MaterialTable
          columns={columns}
          data={dailyallowsperiod}
          title={title}
          actions={[
            (rowData) => ({
              icon: () => <GrTask size="23px" />,
              hidden: loginLevel.loginLevel !== "Manager",
              tooltip: "Edit",
              onClick: (event, rowData) => {
                Update_DailyAllows(rowData);
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
          tabIndex={2}
        />
      </CustomDialog>
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
