import React, { useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useEmployeesContext } from "../context/employees_context";
import { useLeavesContext } from "../context/leaves_context";

export default function Emp_ViewFamily() {
  const classes = useStyles();
  const { editEmployeeID } = useEmployeesContext();
  const { singlebatch_leave, getSingleBatchLeave } = useLeavesContext();

  const columns = useMemo(
    () => [
      {
        title: "From Date",
        field: "from_date",
        type: "date",
        filtering: false,
        dateSetting: { locale: "en-GB" },
      },
      {
        title: "To Date",
        field: "to_date",
        type: "date",
        filtering: false,
        dateSetting: { locale: "en-GB" },
      },
      {
        title: "Reason",
        field: "Reason",
      },
      {
        title: "No of Days",
        field: "no_of_days",
        type: "numeric",
        filtering: false,
      },
      {
        title: "Status",
        field: "status",
      },
    ],
    []
  );

  useEffect(() => {
    getSingleBatchLeave(editEmployeeID);
  }, []);

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={singlebatch_leave}
          title=""
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
