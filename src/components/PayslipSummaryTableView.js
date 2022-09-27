import React, { useState, useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { usePayrunStatus } from "./payrun/usePayrunStatus";

export default function PayslipSummaryTableView({ year, status }) {
  const classes = useStyles();
  const [paydata, setPayData] = useState([]);
  const [isCalc, setIsCalc] = useState(false);
  const { payrunstatus, setPayrunStatusId } = usePayrunStatus();

  const columns = useMemo(
    () => [
      {
        title: "January",
        field: "jan",
      },
      {
        title: "February",
        field: "feb",
      },
      {
        title: "March",
        field: "mar",
      },
      {
        title: "April",
        field: "apr",
      },
      {
        title: "May",
        field: "may",
      },
      {
        title: "June",
        field: "jun",
      },
      {
        title: "July",
        field: "jul",
      },
      {
        title: "August",
        field: "aug",
      },
      {
        title: "September",
        field: "sep",
      },
      {
        title: "October",
        field: "oct",
      },
      {
        title: "November",
        field: "nov",
      },
      {
        title: "December",
        field: "dec",
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        jan: 80,
        feb: 90,
        mar: 78,
        apr: 63,
        may: 55,
        jun: 60,
        jul: 55,
        aug: 65,
        sep: 70,
        oct: 58,
        nov: 60,
        dec: 62,
      },
    ],
    []
  );

  useEffect(() => {
    setPayrunStatusId(status);
    setIsCalc(true);
  }, []);

  useEffect(() => {
    if (payrunstatus) {
      Build_data();
      setIsCalc(false);
    }
  }, [isCalc]);

  const Build_data = () => {
    payrunstatus.forEach((rec) => {
      const { payrun, totalpayroll } = rec;
      if (payrun === "2021-01") {
        setPayData({ ...paydata, jan: totalpayroll });
      }
      if (payrun === "2021-06") {
        setPayData({ ...paydata, jun: totalpayroll });
      }
      if (payrun === "2021-07") {
        setPayData({ ...paydata, jul: totalpayroll });
      }
      if (payrun === "2021-08") {
        setPayData({ ...paydata, aug: totalpayroll });
      }
    });
    console.log("build", paydata);
  };

  // payrunstatus.map((rec) => {
  //   const { payrun, totalpayroll } = rec
  //   return {
  //     if(payrun === "2021-01") {
  //       setPayData({...paydata, jan: totalpayroll})
  //     }
  //   }

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={data}
          title="Expenses Claims"
          options={{
            filtering: false,
            search: false,
            toolbar: false,
            headerStyle: {
              backgroundColor: "rgba(75, 192, 192, 1)",
              color: "white",
            },
            showTitle: false,
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
