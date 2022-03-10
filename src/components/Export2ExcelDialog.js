import React, { useState, useEffect } from "react";
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
import { useHocPeriod } from "./hoc/useHocPeriod";
import Export2Excel from "./Export2Excel";
import Export2ExcelTest from "./Export2ExcelTest"

// const initial_state = {
//   type: "",
//   month: new Date().getMonth(),
//   year: new Date().getFullYear(),
//   filename: "",
//};

const months = [
  { name: "January", value: 1 },
  { name: "February", value: 2 },
  { name: "March", value: 3 },
  { name: "April", value: 4 },
  { name: "May", value: 5 },
  { name: "June", value: 6 },
  { name: "July", value: 7 },
  { name: "August", value: 8 },
  { name: "September", value: 9 },
  { name: "October", value: 10 },
  { name: "November", value: 11 },
  { name: "December", value: 12 },
];

const Export2ExcelDialog = ({ state, setState, dataset, onClose }) => {
  const field_width = "138";
  const [isLoad, setIsload] = useState(true);
  const { hocperiod, setHocPeriodYrId, setHocPeriodMthId } = useHocPeriod();
  //console.log("expstate", state);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
    if (evt.target.name === "month") {
      setIsload(true);
    }
    if (evt.target.name === "year") {
      setIsload(true);
    }
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    setHocPeriodYrId(state.year);
    setHocPeriodMthId(state.month);
    setIsload(false);
  }, [isLoad]);

  // useEffect(() => {
  //   setState(initial_state);
  //   setState({ ...formdata });
  //   setState({ ...formdata });
  //   console.log("laeve form",state)
  // }, [initialValues]);

  return (
    <Box>
      <Box p={2}>
        <Heading size="md">EXPORT TO EXCEL DIALOG</Heading>
      </Box>
      {/* <Box>
        <Export2Excel filename="hoc" dataset={hoc} title="Hoc" />
      </Box> */}
      <Divider />

      <div>
        <FormControl>
          <InputGroup>
            <HStack w="100%" py={1}>
              <InputLeftAddon children="Type" minWidth={field_width} />
              <Input
                name="type"
                value={state.type}
                width="full"
                onChange={handleChange}
                borderColor="gray.400"
                isReadOnly
                //textTransform="capitalize"
                //ref={ref}
                placeholder="type"
              />
            </HStack>
          </InputGroup>
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputGroup>
            <HStack w="100%" py={1}>
              <InputLeftAddon children="Month" minWidth={field_width} />
              <Select
                name="month"
                value={state.month}
                width="full"
                onChange={handleChange}
                borderColor="gray.400"
                //textTransform="capitalize"
                //ref={ref}
                //placeholder="category"
              >
                {months &&
                  months.map((rec, index) => {
                    return (
                      <option key={rec.index} value={rec.value}>
                        {rec.name}
                      </option>
                    );
                  })}
              </Select>
            </HStack>
          </InputGroup>
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputGroup>
            <HStack w="100%" py={1}>
              <InputLeftAddon children="Year" minWidth={field_width} />
              <Select
                name="year"
                value={state.year}
                width="full"
                onChange={handleChange}
                borderColor="gray.400"
                //textTransform="capitalize"
                //ref={ref}
                //placeholder="category"
              >
                <option value="2021">2021</option>
                <option value="2022">2022</option>
              </Select>
            </HStack>
          </InputGroup>
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputGroup>
            <HStack w="100%" py={1}>
              <InputLeftAddon children="Title" minWidth={field_width} />
              <Input
                name="title"
                value={state.title}
                width="full"
                onChange={handleChange}
                borderColor="gray.400"
                //ref={ref}
                placeholder="title"
              />
            </HStack>
          </InputGroup>
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputGroup>
            <HStack w="100%" py={1}>
              <InputLeftAddon children="Filename" minWidth={field_width} />
              <Input
                name="filename"
                value={state.filename}
                width="full"
                onChange={handleChange}
                borderColor="gray.400"
                //ref={ref}
                placeholder="filename"
              />
            </HStack>
          </InputGroup>
        </FormControl>
      </div>
      <Divider />
      <Box p={2}>
        <Export2ExcelTest />
        {/* <Export2ExcelTest
          filename={state.filename}
          dataset={hocperiod}
          title={state.title}
        /> */}
      </Box>
      {/* <div>
          <Button
            type="submit"
            colorScheme="teal"
            variant="solid"
            onClick={handleSubmit(onSubmit)}
          >
            Download
          </Button>
        </div> */}
    </Box>
  );
};

export default Export2ExcelDialog;
