import React from "react";
//import { Divider, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//import { useHistory } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
//import { useDepartments } from "./departments/useDepartments";
//import { useDesignations } from "./designations/useDesignations";
//import { useAllowances } from "./allowances/useAllowances";
//import { useDeductions } from "./deductions/useDeductions";
//import { useCurrency } from "./currency/useCurrency";
//import { useTablesContext } from "../context/tables_context";
const HocWhyTable = React.lazy(() => import("./HocWhyTable"));
const HocWhyDetailsTable = React.lazy(() => import("./HocWhyDetailsTable"));
const HocWhatTable = React.lazy(() => import("./HocWhatTable"));
const HocWhatDetailsTable = React.lazy(() => import("./HocWhatDetailsTable"));
const HocLocationTable = React.lazy(() => import("./HocLocationTable"));

const HocTablesUpdate = () => {
  const classes = useStyles();

  return (
    <Container minW="container.xl" minH={900}>
      <Box pl={3}>
        <Heading size="md">HOC Category & Location</Heading>
      </Box>
      <Tabs>
        <TabList>
          <Tab>Positive Act</Tab>
          <Tab>Unsafe Act</Tab>
          <Tab>Unsave Condition</Tab>
          <Tab>Location</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Tabs>
              <TabList>
                <Tab>What</Tab>
                <Tab>Why</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box px={0}>
                    <HocWhatTable category="positiveact" />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box px={0}>
                    <HocWhyTable />
                    <HocWhyDetailsTable />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <Tabs>
              <TabList>
                <Tab>What</Tab>
                <Tab>Why</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box px={0}>
                    <HocWhatTable category="unsafeact" />
                    <HocWhatDetailsTable />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box px={0}>
                    <HocWhyTable />
                    <HocWhyDetailsTable />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <Tabs>
              <TabList>
                <Tab>What</Tab>
                <Tab>Why</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box px={0}>
                    <HocWhatTable category="unsafecondition" />
                    <HocWhatDetailsTable />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box px={0}>
                    <HocWhyTable />
                    <HocWhyDetailsTable />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <Box px={0}>
              <HocLocationTable />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
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
