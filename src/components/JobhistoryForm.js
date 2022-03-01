import React, { useState } from "react";
import //   Button,
//   Icon,
//   MenuItem,
//   TextField,
//   Paper,
//   Select,
//   Typography,
//   Divider,
"@material-ui/core";
import {
  //AspectRatio,
  Box,
  Button,
  //ButtonGroup,
  //Center,
  Checkbox,
  //Container,
  Divider,
  //Flex,
  FormControl,
  //FormLabel,
  //FormErrorMessage,
  //FormHelperText,
  //Grid,
  //GridItem,
  Heading,
  HStack,
  //Icon,
  //IconButton,
  //Image,
  Input,
  InputGroup,
  InputLeftAddon,
  //InputLeftElement,
  //Modal,
  //ModalOverlay,
  //ModalContent,
  //ModalHeader,
  //ModalFooter,
  //ModalBody,
  //ModalCloseButton,
  //Radio,
  //RadioGroup,
  Select,
  //SimpleGrid,
  //Stack,
  //StackDivider,
  //Text,
  //Tabs,
 
} from "@chakra-ui/react";
//import * as emailjs from "emailjs-com";
//import { useRecoilState } from "recoil";
//import { loginLevelState } from "./data/atomdata";
import { makeStyles } from "@material-ui/core/styles";
//import { useCustomToast } from "../helpers/useCustomToast";
//import { useEmployees } from "./employees/useEmployees";
import { useDepartments } from "./departments/useDepartments";
import { useDesignations } from "./designations/useDesignations";
import { useJobstatus } from "./jobstatus/useJobstatus";
import { Controller, useForm } from "react-hook-form";

//const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICEID;
//const TEMPLATE_ID = "template_1y8odlq";
//const USER_ID = process.env.REACT_APP_EMAILJS_USERID;

// const initial_state = {
//   empid: "",
//   name: "",
//   designation: "",
//   department: "",
//   effectdate: "",
//   basicsalary: 0,
//   siteallows: 0,
//   remark: "",
//   status: "",
//   isresign: false,
//};

const JobhistoryForm = ({
  state,
  setState,
  statustype,
  add_Item,
  update_Item,
  onJobClose,
}) => {
  //const toast = useCustomToast();
  const classes = useStyles();
  const field_width = "138";
  //const { employees } = useEmployees();
  const { departments } = useDepartments();
  const { designations } = useDesignations();
  const { jobstatus } = useJobstatus();
  const [isresign, setIsresign] = useState(false);
  //const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      ...state,
    },
  });

  //console.log("jobstate",state)  
  const onSubmit = (values) => {
    if (statustype === "edit") {
      update_Item(values);
    }
    if (statustype === "add") {
      add_Item(values);
    }
    handleClose();
  };

  const handleClose = () => {
    onJobClose();
  };

  // useEffect(() => {
  //   setState(initial_state);
  //   setState({ ...formdata });
  //   setState({ ...formdata });
  //   console.log("laeve form",state)
  // }, [initialValues]);

  return (
    <Box>
      <Box p={2}>
        <Heading size="md">EMPLOYMENT HISTORY FORM</Heading>
      </Box>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormControl>
            <Controller
              control={control}
              name="name"
              defaultValue={state.name}
              render={({ field: { onChange, value, ref } }) => (
                <InputGroup>
                  <HStack w="100%" py={1}>
                    <InputLeftAddon children="Name" minWidth={field_width} />
                    <Input
                      name="name"
                      value={value}
                      width="full"
                      onChange={onChange}
                      borderColor="gray.400"
                      isReadOnly
                      //textTransform="capitalize"
                      ref={ref}
                      placeholder="name"
                    />
                  </HStack>
                </InputGroup>
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <Controller
              control={control}
              name="designation"
              defaultValue={state.designation}
              render={({ field: { onChange, value, ref } }) => (
                <InputGroup>
                  <HStack w="100%" py={1}>
                    <InputLeftAddon
                      children="Designation"
                      minWidth={field_width}
                    />
                    <Select
                      name="designation"
                      value={value}
                      width="full"
                      onChange={onChange}
                      borderColor="gray.400"
                      //textTransform="capitalize"
                      ref={ref}
                      //placeholder="category"
                    >
                      <option value="">None</option>
                      {designations &&
                        designations.map((rec) => {
                          return (
                            <option key={rec.id} value={rec.name}>
                              {rec.name}
                            </option>
                          );
                        })}
                    </Select>
                  </HStack>
                </InputGroup>
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <Controller
              control={control}
              name="department"
              defaultValue={state.department}
              render={({ field: { onChange, value, ref } }) => (
                <InputGroup>
                  <HStack w="100%" py={1}>
                    <InputLeftAddon
                      children="Department"
                      minWidth={field_width}
                    />
                    <Select
                      name="department"
                      value={value}
                      width="full"
                      onChange={onChange}
                      borderColor="gray.400"
                      //textTransform="capitalize"
                      ref={ref}
                      //placeholder="category"
                    >
                      <option value="">None</option>
                      {departments &&
                        departments.map((rec) => {
                          return (
                            <option key={rec.id} value={rec.name}>
                              {rec.name}
                            </option>
                          );
                        })}
                    </Select>
                  </HStack>
                </InputGroup>
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <Controller
              control={control}
              name="basicsalary"
              defaultValue={state.basicsalary}
              render={({ field: { onChange, value, ref } }) => (
                <InputGroup>
                  <HStack w="100%" py={1}>
                    <InputLeftAddon
                      children="Basic Salary"
                      minWidth={field_width}
                    />
                    <Input
                      name="basicsalary"
                      value={value}
                      type="number"
                      width="full"
                      onChange={onChange}
                      borderColor="gray.400"
                      //textTransform="capitalize"
                      ref={ref}
                      placeholder="basic salary"
                    />
                  </HStack>
                </InputGroup>
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <Controller
              control={control}
              name="siteallows"
              defaultValue={state.siteallows}
              render={({ field: { onChange, value, ref } }) => (
                <InputGroup>
                  <HStack w="100%" py={1}>
                    <InputLeftAddon
                      children="Site Allowance"
                      minWidth={field_width}
                    />
                    <Input
                      name="siteallows"
                      value={value}
                      type="number"
                      width="full"
                      onChange={onChange}
                      borderColor="gray.400"
                      //textTransform="capitalize"
                      ref={ref}
                      placeholder="site allowance"
                    />
                  </HStack>
                </InputGroup>
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <Controller
              control={control}
              name="effectdate"
              defaultValue={state.effectdate}
              render={({ field: { onChange, value, ref } }) => (
                <InputGroup>
                  <HStack w="100%" py={1}>
                    <InputLeftAddon
                      children="Effective Date"
                      minWidth={field_width}
                    />
                    <Input
                      name="effectdate"
                      value={value}
                      type="date"
                      width="full"
                      onChange={onChange}
                      borderColor="gray.400"
                      //textTransform="capitalize"
                      ref={ref}
                      placeholder="effective date"
                    />
                  </HStack>
                </InputGroup>
              )}
            />
          </FormControl>
        </div>

        <div>
          <FormControl>
            <Controller
              control={control}
              name="status"
              defaultValue={state.department}
              render={({ field: { onChange, value, ref } }) => (
                <InputGroup>
                  <HStack w="100%" py={1}>
                    <InputLeftAddon children="Status" minWidth={field_width} />
                    <Select
                      name="status"
                      value={value}
                      width="full"
                      onChange={onChange}
                      borderColor="gray.400"
                      //textTransform="capitalize"
                      ref={ref}
                      //placeholder="category"
                    >
                      <option value="">None</option>
                      {jobstatus &&
                        jobstatus.map((rec) => {
                          return (
                            <option key={rec.id} value={rec.name}>
                              {rec.name}
                            </option>
                          );
                        })}
                    </Select>
                  </HStack>
                </InputGroup>
              )}
            />
          </FormControl>
          <FormControl>
            <Controller
              control={control}
              name="isresign"
              defaultValue={isresign}
              render={({ field: { onChange, value, ref } }) => (
                <InputGroup>
                  <HStack w="100%" py={1}>
                    <InputLeftAddon
                      children="Resign ?"
                      minWidth={field_width}
                    />
                    <Checkbox
                      name="isresign"
                      value={value}
                      width="full"
                      onChange={(e) => {
                        onChange(e.target.checked);
                        setIsresign(e.target.checked);
                      }}
                      borderColor="gray.400"
                      //textTransform="capitalize"
                      ref={ref}
                    ></Checkbox>
                  </HStack>
                </InputGroup>
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <Controller
              control={control}
              name="remark"
              defaultValue={state.remark}
              render={({ field: { onChange, value, ref } }) => (
                <InputGroup>
                  <HStack w="100%" py={1}>
                    <InputLeftAddon children="Remark" minWidth={field_width} />
                    <Input
                      name="remark"
                      value={value}
                      width="full"
                      onChange={onChange}
                      borderColor="gray.400"
                      //textTransform="capitalize"
                      ref={ref}
                      placeholder="remark"
                    />
                  </HStack>
                </InputGroup>
              )}
            />
          </FormControl>
        </div>

        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </div>
      </form>
    </Box>
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

export default JobhistoryForm;
