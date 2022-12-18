import React, { useMemo, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useLeavestypes } from "./leavestypes/useLeavestypes";
import { useUpdateLeavestype } from "./leavestypes/useUpdateLeavestype";
import { useDeleteLeavestype } from "./leavestypes/useDeleteLeavestype";
import { useAddLeavestype } from "./leavestypes/useAddLeavestype";

export default function LeavestypesTable() {
  const classes = useStyles();
  const { leavestypes, setLeaveId } = useLeavestypes();
  const updateLeavestype = useUpdateLeavestype();
  const deleteLeavestype = useDeleteLeavestype();
  const addLeavestype = useAddLeavestype();

  const columns = useMemo(
    () => [
      {
        title: "Description",
        field: "description",
      },
    //   {
    //     title: "Deduct Leave",
    //     field: "isdeductable",
    //   },
    ],
    []
  );

  const update_Leavestype = (data) => {
    const { id, rec_id, ...fields } = data;
    updateLeavestype({ id, ...fields });
  };

  const add_Leavestype = (data) => {
    //const newData = { ...data, grouptype: type };
    addLeavestype(data);
  };

  const delete_Leavestype = (data) => {
    const { id } = data;
    deleteLeavestype(id);
  };

  //   useEffect(() => {
  //     setGroupId(type);
  //   }, [type]);

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={leavestypes}
          title="Type Of Leaves"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Leavestype(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Leavestype(newData);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Leavestype(oldData);
                  resolve();
                }, 1000);
              }),
          }}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#90CDF4",
              color: "primary",
            },
            showTitle: true,
          }}
        />
      </div>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
