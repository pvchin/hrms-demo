import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, ListItem, ListItemText } from "@material-ui/core";
import {  useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";

//const FILTERSTRING = "Pending";

// const columns = [
//   {
//     title: "Name",
//     field: "name",
//     editable: "never",
//   },
//   { title: "Period", field: "period", editable: "never" },
//   {
//     title: "Date",
//     field: "date",
//     type: "date",
//     dateSetting: { locale: "en-GB" },
//     editable: "never",
//   },

//   { title: "Nett Pay", field: "nett_pay", type: "currency", editable: "never" },
//   // { title: "Bank Name", field: "bank_name" },
//   // { title: "Bank AC No", field: "bank_accno" },
//   { title: "Status", field: "status", editable: "never" },
// ];

export default function PayslipTableVIewStaff() {
  //let history = useHistory();
  const classes = useStyles();
  //const setPayPeriodEmpId = useSetRecoilState(payPeriodEmpIdState);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { payslips,  loadEmpPayslips } =
    usePayslipsContext();

  useEffect(() => {
    loadEmpPayslips(loginLevel.loginUserId);
  }, []);

  
  return (
    <div className={classes.root}>
      <Grid container direction="row">
        {payslips
          // .filter((i) => i.empid === loginLevel.loginUserId && i.status === "Approve")
          .map((row) => {
            return (
              <ListItem key={row.id}>
                {/* <Grid item sm={2} align="center">
                  <ListItemText>{row.name}</ListItemText>
                </Grid> */}
                <Grid item sm={2} align="center">
                  <ListItemText>{row.payrun}</ListItemText>
                </Grid>
                <Grid item sm={2} align="center">
                  <ListItemText>{row.pay_date}</ListItemText>
                </Grid>
                <Grid item sm={5} align="center">
                  <ListItemText>{row.period}</ListItemText>
                </Grid>
                <Grid item sm={2} align="center">
                  <ListItemText>{row.nett_pay}</ListItemText>
                </Grid>
                {/* <Grid item sm={3} align="center">
                  <ListItemText>{row.status}</ListItemText>
                </Grid> */}
              </ListItem>
            );
          })}
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
