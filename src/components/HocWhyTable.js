import React, { useMemo } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHocwhy } from "./hocwhy/useHocwhy";
import { useUpdateHocwhy } from "./hocwhy/useUpdateHocwhy";
import { useDeleteHocwhy } from "./hocwhy/useDeleteHocwhy";
import { useAddHocwhy } from "./hocwhy/useAddHocwhy";

export default function HocWhyTable() {
  const classes = useStyles();
  const { hocwhy } = useHocwhy();
  const updateHocWhy = useUpdateHocwhy();
  const deleteHocWhy = useDeleteHocwhy();
  const addHocWhy = useAddHocwhy();

  const columns = useMemo(
    () => [
      {
        title: "Description",
        field: "description",
      },
    ],
    []
  );

  const update_HocWhy = (data) => {
    const { id, rec_id, ...fields } = data;
    updateHocWhy({ id, ...fields });
  };

  const add_HocWhy = (data) => {
    addHocWhy(data);
  };

  const delete_HocWhy = (data) => {
    const { id } = data;
    deleteHocWhy(id);
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "90%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={hocwhy}
          title="HOC Why Table"
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
      </div>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
