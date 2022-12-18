import React, { useMemo } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHocwhydetails } from "./hocwhydetails/useHocwhydetails";
import { useUpdateHocwhydetails } from "./hocwhydetails/useUpdateHocwhydetails";
import { useDeleteHocwhydetails } from "./hocwhydetails/useDeleteHocwhydetails";
import { useAddHocwhydetails } from "./hocwhydetails/useAddHocwhydetails";

export default function HocWhyDetailsTable() {
  const classes = useStyles();
  const { hocwhydetails } = useHocwhydetails();
  const updateHocWhydetails = useUpdateHocwhydetails();
  const deleteHocWhydetails = useDeleteHocwhydetails();
  const addHocWhydetails = useAddHocwhydetails();

  const columns = useMemo(
    () => [
      {
        title: "Description",
        field: "description",
      },
    ],
    []
  );

  const update_HocWhydetails = (data) => {
    const { id, rec_id, ...fields } = data;
    updateHocWhydetails({ id, ...fields });
  };

  const add_HocWhydetails = (data) => {
    addHocWhydetails(data);
  };

  const delete_HocWhydetails = (data) => {
    const { id } = data;
    deleteHocWhydetails(id);
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "90%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={hocwhydetails}
          title="HOC Why Details Table"
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
      </div>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
