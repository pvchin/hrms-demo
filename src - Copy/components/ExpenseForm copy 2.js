import React from "react";
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import * as emailjs from "emailjs-com";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import axios from "axios";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { loginLevelState } from "./data/atomdata";
import { useExpensesContext } from "../context/expenses_context";
import { Controller, useForm } from "react-hook-form";
import { useCustomToast } from "../helpers/useCustomToast";
//import { useExpenses } from "./expenses/useExpenses";
import { useAddExpenses } from "./expenses/useAddExpenses";
//import { useDeleteExpenses } from "./expenses/useDeleteExpenses";
import { useUpdateExpenses } from "./expenses/useUpdateExpenses";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICEID;
const TEMPLATE_ID = "template_1y8odlq";
const USER_ID = process.env.REACT_APP_EMAILJS_USERID;

// const initial_values = {
//   name: "",
//   date: "",
//   purchased_date: "",
//   purchased_from: "",
//   description: "",
//   remark: "",
//   status: "Pending",
//   amount: 0,
//};

const ExpenseForm = ({ formdata, setFormdata, handleDialogClose }) => {
  const classes = useStyles();
  const toast = useCustomToast();
  //const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  //const { expenses, filter, setFilter, setExpenseId } = useExpenses();
  const updateExpenses = useUpdateExpenses();
  const addExpenses = useAddExpenses();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { isExpenseEditing, editExpenseID } = useExpensesContext();

  const { handleSubmit, control } = useForm();

  const handleSentEmail = (data) => {
    const { date } = data;
    //console.log("expense form", loginLevel);
    var emaildata = {
      to_name: loginLevel.loginUser,
      to_email: loginLevel.loginEmail,
      message: `Your expenses claim application dated on ${date} has been successfully submitted for approval`,
      cc_to: loginLevel.reporting_email,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, emaildata, USER_ID).then(
      function (response) {
        console.log(response.status, response.text);
        toast({
          title: `Email has sent successfully to ${emaildata.to_email}!`,
          status: "success",
        });
      },
      function (err) {
        console.log(err);
        toast({
          title: `Email has fail to send to ${emaildata.to_email}!`,
          status: "warning",
        });
      }
    );
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (isExpenseEditing) {
      updateExpenses({ id: editExpenseID, ...data });
    } else {
      addExpenses({ empid: loginLevel.loginUserId, ...data });
      handleSentEmail(data);
    }

    handleDialogClose();
  };

  const getUploadParams = () => {
    return { url: `https://httpbin.org/post` };
  };

  const handleChangeStatus = (files, status) => {
    //console.log(status, meta);
    console.log("files", files);
  };

  const handleDZSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <div>
      <Box size="xl">
        <Typography variant="h5" component="h3">
          EXPENSES CLAIM FORM
        </Typography>
        <Typography component="p">Expense Claim Application</Typography>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem colSpan={1}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={loginLevel.loginUser}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Name"
                        id="margin-normal1"
                        name="name"
                        defaultValue={loginLevel.loginUser}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    );
                  }}
                />
              </div>
              <div>
                <Controller
                  name="date"
                  control={control}
                  defaultValue={formdata.date}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Date"
                        type="date"
                        id="margin-normal2"
                        name="formdata.date"
                        value={value}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    );
                  }}
                  rules={{ required: "From Date is required" }}
                />
              </div>

              <div>
                <Controller
                  name="purchased_from"
                  control={control}
                  defaultValue={formdata.purchased_from}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Purchased From"
                        id="margin-normal3"
                        name="purchased_from"
                        defaultValue={formdata.purchased_from}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  // rules={{ required: "Reason is required" }}
                />
              </div>
              <div>
                <Controller
                  name="description"
                  control={control}
                  defaultValue={formdata.description}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Description"
                        id="margin-normal4"
                        name="description"
                        defaultValue={formdata.description}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  // rules={{ required: "Reason is required" }}
                />
              </div>
              <div>
                <Controller
                  name="amount"
                  control={control}
                  defaultValue={formdata.amount}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Amount"
                        type="number"
                        id="standard-number1"
                        name="amount"
                        defaultValue={formdata.amount}
                        className={classes.textField}
                        //onChange={onChange}
                        onChange={(e) => {
                          onChange(parseInt(e.target.value, 10));
                        }}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />
              </div>
              <div>
                <Controller
                  name="remark"
                  control={control}
                  defaultValue={formdata.remark}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Remark"
                        id="margin-normal5"
                        name="remark"
                        defaultValue={formdata.remark}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  // rules={{ required: "Reason is required" }}
                />
              </div>
              <div>
                <Controller
                  name="status"
                  control={control}
                  defaultValue="Pending"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Status"
                        id="margin-normal6"
                        name="status"
                        defaultValue="Pending"
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    );
                  }}
                  //rules={{ required: "Status is required" }}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  //onClick={() => handleSubmit(onSubmit)()}
                >
                  Save <Icon className={classes.rightIcon}>send</Icon>
                </Button>
              </div>
            </form>
            <Dropzone
              getUploadParams={getUploadParams}
              onChangeStatus={handleChangeStatus}
              onSubmit={handleDZSubmit}
              maxFiles={3}
              styles={{ dropzone: { minHeight: 200, maxHeight: 350 } }}
            ></Dropzone>
          </GridItem>
          <GridItem colSpan={2}>
            <Heading size="lg">Preview</Heading>
          </GridItem>
        </Grid>
      </Box>
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
}));

export default ExpenseForm;
