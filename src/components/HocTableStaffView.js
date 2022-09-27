import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  //Grid,
  Heading,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  //ModalHeader,
  //ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  //Text,
  useDisclosure,
} from "@chakra-ui/react";
import HocTable from "./HocTable";

const HocTableStaffView = () => {
  const currentyear = new Date().getFullYear();
  const currentmonth = new Date().getMonth();
  const [selecthocyear, setSelectHocYear] = useState("");
  

  useEffect(() => {
    setSelectHocYear(currentyear);
  }, []);

  return (
    <Box padding={0}>
      <HStack>
        <Box>
          <Heading as="h2" size="md">
            HOC Table
          </Heading>
        </Box>
        <Box alignSelf="flex-end">
          <HStack>
            <Select
              value={selecthocyear}
              fontSize={20}
              onChange={(e) => setSelectHocYear(e.target.value)}
            >
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </Select>
            {/* <Box size="xl" py={2}>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  onClick={() => handleExportHoc2Excel()}
                >
                  Export To Excel
                </Button>
              </Box> */}
          </HStack>
        </Box>
      </HStack>
      <Divider />
      <Box
        maxW="full"
        padding="4"
        width="100%"
        height="auto"
        borderColor="blue.500"
        borderWidth="1px"
        borderRadius="lg"
        overflow="scroll"
      >
        <Tabs defaultIndex={currentmonth} isLazy>
          <TabList>
            <Tab>January</Tab>
            <Tab>February</Tab>
            <Tab>March</Tab>
            <Tab>April</Tab>
            <Tab>May</Tab>
            <Tab>June</Tab>
            <Tab>July</Tab>
            <Tab>August</Tab>
            <Tab>September</Tab>
            <Tab>October</Tab>
            <Tab>November</Tab>
            <Tab>December</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <HocTable
                year={selecthocyear ? selecthocyear : currentyear}
                month={0}
              />
            </TabPanel>
            <TabPanel>
              <HocTable
                year={selecthocyear ? selecthocyear : currentyear}
                month={1}
              />
            </TabPanel>
            <TabPanel>
              <HocTable
                year={selecthocyear ? selecthocyear : currentyear}
                month={2}
              />
            </TabPanel>
            <TabPanel>
              <HocTable
                year={selecthocyear ? selecthocyear : currentyear}
                month={3}
              />
            </TabPanel>
            <TabPanel>
              <HocTable
                year={selecthocyear ? selecthocyear : currentyear}
                month={4}
              />
            </TabPanel>
            <TabPanel>
              <HocTable
                year={selecthocyear ? selecthocyear : currentyear}
                month={5}
              />
            </TabPanel>
            <TabPanel>
              <HocTable
                year={selecthocyear ? selecthocyear : currentyear}
                month={6}
              />
            </TabPanel>
            <TabPanel>
              <HocTable
                year={selecthocyear ? selecthocyear : currentyear}
                month={7}
              />
            </TabPanel>
            <TabPanel>
              <HocTable
                year={selecthocyear ? selecthocyear : currentyear}
                month={8}
              />
            </TabPanel>
            <TabPanel>
              <HocTable
                year={selecthocyear ? selecthocyear : currentyear}
                month={9}
              />
            </TabPanel>
            <TabPanel>
              <HocTable
                year={selecthocyear ? selecthocyear : currentyear}
                month={10}
              />
            </TabPanel>
            <TabPanel>
              <HocTable
                year={selecthocyear ? selecthocyear : currentyear}
                month={11}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default HocTableStaffView;
