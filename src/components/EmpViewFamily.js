import React, { useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";

export default function Emp_ViewFamily() {
  const classes = useStyles();
  const { editEmployeeID } = useEmployeesContext();
  const { loadSingleBatchFamily, singlebatchfamily } = useTablesContext();

  const columns = useMemo(
    () => [
      {
        title: "Name",
        field: "name",
        filtering: false,
      },
      {
        title: "Relationship",
        field: "relationship",
      },
      {
        title: "BIrth Date",
        field: "birth_date",
        type: "date",
        dateSetting: { locale: "en-GB" },
        filtering: false,
      },
      {
        title: "Phone",
        field: "phone",
      },
    ],
    []
  );

  useEffect(() => {
    loadSingleBatchFamily(editEmployeeID);
  }, []);

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={singlebatchfamily}
          title="Family"
          options={{
            search: false,
            toolbar: false,
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
