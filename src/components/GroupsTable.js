import React, { useMemo, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useGroups } from "./groups/useGroups";
import { useUpdateGroup } from "./groups/useUpdateGroup";
import { useDeleteGroup } from "./groups/useDeleteGroup";
import { useAddGroup } from "./groups/useAddGroup";

export default function UpdateGroups({ type }) {
  const classes = useStyles();
  const { groups, setGroupId } = useGroups();
  const updateGroup = useUpdateGroup();
  const deleteGroup = useDeleteGroup();
  const addGroup = useAddGroup();

  const columns = useMemo(
    () => [
      {
        title: "Description",
        field: "description",
      },
      // {
      //   title: "Type",
      //   field: "grouptype",
      // },
    ],
    []
  );

  const update_Group = (data) => {
    const { id, rec_id, ...fields } = data;
    updateGroup({ id, ...fields });
  };

  const add_Group = (data) => {
    const newData = { ...data, grouptype: type };
    addGroup(newData);
  };

  const delete_Group = (data) => {
    const { id } = data;
    deleteGroup(id);
  };

  useEffect(() => {
    setGroupId(type)
  },[type])

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={groups}
          title={type + " Types" }
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Group(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Group(newData);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Group(oldData);
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
