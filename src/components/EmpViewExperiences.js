import React, { useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";

export default function Emp_Experiences({
  experiencedata,
  setExperiencedata,
  handleDialogClose,
}) {
  const classes = useStyles();
  const { editEmployeeID } = useEmployeesContext();
  const { loadSingleBatchExperience, singlebatchexperience } =
    useTablesContext();

  const columns = useMemo(
    () => [
      {
        title: "Company",
        field: "company",
      },
      {
        title: "Location",
        field: "location",
      },
      {
        title: "Position",
        field: "position",
      },
      {
        title: "From Date",
        field: "from_date",
        type: "date",
        dateSetting: { locale: "en-GB" },
      },
      {
        title: "To Date",
        field: "to_date",
        type: "date",
        dateSetting: { locale: "en-GB" },
      },
    ],
    []
  );

  useEffect(() => {
    //console.log(linkid);
    loadSingleBatchExperience(editEmployeeID);
  }, []);

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={singlebatchexperience}
          title="Experience"
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
