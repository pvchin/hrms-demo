import React, { useState,  useEffect } from "react";
import {
  Button,
  Icon,
  TextField,
    Paper,
  Typography,
    Divider,
  Grid,
  
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardLayout from "../helpers/CardLayout";
import CardLayout2 from "../helpers/CardLayout2";
import { CustomDialog } from "../helpers/CustomDialog";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  payPeriodState,
  //payPeriodEndMonthState,
  payPeriodEmpIdState,
  //payEarningDataState,
  //payDeductionDataState,
} from "./data/atomdata";

import { usePayslipsContext } from "../context/payslips_context";
import PayslipViewEarnings from "./Payslip_ViewEarnings";
import PayslipViewDeductions from "./Payslip_ViewDeductions";
import Payslip_Earnings from "./Payslip_Earnings";
import Payslip_Deductions from "./Payslip_Deductions";

// const initial_values = {
//   name: "",
//   period: "",
//   date: "",
//   bank_name: "",
//   bank_acno: "",
//   status: "Pending",
//   total_earnings: 0,
//   total_deductions: 0,
//   tap_amount: 0,
//   scp_amount: 0,
//   basic_pay: 0,
//   nett_pay: 0,
//   tap_checkbox: true,
// };

const PayslipForm = () => {
  let navigate = useNavigate();
   const classes = useStyles();
  const {
    //isPayslipEditing,
    single_payslip,
    updatePayslip,
    //addPayslip,
    editPayslipID,
    //loadPayslips,
    getSinglePayslip,
    single_payslip_loading,
    single_payslip_error,
    //payslip_period,
    //payslip_earning_amount,
    //payslip_deduction_amount,
    setPayslipEarningAmount,
    setPayslipDeductionAmount,
    payslipearnings,
    payslipdeductions,
    getSingleBatchPayslipEarnings,
    getSingleBatchPayslipDeductions,
  } = usePayslipsContext();
  
  const payPeriodEmpId = useRecoilValue(payPeriodEmpIdState);
  const payPeriod = useRecoilValue(payPeriodState);
    const [earningsdata, setEarningsdata] = useState([]);
  const [oldEarningsdata, setOldEarningsdata] = useState([]);
  const [deductionsdata, setDeductionsdata] = useState([]);
  const [oldDeductionsdata, setOldDeductionsdata] = useState([]);
  const [isEarningsDialogOpen, setIsEarningsDialogOpen] = useState(false);
  const [isDeductionsDialogOpen, setIsDeductionsDialogOpen] = useState(false);
  //const [state, setState] = useState(single_payslip);
  const { handleSubmit, control } = useForm();

  const {
    name,
    period,
    date,
    bank_name,
    bank_acno,
    //status,
    total_earnings,
    total_deductions,
    tap_amount,
    scp_amount,
    basic_pay,
    nett_pay,
    tap_checkbox,
  } = single_payslip;

  useEffect(
    getSinglePayslip(editPayslipID)
  , []);

  // useEffect(() => {
  //   if (calc) {
  //     setTimeout(() => {
  //       console.log("calc");
  //       calc_totals();
  //       setCalc(false);
  //     }, 10000);
  //   }
  // }, [calc]);

  const handleChange = (event) => {
    //const { rec_id, ...fields } = single_payslip;
    // const value =
    //   event.target.type === "number"
    //     ? parseInt(event.target.value, 10)
    //     : event.target.value;
    // setState({ ...state, [event.target.name]: value });
  };

  const calc_totals = () => {
    let totalTAP = 0;
    let totalSCP = 0;
    if (tap_checkbox) {
      totalTAP = Math.ceil(basic_pay * 0.05);
      totalSCP = Math.round((basic_pay + Number.EPSILON) * 0.035 * 100) / 100;
    }
    console.log("calc", totalTAP, totalSCP)
    const totalEarnings = payslipearnings.reduce(
      (a, v) => (a = a + v.amount),
      0
    );
    const totalDeductions = payslipdeductions.reduce(
      (a, v) => (a = a + v.amount),
      0
    );
    const nettPay =
      basic_pay + totalEarnings - totalDeductions - totalTAP - totalSCP;
    setPayslipEarningAmount(totalEarnings);
    setPayslipDeductionAmount(totalDeductions);
    updatePayslip({
      id: editPayslipID,
      total_earnings: totalEarnings,
      total_deductions: totalDeductions,
      tap_amount: totalTAP,
      scp_amount: totalSCP,
      nett_pay: nettPay,
    });
    console.log(
      "total",
      totalEarnings,
      totalDeductions,
      totalTAP,
      totalSCP,
      nettPay
    );
    getSinglePayslip(editPayslipID);
  };

  const onSubmit = (data) => {
    const { rec_id, ...fields } = single_payslip;
    updatePayslip(...fields);

    // if (isPayslipEditing) {
    //   updatePayslip({ id: editPayslipID, ...data });
    // } else {
    //   addPayslip({ ...data });
    // }
    // loadPayslips();
    // history.push("/batchpayslips");
  };
  const handleEarningsDialogOpen = () => {
    // setPayEarningData([...payslipearnings]);
    setOldEarningsdata([...payslipearnings]);
    setEarningsdata([...payslipearnings]);
    setIsEarningsDialogOpen(true);
  };

  const handleEarningsDialogClose = () => {
    setIsEarningsDialogOpen(false);
    getSingleBatchPayslipEarnings(payPeriodEmpId, payPeriod);
  };
  const handleDeductionsDialogOpen = () => {
    setOldDeductionsdata([...payslipdeductions]);
    setDeductionsdata([...payslipdeductions]);
    setIsDeductionsDialogOpen(true);
  };

  const handleDeductionsDialogClose = () => {
    setIsDeductionsDialogOpen(false);
    getSingleBatchPayslipDeductions(payPeriodEmpId, payPeriod);
  };

  if (single_payslip_loading) {
    return <div>Loading...</div>;
  }

  if (single_payslip_error) {
    navigate("/error");
  }
  return (
    <div>
      <Paper className={classes.root}>
        <Grid xs={12} md={8} lg={12}>
          <CardLayout2 title="Employee Profile">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid>
                <div>
                  <Typography variant="h5" component="h3">
                    PAYSLIP FORM
                  </Typography>
                  <Typography component="p">Payslip Preparation</Typography>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Submit <Icon className={classes.rightIcon}>send</Icon>
                  </Button>
                </div>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12}>
                <div>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={name}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="Name"
                          id="margin-normal"
                          name="name"
                          defaultValue={name}
                          className={classes.textField}
                          onChange={handleChange}
                          InputProps={{
                            readOnly: true,
                          }}
                        >
                          {/* {employees.map((e) => {
                  return (
                    <MenuItem key={e.name} value={e.name}>
                      {e.name}
                    </MenuItem>
                  );
                })} */}
                        </TextField>
                      );
                    }}
                    rules={{ required: "Name required" }}
                  />
                </div>
                <div>
                  <Controller
                    name="period"
                    control={control}
                    defaultValue={period}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="Period"
                          id="margin-normal"
                          name="period"
                          defaultValue={period}
                          className={classes.textField}
                          onChange={handleChange}
                          InputProps={{
                            readOnly: true,
                          }}
                        ></TextField>
                      );
                    }}
                    //rules={{ required: "Name required" }}
                  />
                  <Controller
                    name="date"
                    control={control}
                    defaultValue={date}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="Date"
                          type="date"
                          id="margin-normal"
                          name="date"
                          defaultValue={date}
                          className={classes.textField}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        ></TextField>
                      );
                    }}
                    //rules={{ required: "Name required" }}
                  />
                </div>
                <div>
                  <Controller
                    name="bank_name"
                    control={control}
                    defaultValue={bank_name}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="Bank Name"
                          id="margin-normal"
                          name="bank_name"
                          defaultValue={bank_name}
                          className={classes.textField}
                          onChange={handleChange}
                          InputProps={{
                            readOnly: true,
                          }}
                        ></TextField>
                      );
                    }}
                    //rules={{ required: "Name required" }}
                  />
                  <Controller
                    name="bank_acno"
                    control={control}
                    defaultValue={bank_acno}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="Bank AC No"
                          id="margin-normal"
                          name="bank_acno"
                          value={bank_acno}
                          className={classes.textField}
                          onChange={handleChange}
                          InputProps={{
                            readOnly: true,
                          }}
                        ></TextField>
                      );
                    }}
                    //rules={{ required: "Name required" }}
                  />
                </div>
                <div>
                  <Controller
                    name="tap_amount"
                    control={control}
                    defaultValue={tap_amount}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="TAP Contrinution"
                          type="currency"
                          id="standard-number"
                          name="tap_amount"
                          defaultValue={tap_amount}
                          className={classes.textField}
                          //onChange={onChange}
                          onChange={(e) => {
                            handleChange(parseInt(e.target.value, 10));
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                        ></TextField>
                      );
                    }}
                    //rules={{ required: "Name required" }}
                  />
                  <Controller
                    name="scp_amount"
                    control={control}
                    defaultValue={scp_amount}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="SCP Contribution"
                          type="currency"
                          id="standard-number"
                          name="scp_amount"
                          defaultValue={scp_amount}
                          className={classes.textField}
                          //onChange={onChange}
                          onChange={(e) => {
                            handleChange(parseInt(e.target.value, 10));
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                        ></TextField>
                      );
                    }}
                    //rules={{ required: "Name required" }}
                  />
                </div>
                <div>
                  <Controller
                    name="total_earnings"
                    control={control}
                    defaultValue={total_earnings}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="Total Earnings"
                          type="number"
                          id="standard-number"
                          name="total_earnings"
                          value={total_earnings}
                          className={classes.textField}
                          //onChange={onChange}
                          onChange={(e) => {
                            handleChange(parseInt(e.target.value, 10));
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                        ></TextField>
                      );
                    }}
                    //rules={{ required: "Name required" }}
                  />
                  <Controller
                    name="total_deductions"
                    control={control}
                    defaultValue={total_deductions}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="Total Deductions"
                          type="number"
                          id="standard-number"
                          name="total_deductions"
                          value={total_deductions}
                          className={classes.textField}
                          //onChange={onChange}
                          onChange={(e) => {
                            handleChange(parseInt(e.target.value, 10));
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                        ></TextField>
                      );
                    }}
                    //rules={{ required: "Name required" }}
                  />
                </div>
                <div>
                  <Controller
                    name="basic_pay"
                    control={control}
                    defaultValue={basic_pay}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="Basic Pay"
                          type="number"
                          id="standard-number"
                          name="basic_pay"
                          value={basic_pay}
                          className={classes.textField}
                          onChange={handleChange}
                          InputProps={{
                            readOnly: true,
                          }}
                          // onChange={(e) => {
                          //   handleChange(parseInt(e.target.value, 10));
                          // }}
                        ></TextField>
                      );
                    }}
                    //rules={{ required: "Name required" }}
                  />
                  <Controller
                    name="nett_pay"
                    control={control}
                    defaultValue={nett_pay}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="Nett Pay"
                          type="number"
                          id="standard-number"
                          name="nett_pay"
                          value={nett_pay}
                          className={classes.textField}
                          //onChange={onChange}
                          onChange={(e) => {
                            handleChange(parseInt(e.target.value, 10));
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                        ></TextField>
                      );
                    }}
                    //rules={{ required: "Name required" }}
                  />
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={calc_totals}
                >
                  Calc <Icon className={classes.rightIcon}>send</Icon>
                </Button>
              </Grid>
              <Divider className={classes.divider} />
            </form>
          </CardLayout2>
        </Grid>
        <div>
          <Grid container alignItems="center" className={classes.grid}>
            <Grid item xs={6} md={8} lg={6}>
              <div>
                <CardLayout
                  title="Earnings"
                  handleClick={handleEarningsDialogOpen}
                >
                  <PayslipViewEarnings />
                </CardLayout>
              </div>
            </Grid>
            <Grid item xs={6} md={8} lg={6}>
              <div>
                <CardLayout
                  title="Deductions"
                  handleClick={handleDeductionsDialogOpen}
                >
                  <PayslipViewDeductions />
                </CardLayout>
              </div>
            </Grid>
          </Grid>
        </div>
        <Divider className={classes.divider} />
        <CustomDialog
          isOpen={isEarningsDialogOpen}
          handleClose={handleEarningsDialogClose}
          title=""
          showButton={true}
          isFullscreen={false}
          isFullwidth={false}
        >
          <Payslip_Earnings
            setEarningsdata={setEarningsdata}
            earningsdata={earningsdata}
            oldEarningsdata={oldEarningsdata}
            handleDialogClose={handleEarningsDialogClose}
          />
        </CustomDialog>
        <CustomDialog
          isOpen={isDeductionsDialogOpen}
          handleClose={handleDeductionsDialogClose}
          title=""
          showButton={true}
          isFullscreen={false}
          isFullwidth={false}
        >
          <Payslip_Deductions
            setDeductionsdata={setDeductionsdata}
            deductionsdata={deductionsdata}
            oldDeductionsdata={oldDeductionsdata}
            handleDialogClose={handleDeductionsDialogClose}
          />
        </CustomDialog>
      </Paper>
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
  divider: {
    padding: 4,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350,
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

export default PayslipForm;
