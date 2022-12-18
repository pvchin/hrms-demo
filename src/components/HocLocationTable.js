import React, { useMemo, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHoclocation } from "./hoclocation/useHoclocation";
import { useUpdateHoclocation } from "./hoclocation/useUpdateHoclocation";
import { useDeleteHoclocation } from "./hoclocation/useDeleteHoclocation";
import { useAddHoclocation } from "./hoclocation/useAddHoclocation";

export default function HocLocationTable() {
  const classes = useStyles();
  const { hoclocation, setHoclocationId } = useHoclocation();
  const updateHoclocation = useUpdateHoclocation();
  const deleteHoclocation = useDeleteHoclocation();
  const addHoclocation = useAddHoclocation();

  const columns = useMemo(
    () => [
      {
        title: "Location",
        field: "name",
      },
    ],
    []
  );

  const update_HocLocation = (data) => {
    const { id, rec_id, ...fields } = data;
    updateHoclocation({ id, ...fields });
  };

  const add_HocLocation = (data) => {
    addHoclocation(data);
  };

  const delete_HocLocation = (data) => {
    const { id } = data;
    deleteHoclocation(id);
  };

  useEffect(() => {
    setHoclocationId("1")
  },[])

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "90%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={hoclocation}
          title="HOC Location Table"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_HocLocation(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_HocLocation(newData);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_HocLocation(oldData);
                  resolve();
                }, 1000);
              }),
          }}
          options={{
            filtering: true,
            pageSize: 10,
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
