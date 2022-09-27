import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import {
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillEdit, AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { useEmployeesContext } from "../context/employees_context";
import { useJobhistory } from "./jobhistory/useJobhistory";
import { useUpdateJobhistory } from "./jobhistory/useUpdateJobhistory";
import { useAddJobhistory } from "./jobhistory/useAddJobhistory";
import { useDeleteJobhistory } from "./jobhistory/useDeleteJobhistory";
import JobhistoryForm from "./JobhistoryForm";
import { AlertDialogBox } from "../helpers/AlertDialogBox";

const initial_jobhistory = {
  empid: "",
  name: "",
  designation: "",
  department: "",
  status: "",
  remark: "",
  basicsalary: 0,
  siteallows: 0,
  isresign: false,
};

export default function Emp_Jobhistory({
  empid,
  staffname,
  basicsalary,
  siteallows,
  department,
  designation,
  jobhistorydata,
  setJobhistorydata,
  handleDialogClose,
}) {
  const classes = useStyles();
  const { jobhistory, filter, setFilter, setJobId } = useJobhistory();
  //const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const updateJobhistory = useUpdateJobhistory();
  const addJobhistory = useAddJobhistory();
  const deleteJobhistory = useDeleteJobhistory();
  const [state, setState] = useState({});
  const [statustype, setStatusType] = useState("");
  const { editEmployeeID } = useEmployeesContext();
  const {
    isOpen: isJobOpen,
    onOpen: onJobOpen,
    onClose: onJobClose,
  } = useDisclosure();
  const {
    isOpen: isAlertDeleteOpen,
    onOpen: onAlertDeleteOpen,
    onClose: onAlertDeleteClose,
  } = useDisclosure();

  const columns = [
    {
      title: "Designation",
      field: "designation",
    },
    {
      title: "Department",
      field: "department",
    },
    {
      title: "Effective Date",
      field: "effectdate",
      type: "date",
      dateSetting: { locale: "en-GB" },
      editComponent: (props) => (
        <TextField
          defaultValue={props.value || new Date()}
          onChange={(e) => props.onChange(e.target.value)}
          type="date"
        />
      ),
    },
    {
      title: "Status",
      field: "status",
    },
    {
      title: "Remark",
      field: "remark",
    },
  ];

  useEffect(() => {
    setJobId(editEmployeeID);
  }, []);

  const add_Jobhistory = (data) => {
    console.log("addjob", data);
    addJobhistory({
      ...data,
    });
  };

  const delete_Jobhistory = (id) => {
    deleteJobhistory(id);
  };

  const update_Jobhistory = (data) => {
    const { id, rec_id, tableData, ...fields } = data;
    updateJobhistory({ id, ...fields });
  };

  const handleAddJobhistory = () => {
    const data = {
      ...initial_jobhistory,
      name: staffname,
      empid: empid,
      basicsalary: basicsalary,
      siteallows: siteallows,
      department: department,
      designation: designation,
    };
    setState(data);
    onJobOpen(true);
  };

  const handleUpdateJobhistory = (data) => {
    setState(data);
    onJobOpen(true);
  };

  const handleDeleteJobhistory = (rowData) => {
    setState((prev) => (prev = { ...rowData }));
    onAlertDeleteOpen();
  };

  const handleOnDeleteConfirm = () => {
    const { id } = state;
    delete_Jobhistory(id);
    // toast({
    //   title: "Order being deleted!",
    //   status: "warning",
    // });
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={jobhistory}
          title="Employment History"
          actions={[
            {
              icon: () => <AiOutlinePlus size="30px" />,
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                setStatusType((prev) => (prev = "add"));
                handleAddJobhistory(rowData);
              },
            },
            (rowData) => ({
              //disabled: rowData.status !== "Pending",
              icon: () => <AiFillEdit size="30px" />,
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                setStatusType((prev) => (prev = "edit"));
                handleUpdateJobhistory(rowData);
              },
            }),
            (rowData) => ({
              //disabled: rowData.status !== "Pending",
              icon: () => <AiFillDelete />,
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                handleDeleteJobhistory(rowData);
              },
            }),
          ]}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "orange",
              color: "primary",
            },
            showTitle: true,
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
              </div>
            ),
          }}
        />
      </div>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isJobOpen}
        onClose={onJobClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Product Form</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <JobhistoryForm
              state={state}
              setState={setState}
              statustype={statustype}
              add_Item={add_Jobhistory}
              update_Item={update_Jobhistory}
              onJobClose={onJobClose}
            />
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onProductClose}>
              Close
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
      <AlertDialogBox
        onClose={onAlertDeleteClose}
        onConfirm={handleOnDeleteConfirm}
        isOpen={isAlertDeleteOpen}
        title="Delete Employment History"
      >
        <Heading size="md">
          Are you sure you want to delete this history record ?
        </Heading>
      </AlertDialogBox>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
