import React, { useState, useMemo, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHocwhat } from "./hocwhat/useHocwhat";
import { useUpdateHocwhat } from "./hocwhat/useUpdateHocwhat";
import { useDeleteHocwhat } from "./hocwhat/useDeleteHocwhat";
import { useAddHocwhat } from "./hocwhat/useAddHocwhat";
import { useHocwhatdetails } from "./hocwhatdetails/useHocwhatdetails";
import { useUpdateHocwhatdetails } from "./hocwhatdetails/useUpdateHocwhatdetails";
import { useDeleteHocwhatdetails } from "./hocwhatdetails/useDeleteHocwhatdetails";
import { useAddHocwhatdetails } from "./hocwhatdetails/useAddWhatdetails";

export default function HocWhatTable({ category }) {
  const classes = useStyles();
  const { hocwhat } = useHocwhat();
  const updateHocWhat = useUpdateHocwhat();
  const deleteHocWhat = useDeleteHocwhat();
  const addHocWhat = useAddHocwhat();
  const { hocwhatdetails } = useHocwhatdetails();
  const updateHocWhatdetails = useUpdateHocwhatdetails();
  const deleteHocWhatdetails = useDeleteHocwhatdetails();
  const addHocWhatdetails = useAddHocwhatdetails();
  const [filtereddata, setFiltereddata] = useState({});
  const columns = useMemo(
    () => [
      {
        title: "Description",
        field: "description",
      },
    ],
    []
  );

  console.log("category", category)

  const filter_hocwhat = () => {
    switch (category) {
      case "positiveact":
        setFiltereddata(
          (prev) => (prev = hocwhat.filter((r) => r.positiveact))
        );
        return null;
      case "unsafeact":
        setFiltereddata((prev) => (prev = hocwhat.filter((r) => r.unsafeact)));
        return null;
      case "unsafecondition":
        setFiltereddata(
          (prev) => (prev = hocwhat.filter((r) => r.unsafecondition))
        );
        return null;
      default:
        setFiltereddata((prev) => (prev = {}));
        return null;
    }
  };

  const update_HocWhat = (data) => {
    const { id, rec_id, ...fields } = data;
    updateHocWhat({ id, ...fields });
  };

  const add_HocWhat = (data) => {
    addHocWhat(data);
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
    addHocWhatdetails(data);
  };

  const delete_HocWhatdetails = (data) => {
    const { id } = data;
    deleteHocWhatdetails(id);
  };

  useEffect(() => {
    filter_hocwhat();
  }, [category]);

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "90%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={filtereddata}
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
