import React, { useState, useMemo, useEffect } from "react";
//import { Divider, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import {
  Box,
  Container,
  Divider,
  Heading,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useRadioGroup,
} from "@chakra-ui/react";
import RadioCard from "../helpers/RadioCard";
//import { useDepartments } from "./departments/useDepartments";
//import { useDesignations } from "./designations/useDesignations";
//import { useAllowances } from "./allowances/useAllowances";
//import { useDeductions } from "./deductions/useDeductions";
//import { useCurrency } from "./currency/useCurrency";
//import { useTablesContext } from "../context/tables_context";
import { useHocwhat } from "./hocwhat/useHocwhat";
import { useUpdateHocwhat } from "./hocwhat/useUpdateHocwhat";
import { useDeleteHocwhat } from "./hocwhat/useDeleteHocwhat";
import { useAddHocwhat } from "./hocwhat/useAddHocwhat";
import { useHocwhatdetails } from "./hocwhatdetails/useHocwhatdetails";
import { useUpdateHocwhatdetails } from "./hocwhatdetails/useUpdateHocwhatdetails";
import { useDeleteHocwhatdetails } from "./hocwhatdetails/useDeleteHocwhatdetails";
import { useAddHocwhatdetails } from "./hocwhatdetails/useAddWhatdetails";
import { useHocwhy } from "./hocwhy/useHocwhy";
import { useUpdateHocwhy } from "./hocwhy/useUpdateHocwhy";
import { useDeleteHocwhy } from "./hocwhy/useDeleteHocwhy";
import { useAddHocwhy } from "./hocwhy/useAddHocwhy";
import { useHocwhydetails } from "./hocwhydetails/useHocwhydetails";
import { useUpdateHocwhydetails } from "./hocwhydetails/useUpdateHocwhydetails";
import { useDeleteHocwhydetails } from "./hocwhydetails/useDeleteHocwhydetails";
import { useAddHocwhydetails } from "./hocwhydetails/useAddHocwhydetails";

const HocWhyTable = React.lazy(() => import("./HocWhyTable"));
const HocWhyDetailsTable = React.lazy(() => import("./HocWhyDetailsTable"));
const HocWhatTable = React.lazy(() => import("./HocWhatTable"));
const HocWhatDetailsTable = React.lazy(() => import("./HocWhatDetailsTable"));
const HocLocationTable = React.lazy(() => import("./HocLocationTable"));

const HocTablesUpdate = () => {
  const classes = useStyles();
  const { hocwhat } = useHocwhat();
  const updateHocWhat = useUpdateHocwhat();
  const deleteHocWhat = useDeleteHocwhat();
  const addHocWhat = useAddHocwhat();
  const { hocwhatdetails, setHocwhatdetailsId } = useHocwhatdetails();
  const updateHocWhatdetails = useUpdateHocwhatdetails();
  const deleteHocWhatdetails = useDeleteHocwhatdetails();
  const addHocWhatdetails = useAddHocwhatdetails();
  const { hocwhy, setHocwhyId } = useHocwhy();
  const updateHocWhy = useUpdateHocwhy();
  const deleteHocWhy = useDeleteHocwhy();
  const addHocWhy = useAddHocwhy();
  const { hocwhydetails, setHocwhydetailsId } = useHocwhydetails();
  const updateHocWhydetails = useUpdateHocwhydetails();
  const deleteHocWhydetails = useDeleteHocwhydetails();
  const addHocWhydetails = useAddHocwhydetails();
  const [categoryvalue, setCategoryvalue] = useState("Positive Act");
  const [selectedWhatRow, setSelectedWhatRow] = useState("");
  const [selectedWhyRow, setSelectedWhyRow] = useState("");
  const category = ["Positive Act", "Unsafe Act", "Unsafe Condition"];

  const columns = useMemo(
    () => [
      {
        title: "Description",
        field: "description",
      },
    ],
    []
  );

  const handleChange = (value) => {
    setCategoryvalue(value);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "Positive Act",
    onChange: handleChange,
  });
  const group = getRootProps();

  const update_HocWhat = (data) => {
    const { id, rec_id, ...fields } = data;
    updateHocWhat({ id, ...fields });
  };

  const add_HocWhat = (data) => {
    console.log("whatdata", data);
    console.log("category", categoryvalue);
    var newData = {};
    if (categoryvalue === "Positive Act") {
      newData = { ...data, positiveact: true };
    }
    if (categoryvalue === "Unsafe Act") {
      newData = { ...data, unsafeact: true, unsafecondition: true };
    }
    if (categoryvalue === "Unsafe Condition") {
      newData = { ...data, unsafecondition: true, unsafeact: true };
    }

    addHocWhat(newData);
  };

  const delete_HocWhat = (data) => {
    const { id } = data;
    deleteHocWhat(id);
  };

  const update_HocWhatdetails = (data) => {
    const { id, rec_id, ...fields } = data;
    updateHocWhatdetails({ id, ...fields });
  };

  const add_HocWhatdetails = (data) => {
    var newData = {};
    if (categoryvalue === "Positive Act") {
      newData = {
        ...data,
        positiveact: true,
        what: selectedWhatRow.description,
      };
    }
    if (categoryvalue === "Unsafe Act") {
      newData = {
        ...data,
        unsafeact: true,
        unsafecondition: true,
        what: selectedWhatRow.description,
      };
    }
    if (categoryvalue === "Unsafe Condition") {
      newData = {
        ...data,
        unsafecondition: true,
        unsafeact: true,
        what: selectedWhatRow.description,
      };
    }

    addHocWhatdetails(newData);
  };

  const delete_HocWhatdetails = (data) => {
    const { id } = data;
    deleteHocWhatdetails(id);
  };

  const onWhatSelectionChange = (selectedRows) => {
    console.log(selectedRows);
  };

  const onWhatRowClick = (e, clickedRow) => {
    setSelectedWhatRow(clickedRow);
  };

  const update_HocWhy = (data) => {
    const { id, rec_id, ...fields } = data;
    updateHocWhy({ id, ...fields });
  };

  const add_HocWhy = (data) => {
    console.log("data", data);
    var newData = {};
    if (categoryvalue === "Positive Act") {
      newData = { ...data, positiveact: true };
    }
    if (categoryvalue === "Unsafe Act") {
      newData = { ...data, unsafeact: true, unsafecondition: true };
    }
    if (categoryvalue === "Unsafe Condition") {
      newData = { ...data, unsafecondition: true, unsafeact: true };
    }
    console.log("newdata", newData);
    addHocWhy(newData);
  };

  const delete_HocWhy = (data) => {
    const { id } = data;
    deleteHocWhy(id);
  };

  const update_HocWhydetails = (data) => {
    const { id, rec_id, ...fields } = data;
    updateHocWhydetails({ id, ...fields });
  };

  const add_HocWhydetails = (data) => {
    var newData = {};
    // if (categoryvalue === "Positive Act") {
    //   newData = { ...data, positiveact: true };
    // }
    // if (categoryvalue === "Unsafe Act") {
    //   newData = { ...data, unsafeact: true, unsafecondition: true };
    // }
    // if (categoryvalue === "Unsafe Condition") {
    //   newData = { ...data, unsafecondition: true, unsafeact: true };
    // }
    newData = { ...data, why: selectedWhyRow.description };
    addHocWhydetails(newData);
  };

  const delete_HocWhydetails = (data) => {
    const { id } = data;
    deleteHocWhydetails(id);
  };

  const onWhySelectionChange = (selectedRows) => {
    console.log(selectedRows);
  };

  const onWhyRowClick = (e, clickedRow) => {
    setSelectedWhyRow(clickedRow);
  };

  useEffect(() => {
    setHocwhatdetailsId(selectedWhatRow.description);
  }, [selectedWhatRow]);

  useEffect(() => {
    setHocwhydetailsId(selectedWhyRow.description);
  }, [selectedWhyRow]);

  useEffect(() => {
    console.log("cat", categoryvalue);
  }, [categoryvalue]);

  useEffect(() => {
    if (categoryvalue === "Positive Act") {
      setHocwhyId((prev) => (prev = "none"));
      //setHocwhydetailsId((prev) => (prev = "none"));
    } else {
      setHocwhyId((prev) => (prev = ""));
      //setHocwhydetailsId((prev) => (prev = whystatus));
    }
  }, [categoryvalue]);

  return (
    <Container minW="container.lg" minH={900}>
      <Box pl={3}>
        <Heading size="md">HOC Category & Location</Heading>
      </Box>
      <Box py={2}>
        <Divider borderWidth={1} borderColor="teal" py={0} />
      </Box>
      <Box border="1px solid teal" borderRadius={15} p={1} mt={2}>
        <Stack direction="row" {...group} p={2}>
          {category.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            );
          })}
        </Stack>
        {/* <RadioGroup
          onChange={setType}
          value={type}
          marginLeft={2}
          border="1px solid teal"
          borderRadius={15}
          p={5}
        >
          <Stack direction="row">
            <Radio value="what">What</Radio>
            <Radio value="why">Why</Radio>
          </Stack>
        </RadioGroup> */}
        <Tabs>
          <TabList>
            <Tab>What</Tab>
            <Tab>Why</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Stack>
                <MaterialTable
                  columns={columns}
                  data={hocwhat.filter((r) => {
                    if (categoryvalue === "Positive Act") {
                      return r.positiveact;
                    } else {
                      return r.unsafeact;
                    }
                  })}
                  title="What Table"
                  editable={{
                    onRowAdd: (newData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          add_HocWhat(newData);
                          resolve();
                        }, 1000);
                      }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          update_HocWhat(newData);

                          resolve();
                        }, 1000);
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          delete_HocWhat(oldData);
                          resolve();
                        }, 1000);
                      }),
                  }}
                  onRowClick={onWhatRowClick}
                  onSelectionChange={onWhatSelectionChange}
                  options={{
                    filtering: true,
                    pageSize: 5,
                    selection: false,
                    rowStyle: (row) =>
                      row?.id === selectedWhatRow?.id
                        ? { background: "#e7e7e7" }
                        : {},
                    headerStyle: {
                      backgroundColor: "#90CDF4",
                      color: "primary",
                    },
                    showTitle: true,
                  }}
                  //onSelectionChange={(rows) => handleSelectRow(rows)}
                />

                <MaterialTable
                  columns={columns}
                  data={hocwhatdetails}
                  title={
                    selectedWhatRow
                      ? "What Details: " + selectedWhatRow?.description
                      : "What Details"
                  }
                  editable={{
                    onRowAdd: (newData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          add_HocWhatdetails(newData);
                          resolve();
                        }, 1000);
                      }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          update_HocWhatdetails(newData);

                          resolve();
                        }, 1000);
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          delete_HocWhatdetails(oldData);
                          resolve();
                        }, 1000);
                      }),
                  }}
                  options={{
                    filtering: true,
                    pageSize: 5,
                    headerStyle: {
                      backgroundColor: "#90CDF4",
                      color: "primary",
                    },
                    showTitle: true,
                  }}
                />
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack>
                <MaterialTable
                  columns={columns}
                  data={hocwhy.filter((r) => {
                    if (category === "Positive Act") {
                      return r.positiveact;
                    } else {
                      return r.unsafeact;
                    }
                  })}
                  title="Why Table"
                  editable={{
                    onRowAdd: (newData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          add_HocWhy(newData);
                          resolve();
                        }, 1000);
                      }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          update_HocWhy(newData);

                          resolve();
                        }, 1000);
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          delete_HocWhy(oldData);
                          resolve();
                        }, 1000);
                      }),
                  }}
                  onRowClick={onWhyRowClick}
                  onSelectionChange={onWhySelectionChange}
                  options={{
                    filtering: true,
                    pageSize: 5,
                    selection: false,
                    rowStyle: (row) =>
                      row?.id === selectedWhyRow?.id
                        ? { background: "#e7e7e7" }
                        : {},
                    headerStyle: {
                      backgroundColor: "#90CDF4",
                      color: "primary",
                    },
                    showTitle: true,
                  }}
                  //onSelectionChange={(rows) => handleSelectRow(rows)}
                />

                <MaterialTable
                  columns={columns}
                  data={hocwhydetails}
                  title={
                    selectedWhyRow
                      ? "Why Details: " + selectedWhyRow?.description
                      : "Why Details"
                  }
                  editable={{
                    onRowAdd: (newData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          add_HocWhydetails(newData);
                          resolve();
                        }, 1000);
                      }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          update_HocWhydetails(newData);

                          resolve();
                        }, 1000);
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          delete_HocWhydetails(oldData);
                          resolve();
                        }, 1000);
                      }),
                  }}
                  options={{
                    filtering: true,
                    pageSize: 5,
                    headerStyle: {
                      backgroundColor: "#90CDF4",
                      color: "primary",
                    },
                    showTitle: true,
                  }}
                />
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
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

export default HocTablesUpdate;
