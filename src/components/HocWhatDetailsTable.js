import React, { useMemo } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHocwhatdetails } from "./hocwhatdetails/useHocwhatdetails";
import { useUpdateHocwhatdetails } from "./hocwhatdetails/useUpdateHocwhatdetails";
import { useDeleteHocwhatdetails } from "./hocwhatdetails/useDeleteHocwhatdetails";
import { useAddHocwhatdetails } from "./hocwhatdetails/useAddWhatdetails";

export default function HocWhatDetailsTable() {
  const classes = useStyles();
  const { hocwhatdetails } = useHocwhatdetails();
  const updateHocWhatdetails = useUpdateHocwhatdetails();
  const deleteHocWhatdetails = useDeleteHocwhatdetails();
  const addHocWhatdetails = useAddHocwhatdetails();

  const columns = useMemo(
    () => [
      {
        title: "Description",
        field: "description",
      },
    ],
    []
  );

  const update_HocWhatdetails = (data) => {
    const { id, rec_id, ...fields } = data;
    updateHocWhatdetails({ id, ...fields });
  };

  const add_HocWhatdetails = (data) => {
    addHocWhatdetails(data);
  };

  const delete_HocWhatdetails = (data) => {
    const { id } = data;
    deleteHocWhatdetails(id);
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "90%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={hocwhatdetails}
          title="What Details Table"
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
      </div>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
