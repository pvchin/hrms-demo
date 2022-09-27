import React, { useState, useEffect, useMemo } from "react";
import currency from "currency.js";
//import PrintPaySummary from "./PrintPaySummary";
import {
  Box,
  //Heading,
  //Text,
  //Table,
  //Thead,
  //Tbody,
  //Tr,
  //Th,
  //Td,
  //chakra,
} from "@chakra-ui/react";
//import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import MaterialTable from "material-table";
import { Grid, TextField } from "@material-ui/core";
//import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
//import { formatPriceZero } from "../helpers/Utils";
import { payrunState } from "./data/atomdata";
//import { usePayslipsContext } from "../context/payslips_context";
//import { ComponentToPrint } from "./ComponentToPrint";
//import PaySummaryTable from "./PaySummaryTable";

// const initial_state = [
//   {
//     totalwages: 0,
//     totaltap: 0,
//     totalscp: 0,
//     totalallows: 0,
//     totaldeducts: 0,
//     totalpayroll: 0,
//   },
// ];

const PaySummary = ({ singlebatchpayslip }) => {
  //const classes = useStyles();
  //const componentRef = useRef();
  //const [state, setState] = useState(initial_state);
  const [payrundata, setPayrundata] = useRecoilState(payrunState);
  //const [payrunstatus, setPayrunStatus] = useRecoilState(payrunStatusState);
  const [isCalc, setIsCalc] = useState(true);
  //const { payrun, updatePayrun, payslip_period } = usePayslipsContext();

  const columns = useMemo(
    () => [
      {
        title: "Name",
        field: "name",
        editable: "never",
      },
      {
        title: "Wages",
        field: "wages_bnd",
        editable: "never",
        type: "currency",
      },
      {
        title: "TAP Amount",
        field: "tap_amount_bnd",
        editable: "never",
        type: "currency",
      },
      {
        title: "SCP Amount",
        field: "scp_amount_bnd",
        editable: "never",
        type: "currency",
      },
      {
        title: "Site Allows",
        field: "site_allows_bnd",
        editable: "never",
        type: "currency",
      },
      {
        title: "Exps Claims",
        field: "expenses_claims_bnd",
        editable: "never",
        type: "currency",
      },
      {
        title: "Allowances",
        field: "total_allowances_bnd",
        editable: "never",
        type: "currency",
      },
      {
        title: "Deductions",
        field: "total_deductions_bnd",
        editable: "never",
        type: "currency",
      },
      {
        title: "Nett Pay",
        field: "nett_pay_bnd",
        editable: "never",
        type: "currency",
      },
    ],
    []
  );

  // const columns1 = [
  //   {
  //     Header: "Name",
  //     accessor: "name",
  //   },
  //   {
  //     Header: "Wages",
  //     accessor: "wages_bnd",
  //     isNumeric: true,
  //     Cell: (props) => formatPriceZero(props.value),
  //   },

  //   {
  //     Header: "TAP Amount",
  //     accessor: "tap_amount_bnd",
  //     isNumeric: true,
  //     Cell: (props) => formatPriceZero(props.value),
  //   },
  //   {
  //     Header: "SCP Amount",
  //     accessor: "scp_amount_bnd",
  //     isNumeric: true,
  //     Cell: (props) => formatPriceZero(props.value),
  //   },
  //   {
  //     Header: "Site Allows",
  //     accessor: "site_allows_bnd",
  //     isNumeric: true,
  //     Cell: (props) => formatPriceZero(props.value),
  //   },
  //   {
  //     Header: "Exps Claims",
  //     accessor: "expenses_claims_bnd",
  //     isNumeric: true,
  //     Cell: (props) => formatPriceZero(props.value),
  //   },
  //   {
  //     Header: "Allowances",
  //     accessor: "total_allowances_bnd",
  //     isNumeric: true,
  //     Cell: (props) => formatPriceZero(props.value),
  //   },
  //   {
  //     Header: "Deductions",
  //     accessor: "total_deductions_bnd",
  //     isNumeric: true,
  //     Cell: (props) => formatPriceZero(props.value),
  //   },
  //   {
  //     Header: "Nett Pay",
  //     accessor: "nett_pay_bnd",
  //     isNumeric: true,
  //     Cell: (props) => formatPriceZero(props.value),
  //   },
  // ];

  // const exportPdfTable = () => {
  //   PrintPaySummary((singlebatchpayslip = { singlebatchpayslip }));
  // };

  const handleCalcTotals = () => {
    const data = singlebatchpayslip;
    const totalwages = data.reduce((acc, item) => {
      return acc + item.wages_bnd;
    }, 0);
    const totalsitesallows = data.reduce((acc, item) => {
      return acc + item.site_allows_bnd;
    }, 0);
    const totalexpclaims = data.reduce((acc, item) => {
      return acc + item.expenses_claims_bnd;
    }, 0);
    const totalallows = data.reduce((acc, item) => {
      return acc + item.total_allowances_bnd;
    }, 0);
    const totaldeducts = data.reduce((acc, item) => {
      return acc + item.total_deductions_bnd;
    }, 0);
    const totaltap = data.reduce((acc, item) => {
      return acc + item.tap_amount_bnd;
    }, 0);
    const totalscp = data.reduce((acc, item) => {
      return acc + item.scp_amount_bnd;
    }, 0);
    const totalpayroll = data.reduce((acc, item) => {
      return acc + item.nett_pay_bnd;
    }, 0);

    setPayrundata({
      ...payrundata,
      totalpayroll: totalpayroll,
      totalwages: totalwages,
      totaltap: totaltap,
      totalscp: totalscp,
      totalallows: totalallows,
      totaldeducts: totaldeducts,
      totalsitesallows: totalsitesallows,
      totalexpensesclaims: totalexpclaims,
    });
    // payrun
    //   .filter((r) => r.payrun === payslip_period)
    //   .map((rec) => {
    //     //update payrun
    //     return updatePayrun({
    //       id: rec.id,
    //       totalpayroll: totalpayroll,
    //       totalwages: totalwages,
    //       totaltap: totaltap,
    //       totalscp: totalscp,
    //       totalallows: totalallows,
    //       totaldeducts: totaldeducts,
    //       totalsitesallows: totalsitesallows,
    //       totalexpensesclaims: totalexpclaims,
    //     });
    //   });
    // console.log("payrundata", payrundata);
    // console.log(
    //   "totals",
    //   totalpayroll,
    //   totalwages,
    //   totaltap,
    //   totalscp,
    //   totalallows,
    //   totaldeducts
    // );
  };

  // const handleSaveCalcTotals = (e) => {
  //   e.preventDefault();
  //   handleCalcTotals();
  //};

  useEffect(() => {
    handleCalcTotals();
    setIsCalc(false);
  }, [isCalc]);

  return (
    <div>
      {/* <div style={{ display: "none" }}> */}
      <div>
        {/* <div style={{ border: "1px solid black" }} align="center">
          <button onClick={() => exportPdfTable()}>
            <Heading size="sm">Print Payroll Summary Report!</Heading>
          </button>
        </div> */}
        {/* <div>
          <div style={{ display: "none" }}>
            <ComponentToPrint ref={componentRef} />
          </div>
          <button onClick={handlePrint}>Print this out!</button>
        </div> */}
      </div>
      <form>
        <Grid container direction="row" style={{ border: "1px solid black" }}>
          <Grid
          // item
          // sm={12}
          // align="center"
          // style={{ border: "1px solid black" }}
          >
            <div>
              {/* <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              style={{ marginLeft: 5 }}
              onClick={(e) => handleSaveCalcTotals(e)}
            >
              Save <Icon className={classes.rightIcon}>send</Icon>
            </Button> */}
              {/* <Heading size="sm">Summary</Heading> */}
              {/* <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                style={{ marginLeft: 5 }}
                onClick={(e) => handle_Print(e)}
              >
                Print <Icon className={classes.rightIcon}>send</Icon>
              </Button> */}
              {/* <div>
                <ReactToPrint
                  trigger={(e) => {
                    handle_Print(e);
                  }}
                  content={() => this.componentRef}
                />
                <ComponentToPrint ref={(el) => (this.componentRef = el)} />
              </div> */}
            </div>
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ border: "1px solid white" }}>
          <Grid
            item
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <div>
              <TextField
                label="Period"
                name="period"
                variant="filled"
                type="text"
                value={payrundata.period}
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <div>
              <TextField
                label="Pay Run Batch"
                name="payrun"
                variant="filled"
                type="text"
                value={payrundata.payrun}
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <div>
              <TextField
                label="Status"
                name="status"
                variant="filled"
                value={payrundata.status}
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <div>
              <TextField
                label="Payroll Total"
                name="paytotal"
                variant="filled"
                type="number"
                value={currency(payrundata.totalpayroll)}
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </Grid>
        </Grid>

        <Grid container direction="row" style={{ border: "1px solid white" }}>
          <Grid
            item
            sm={12}
            align="center"
            style={{ border: "1px solid white" }}
          >
            {/* <Box h="400" overflow="scroll">
              <PaySummaryTable columns={columns} data={singlebatchpayslip} />
            </Box> */}
            <Box h="400" w="full" overflow="scroll">
              <MaterialTable
                columns={columns}
                data={singlebatchpayslip}
                title="Payroll"
                options={{
                  filtering: false,
                  search: false,
                  toolbar: false,
                  paging: false,
                  headerStyle: {
                    backgroundColor: "lightblue",
                    color: "primary",
                  },
                  showTitle: false,
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ border: "1px solid white" }}>
          <Grid
            item
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <div>
              <TextField
                label="Total Wages"
                name="totalwages"
                variant="filled"
                type="currency"
                value={currency(payrundata.totalwages)}
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <div>
              <TextField
                label="Total TAP"
                name="totaltap"
                variant="filled"
                type="currency"
                value={currency(payrundata.totaltap)}
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <div>
              <TextField
                label="Total SCP"
                name="totalscp"
                variant="filled"
                type="currency"
                value={currency(payrundata.totalscp)}
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <div>
              <TextField
                label="Total Sites Allows"
                name="totalsitesallows"
                variant="filled"
                type="currency"
                value={currency(payrundata.totalsiteallows)}
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <div>
              <TextField
                label="Total Expenses Claims"
                name="totalsitesallows"
                variant="filled"
                type="currency"
                value={currency(payrundata.totalexpensesclaims)}
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <div>
              <TextField
                label="Total Allowances"
                name="totalallows"
                variant="filled"
                type="currency"
                value={currency(payrundata.totalallows)}
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <div>
              <TextField
                label="Total Deductions"
                name="totaldeducts"
                variant="filled"
                type="currency"
                value={currency(payrundata.totaldeducts)}
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <div>
              <TextField
                label="Total Payroll"
                name="totalpayroll"
                variant="filled"
                type="currency"
                value={currency(payrundata.totalpayroll)}
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   button: {
//     margin: theme.spacing(1),
//   },
//   container: {
//     margin: 0,
//     padding: 0,
//     width: "80vw",
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill,250px)",
//     gridAutoRows: "10px",
//     position: "absolute",
//     left: "50%",
//     transform: "translateX(-50%)",
//     justifyContent: "center",
//     backgroundColor: "primary",
//   },
//   fixedHeight: {
//     height: 800,
//   },
//   paper: {
//     padding: theme.spacing(10),
//     // display: "flex",
//     display: "flex",
//     overflow: "auto",
//     flexDirection: "column",
//     border: "1px solid",
//     width: "100%",
//     color: "primary",
//     bcakgroundColor: "black",
//   },
//   card: {
//     backgroundColor: "black",
//   },
//   section: {
//     width: "80vw",
//     margin: "1rem auto",
//     maxWidth: "var(--max-width)",
//   },
//   underline: {
//     width: "5rem",
//     height: "0.25rem",
//     marginBottom: "1.25rem",
//     background: "var(--clr-primary-5)",
//     marginLeft: "auto",
//     marginRight: "auto",
//   },
//   title: {
//     marginbottom: "4rem",
//     textAlign: "center",
//   },
//   jobscenter: {
//     width: "80vw",
//     margin: "0 auto",
//     maxWidth: "var(--max-width)",
//     flexDirection: "row",
//   },
//   btncontainer: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: "4rem",
//     flexWrap: "wrap",
//   },
//   jobbtn: {
//     background: "transparent",
//     borderColor: "transparent",
//     textTransform: "capitalize",
//     fontSize: "1.25rem",
//     letterSpacing: "var(--spacing)",
//     margin: "0 0.5rem",
//     transition: "var(--transition)",
//     cursor: "pointer",
//     padding: "0.25rem 0",
//     lineHeight: "1",
//     outlineColor: "var(--clr-primary-10)",
//     "&:hover": {
//       color: "var(--clr-primary-5)",
//       boxShadow: "0 2px var(--clr-primary-5)",
//     },
//   },
//   activebtn: {
//     color: "var(--clr-primary-5)",
//     boxShadow: "0 2px var(--clr-primary-5)",
//   },
//   jobinfo: {
//     fontWeight: "400",
//   },
//   divider: {
//     // Theme Color, or use css color in quote
//     background: "white",
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 350,
//   },
//   divContainer: {
//     display: "flex",
//     flexDirection: "row",
//   },
// }));

export default PaySummary;
