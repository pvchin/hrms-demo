import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import { Box, Heading } from "@chakra-ui/react";
//import * as emailjs from "emailjs-com";
//import { useRecoilState } from "recoil";
//import { loginLevelState } from "./data/atomdata";
import { makeStyles } from "@material-ui/core/styles";
//import { useCustomToast } from "../helpers/useCustomToast";
import { Controller, useForm } from "react-hook-form";
import { useEmployees } from "./employees/useEmployees";
import { useAddEmployees } from "./employees/useAddEmployees";
//import { useEmployeesContext } from "../context/employees_context";

const initial_state = {
  name: "",
  email: "",
};

const EmployeeFormAdd = ({ onAddEmpFormClose }) => {
  const classes = useStyles();
  //const toast = useCustomToast();
  const { employees } = useEmployees();
  const addEmployee = useAddEmployees();
  const [state, setState] = useState(initial_state);
  const [isExit, setIsExit] = useState(false);
  //const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { handleSubmit, control } = useForm();
  //const initialValues = Object.values(initial_state).join("");

  //const {
    //editEmployeeID,
    //employees_loading,
    //deleteEmployee,
    //loadEmployees,
    //setEditEmployeeID,
    //setIsEditingOn,
    //setIsEditingOff,
    //resetSingleEmployee,
    //resetEmployees,
    //getSingleEmployee,
  //} = useEmployeesContext();

  const onSubmit = (data) => {
    const { email } = data;
    const emp = employees && employees.filter((rec) => rec.email === email);
    console.log("exist", emp);
    if (emp.length) {
      setIsExit(true);
      setTimeout(() => {
        setIsExit(false);
      }, 2000);
    } else {
      setIsExit(false)
      addEmployee({ ...data });
      onAddEmpFormClose();
    }
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          CREATE NEW EMPLOYEE
        </Typography>
        <Typography component="p">Fill in new employee name and email</Typography>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="name"
              control={control}
              defaultValue={state.name}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Name"
                    id="margin-normal"
                    name="name"
                    //value={value}
                    defaultValue={state.name}
                    className={classes.textField}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                  ></TextField>
                );
              }}
              rules={{ required: "Name required" }}
            />
          </div>
          <div>
            <Controller
              name="email"
              control={control}
              defaultValue={state.email}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Email"
                    id="margin-normal-email"
                    name="email"
                    defaultValue={state.email}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                );
              }}
              rules={{ required: "Email is required" }}
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSubmit(onSubmit)}
            >
              Submit <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </div>
          {isExit && (
            <Box>
              <Heading size="md" pl={2}>
                Warning! This email already existed!
              </Heading>
            </Box>
          )}
        </form>
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
}));

export default EmployeeFormAdd;
