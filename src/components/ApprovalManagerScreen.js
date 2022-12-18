import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Divider,
  FormControl,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  InputGroup,
  NumberInput,
  NumberInputField,
  Stack,
  HStack,
  VStack,
  Wrap,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

import { formatPrice } from "../helpers/Utils";

const ApprovalManagerScreen = ({
  formdata,
  handleDialogClose,
  onConfirm,
  setFormdata,
  tabIndex,
}) => {
  const [statustype, setStatustype] = useState("");
  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting, id },
  } = useForm({
    defaultValues: {
      ...formdata,
    },
  });

  const handleSave = (data) => {
    const updData = { ...data, status: statustype };
    onConfirm(updData);
    handleDialogClose();
  };
  console.log("formdata", formdata);

  useEffect(() => {
    setStatustype(formdata.status);
  }, []);

  return (
    <Container>
      <Heading size="md">Approval Screen</Heading>
      <Tabs
        border="1px solid teal"
        borderRadius={10}
        mt={5}
        mb={5}
        defaultIndex={tabIndex}
      >
        <TabList>
          <Tab hidden={tabIndex !== 0}>Leaves</Tab>
          <Tab hidden={tabIndex !== 1}>Expenses</Tab>
          <Tab hidden={tabIndex !== 2}>Site Allows</Tab>
          <Tab hidden={tabIndex !== 3}>Payroll</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {tabIndex === 0 && (
              <form onSubmit={handleSubmit(handleSave)}>
                <Grid
                  templateColumns={"repeat(2,1fr)"}
                  columnGap={2}
                  rowGap={2}
                >
                  <GridItem colSpan={2}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="name"
                        //defaultValue={invoice.sls_no || ''}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              Name
                            </Text>
                            <Input
                              name="name"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="name"
                              minWidth="100"
                              readOnly
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="from_date"
                        //defaultValue={invoice.sls_date}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              From Date
                            </Text>

                            <Input
                              name="from_date"
                              value={value}
                              type="date"
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="from date"
                              minWidth="100"
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="to_date"
                        //defaultValue={invoice.sls_date}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              To Date
                            </Text>

                            <Input
                              name="to_date"
                              value={value}
                              type="date"
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="to date"
                              minWidth="100"
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="no_of_days"
                        //defaultValue={invoice.sls_no || ''}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              No Of Days
                            </Text>
                            <Input
                              name="no_of_days"
                              value={value}
                              type="number"
                              width="full"
                              onChange={(e) =>
                                onChange(parseFloat(e.target.value))
                              }
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="no of days"
                              minWidth="100"
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="status"
                        //defaultValue={invoice.sls_no || ''}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              Status
                            </Text>
                            <Input
                              name="status"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="status"
                              minWidth="100"
                              readOnly
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
                <Divider borderWidth={1} borderColor="teal" mt={5} />
                <RadioGroup
                  mt={5}
                  onChange={setStatustype}
                  value={statustype}
                  border="1px solid teal"
                  borderRadius={10}
                  py={5}
                  px={1}
                  minH="10"
                >
                  <Stack direction="row">
                    <Radio value="Pending">Pending</Radio>
                    <Radio value="Rejected">Rejected</Radio>
                    <Radio value="Approved">Approved</Radio>
                    <Radio value="Delete">Delete</Radio>
                  </Stack>
                </RadioGroup>
                <HStack p={5}>
                  <ButtonGroup gap="20" pl="20">
                    <Button colorScheme="teal" variant="solid" type="submit">
                      Save
                    </Button>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      onClick={handleDialogClose}
                    >
                      Exit
                    </Button>
                  </ButtonGroup>
                </HStack>
              </form>
            )}
          </TabPanel>
          <TabPanel>
            {tabIndex === 1 && (
              <form onSubmit={handleSubmit(handleSave)}>
                <Grid
                  templateColumns={"repeat(2,1fr)"}
                  columnGap={2}
                  rowGap={2}
                >
                  <GridItem colSpan={2}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="name"
                        //defaultValue={invoice.sls_no || ''}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              Name
                            </Text>
                            <Input
                              name="name"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="name"
                              minWidth="100"
                              readOnly
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="date"
                        //defaultValue={invoice.sls_date}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              Date
                            </Text>

                            <Input
                              name="date"
                              value={value}
                              type="date"
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="date"
                              minWidth="100"
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="amount"
                        //defaultValue={invoice.sls_no || ''}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              Amount
                            </Text>
                            <Input
                              name="amount"
                              value={value}
                              type="number"
                              width="full"
                              onChange={(e) =>
                                onChange(parseFloat(e.target.value))
                              }
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="amount"
                              minWidth="100"
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="description"
                        //defaultValue={invoice.sls_no || ''}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              Description
                            </Text>
                            <Input
                              name="description"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="description"
                              minWidth="100"
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="status"
                        //defaultValue={invoice.sls_no || ''}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              Status
                            </Text>
                            <Input
                              name="status"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="status"
                              minWidth="100"
                              readOnly
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
                <Divider borderWidth={1} borderColor="teal" mt={5} />
                <RadioGroup
                  mt={5}
                  onChange={setStatustype}
                  value={statustype}
                  border="1px solid teal"
                  borderRadius={10}
                  py={5}
                  px={1}
                  minH="10"
                  colorScheme="teal"
                  fontWeight="bold"
                  size="md"
                >
                  <Stack direction="row">
                    <Radio value="Pending">Pending</Radio>
                    <Radio value="Rejected">Rejected</Radio>
                    <Radio value="Approved">Approved</Radio>
                    {/* <Radio value="Delete">Delete</Radio> */}
                  </Stack>
                </RadioGroup>
                <HStack p={5}>
                  <ButtonGroup gap="20" pl="20">
                    <Button colorScheme="teal" variant="solid" type="submit">
                      Save
                    </Button>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      onClick={handleDialogClose}
                    >
                      Exit
                    </Button>
                  </ButtonGroup>
                </HStack>
              </form>
            )}
          </TabPanel>
          <TabPanel>
            {tabIndex === 2 && (
              <form onSubmit={handleSubmit(handleSave)}>
                <Grid
                  templateColumns={"repeat(2,1fr)"}
                  columnGap={2}
                  rowGap={2}
                >
                  <GridItem colSpan={2}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="name"
                        //defaultValue={invoice.sls_no || ''}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              Name
                            </Text>
                            <Input
                              name="name"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="name"
                              minWidth="100"
                              readOnly
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="period"
                        //defaultValue={invoice.sls_no || ''}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              Period
                            </Text>
                            <Input
                              name="period"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="period"
                              minWidth="100"
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="no_of_days"
                        //defaultValue={invoice.sls_no || ''}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              No Of Days
                            </Text>
                            <Input
                              name="no_of_days"
                              value={value}
                              type="number"
                              width="full"
                              onChange={(e) =>
                                onChange(parseFloat(e.target.value))
                              }
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="no of days"
                              minWidth="100"
                              readOnly
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="amount"
                        //defaultValue={invoice.sls_no || ''}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              Amount
                            </Text>
                            <Input
                              name="amount"
                              value={value}
                              type="number"
                              width="full"
                              onChange={(e) =>
                                onChange(parseFloat(e.target.value))
                              }
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="amount"
                              minWidth="100"
                              readOnly
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="status"
                        //defaultValue={invoice.sls_no || ''}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              Status
                            </Text>
                            <Input
                              name="status"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="status"
                              minWidth="100"
                              readOnly
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
                <Divider borderWidth={1} borderColor="teal" mt={5} />
                <RadioGroup
                  mt={5}
                  onChange={setStatustype}
                  value={statustype}
                  border="1px solid teal"
                  borderRadius={10}
                  py={5}
                  px={1}
                  minH="10"
                >
                  <Stack direction="row">
                    <Radio value="Pending">Pending</Radio>
                    <Radio value="Submitted">Submitted</Radio>
                    <Radio value="Verified">Verified</Radio>
                    <Radio value="Approved">Approved</Radio>
                  </Stack>
                </RadioGroup>
                <HStack p={5}>
                  <ButtonGroup gap="20" pl="20">
                    <Button colorScheme="teal" variant="solid" type="submit">
                      Save
                    </Button>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      onClick={handleDialogClose}
                    >
                      Exit
                    </Button>
                  </ButtonGroup>
                </HStack>
              </form>
            )}
          </TabPanel>
          <TabPanel>
            {tabIndex === 3 && (
              <form onSubmit={handleSubmit(handleSave)}>
                <Grid
                  templateColumns={"repeat(2,1fr)"}
                  columnGap={2}
                  rowGap={2}
                >
                  <GridItem colSpan={2}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="period"
                        //defaultValue={invoice.sls_no || ''}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              Period
                            </Text>
                            <Input
                              name="period"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="period"
                              minWidth="100"
                              readOnly
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="totalpayroll"
                        //defaultValue={invoice.sls_no || ''}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              Total Payroll
                            </Text>
                            <Input
                              name="totalpayroll"
                              value={value}
                              type="number"
                              width="full"
                              onChange={(e) =>
                                onChange(parseFloat(e.target.value))
                              }
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="total payroll"
                              minWidth="100"
                              readOnly
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="status"
                        //defaultValue={invoice.sls_no || ''}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm" textAlign="left">
                              Status
                            </Text>
                            <Input
                              name="status"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="status"
                              minWidth="100"
                              readOnly
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
                <Divider borderWidth={1} borderColor="teal" mt={5} />
                <RadioGroup
                  mt={5}
                  onChange={setStatustype}
                  value={statustype}
                  border="1px solid teal"
                  borderRadius={10}
                  py={5}
                  px={1}
                  minH="10"
                >
                  <Stack direction="row">
                    <Radio value="Pending">Pending</Radio>
                    <Radio value="Rejected">Rejected</Radio>
                    <Radio value="Verified">Verified</Radio>
                    <Radio value="Approved">Approved</Radio>
                    {/* <Radio value="Delete">Delete</Radio> */}
                  </Stack>
                </RadioGroup>
                <HStack p={5}>
                  <ButtonGroup gap="20" pl="20">
                    <Button colorScheme="teal" variant="solid" type="submit">
                      Save
                    </Button>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      onClick={handleDialogClose}
                    >
                      Exit
                    </Button>
                  </ButtonGroup>
                </HStack>
              </form>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default ApprovalManagerScreen;
