import React from "react";
import { Divider, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//import { useHistory } from "react-router-dom";

//import { useDepartments } from "./departments/useDepartments";
//import { useDesignations } from "./designations/useDesignations";
//import { useAllowances } from "./allowances/useAllowances";
//import { useDeductions } from "./deductions/useDeductions";
//import { useCurrency } from "./currency/useCurrency";

//import { useTablesContext } from "../context/tables_context";
import UpdateAllowances from "./AllowancesTable";
import UpdateDeductions from "./DeductionsTable";
import UpdateDepartments from "./DepartmentsTable";
import UpdateDesignations from "./DesignationsTable";
import UpdateInstitutes from "./InstitutesTable";
import UpdateCurrency from "./CurrencyTable";
import UpdateGroups from "./GroupsTable";
import UpdateLeavestype from "./LeavestypesTable"

const TablesUpdate = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container alignItems="center" className={classes.grid}>
        <Grid xs={12}>
          <h2>Tables Maintenance</h2>
        </Grid>

        <Grid xs={12}>
          <UpdateAllowances />
        </Grid>
        <Divider />

        <Grid xs={12}>
          <UpdateDeductions />
        </Grid>
        <Grid xs={12}>
          <UpdateDepartments />
        </Grid>
        <Grid xs={12}>
          <UpdateDesignations />
        </Grid>
        <Grid xs={12}>
          <UpdateInstitutes />
        </Grid>
        <Grid xs={12}>
          <UpdateCurrency />
        </Grid>
        <Grid xs={12}>
          <UpdateLeavestype />
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  root: {
    padding: theme.spacing(3, 2),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  grid: {
    padding: theme.spacing(3, 2),
    // justifyContent: "center",
  },
  box: {
    height: 100,
    display: "flex",
    border: "1px solid black",
    padding: 8,
  },
}));

export default TablesUpdate;
