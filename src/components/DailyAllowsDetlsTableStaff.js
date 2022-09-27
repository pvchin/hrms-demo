import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as emailjs from "emailjs-com";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
//import { useIsFetching } from "react-query";
import { TextField, Icon, Grid, Button } from "@material-ui/core";
//import { useDisclosure } from "@chakra-ui/react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useCustomToast } from "../helpers/useCustomToast";
import {
  loginLevelState,
  allowsDataState,
  //allowsDataDetlsState,
  empidState,
  allowsPeriodState,
  //allowsDataIdState,
  //siteallowsTotalsState,
} from "./data/atomdata";
//import { useDailyAllowancesContext } from "../context/dailyallowances_context";
//import { useAddDailyAllowsDetls } from "./dailyallowsdetls/useAddDailyAllowsDetls";
import { useUpdateDailyAllowsDetls } from "./dailyallowsdetls/useUpdateDailyAllowsDetls";
import { useDeleteDailyAllowsDetls } from "./dailyallowsdetls/useDeleteDailyAllowsDetls";
import { useDailyAllowsDetlsBatch } from "./dailyallowsdetls/useDailyAllowsDetlsBatch";
import { useDailyAllows } from "./dailyallows/useDailyAllows";
//import { useDailyAllowsDetls } from "./dailyallowsdetls/useDailyAllowsDetls";
import { useUpdateDailyAllows } from "./dailyallows/useUpdateDailyAllows";
import { AlertDialogBox } from "../helpers/AlertDialogBox";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICEID;
const TEMPLATE_ID = "template_1y8odlq";
const USER_ID = process.env.REACT_APP_EMAILJS_USERID;

const initial_totals = [
  {
    totalamount: 0,
    totalbonus: 0,
    totaldiem: 0,
    totaldays: 0,
  },
];

export default function DailyAllowsDetlsTableStaff() {
  let navigate = useNavigate();
  const toast = useCustomToast();
  const classes = useStyles();
  //const isFetching = useIsFetching();
  //const { dailyallowsdetls } = useDailyAllowsDetls()
  const { dailyallows, setDailyAllowsId } = useDailyAllows();
  const {
    dailyallowsdetls,
    setDailyAllowsDetlsId,
    setDailyAllowsDetlsPeriod,
    //isLoading,
  } = useDailyAllowsDetlsBatch();
  //const addDailyAllowsDetls = useAddDailyAllowsDetls();
  const updateDailyAllowsDetls = useUpdateDailyAllowsDetls();
  const deleteDailyAllowsDetls = useDeleteDailyAllowsDetls();
  const updateDailyAllows = useUpdateDailyAllows();

  // const [allowsDetlsTable, setAllowsDetlsTable] =
  // useRecoilState(allowsDataDetlsState);
  //console.log("detlstable", );
  //const [allowsDetlsdata, setAllowsDetilsdata] = useRecoilStateLoadable(fetchDailyAllowsDetlsSelector);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  // const [allowsDetlsdata, setAllowsDetlsdata] =
  //   useRecoilState(allowsDataDetlsState);
  const allows_period = useRecoilValue(allowsPeriodState);
  const allows_empid = useRecoilValue(empidState);
  // const [siteallowsTotals, setSiteAllowsTotals] = useRecoilState(
  //   siteallowsTotalsState
  // );
  const [allowsdata, setAllowsdata] = useRecoilState(allowsDataState);
  //const [allowsdataId, setAllowsdataId] = useState(allowsDataIdState);
  //const [tabledeldata, setTableDelData] = useState({});
  //const [isCalc, setIsCalc] = useState(false);
  //const [isBuild, setIsBuild] = useState(false);
  const [totals, setTotals] = useState({ initial_totals });
  const [isSubmitAlertOpen, setIsSubmitAlertOpen] = useState(false);
  const [isExitAlertOpen, setIsExitAlertOpen] = useState(false);
  //const [dailyallowsdata, setDailyAllowsData] = useState({});
  //const totalsValues = Object.values(totals).join("");
  //const [isRowIndex, setIsRowIndex] = useState("");

  // const {
  //   //dailyallowances,
  //   //dailyallowsdetls,
  //   loadEmpDailyAllowsDetls,
  //   updateDailyAllowance,
  //   //updateDailyAllowsDetl,
  //   //deleteDailyAllowsDetl,
  //   dailyallowsdetl_loading,
  //   dailyallowsdetl_error,
  // } = useDailyAllowancesContext();

  const columns = useMemo(() => [
    {
      title: "Date",
      field: "date",
      type: "date",
      dateSetting: { locale: "en-GB" },
      // editable: "never",
      cellStyle: {
        width: 120,
        maxWidth: 120,
      },
      editComponent: (props) => (
        <TextField
          defaultValue={props.value || null}
          onChange={(e) => props.onChange(e.target.value)}
          type="date"
        />
      ),
    },
    // { title: "District", field: "district" },
    { title: "Operation Type", field: "typeoperation" },
    { title: "Client", field: "client" },
    { title: "Location/Rig", field: "location" },
    { title: "Ticket No/Job No", field: "jobno" },
    { title: "Operation Role", field: "crewoperation" },
    {
      title: "Job Bonus",
      field: "jobbonus",
      type: "currency",
      cellStyle: {
        width: 8,
        maxWidth: 8,
      },
      headerStyle: {
        width: 8,
        maxWidth: 8,
      },
    },
    {
      title: "Per Diem",
      field: "perdiem",
      type: "currency",
      cellStyle: {
        width: 8,
        maxWidth: 8,
      },
      headerStyle: {
        width: 8,
        maxWidth: 8,
      },
    },
    // { title: "Delete", field: "isdelete", type: "boolean" },
  ],[]);

  useEffect(() => {
    setDailyAllowsId(allows_empid);
    setDailyAllowsDetlsId(allows_empid);
    setDailyAllowsDetlsPeriod(allows_period);
    // setTimeout(() => {
    //   setTotals((prevState) => ({
    //     totalamount: dailyallows.amount,
    //     totalbonus: dailyallows.totaljobbonus,
    //     totaldiem: dailyallows.totalperdiem,
    //     totaldays: dailyallows.no_of_days,
    //   }));
    // }, 3000);
  }, [allows_empid, allows_period]);

  // useEffect(() => {
  //  if (allowsdata) {
  //     handle_tempcalc();
  //     setIsCalc(false);
  //   }
  // }, [isCalc]);

  const handleSentEmail = (data) => {
    const { period } = data;
    //console.log("expense form", loginLevel);
    var emaildata = {
      to_name: loginLevel.loginUser,
      to_email: loginLevel.loginEmail,
      message: `Your site allowances for the period ${period} has been successfully submitted for approval`,
      cc_to: loginLevel.reporting_email,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, emaildata, USER_ID).then(
      function (response) {
        console.log(response.status, response.text);
        toast({
          title: `Email has sent successfully to ${emaildata.to_email}!`,
          status: "success",
        });
      },
      function (err) {
        console.log(err);
        toast({
          title: `Email has fail to send to ${emaildata.to_email}!`,
          status: "warning",
        });
      }
    );
  };

  // const build_dailyallowsdata = () => {
  //   const { id, jobbonus, perdiem } = dailyallowsdetls;
  //   const data = dailyallowsdetls
  //     .filter((r) => r.period === allows_period && r.empid === allows_empid)
  //     .map((rec) => {
  //       return rec.id, rec.jobbonus, rec.perdiem;
  //     });
  //   setDailyAllowsData(data);
  //   console.log("dailydata", dailyallowsdata);
  // };

  const update_AllowsDetls = (data, index) => {
    const allowsdata = dailyallowsdetls;
    const { id, rec_id, tableData, ...fields } = data;
    updateDailyAllowsDetls({ id, ...fields });

    //recalc
    allowsdata[index].jobbonus = data.jobbonus;
    allowsdata[index].perdiem = data.perdiem;
    handle_tempcalc(allowsdata);
    //save_siteallows();
  };

  // const save_siteallows = () => {
  //   const { id } = allowsdata;

  //   updateDailyAllows({
  //     id: id,
  //     ...allowsdata,
  //     no_of_days: totals.totaldays,
  //     amount: totals.totalamount,
  //     totaljobbonus: totals.totalbonus,
  //     totalperdiem: totals.totaldiem,
  //   });
  // };

  // const save_AllowsDetls = (e) => {
  //   e.preventDefault();
  //   // handle calc
  //   //handle_calc();

  //   //save allows data details
  //   const { id } = allowsdata;

  //   updateDailyAllows({
  //     id: id,
  //     ...allowsdata,
  //     no_of_days: totals.totaldays,
  //     amount: totals.totalamount,
  //     totaljobbonus: totals.totalbonus,
  //     totalperdiem: totals.totaldiem,
  //   });
  //   toast({
  //     title: "Site Allowances table being saved!",
  //     status: "success",
  //   });
  // };

  const submit_AllowsDetls = (e) => {
    e.preventDefault();
    handleSubmitAlertOpen();
  };

  const exit_AllowsDetls = (e) => {
    e.preventDefault();
    handleExitAlertOpen();
  };

  const handleOnSubmitConfirm = () => {
    //save allows data details
    const { id } = allowsdata;
    updateDailyAllows({
      id: id,
      ...allowsdata,
      no_of_days: totals.totaldays,
      amount: totals.totalamount,
      totaljobbonus: totals.totalbonus,
      totalperdiem: totals.totaldiem,
      status: "Submitted",
    });
    handleSentEmail(allowsdata);
    navigate("/dailyallowancesstaff");
    toast({
      title: "Site Allowances table being submitted!",
      status: "success",
    });
  };

  const handleOnExitConfirm = () => {
    //save allows data details
    // const { id } = allowsdata;
    // updateDailyAllows({
    //   id: id,
    //   ...allowsdata,
    //   no_of_days: totals.totaldays,
    //   amount: totals.totalamount,
    //   totaljobbonus: totals.totalbonus,
    //   totalperdiem: totals.totaldiem,
    // });
    navigate("/dailyallowancesstaff");
    // toast({
    //   title: "Site Allowances table being submitted!",
    //   status: "success",
    // });
  };

  const handleSubmitAlertOpen = () => {
    setIsSubmitAlertOpen(true);
  };

  const handleSubmitAlertClose = () => {
    setIsSubmitAlertOpen(false);
  };

  const handleExitAlertOpen = () => {
    setIsExitAlertOpen(true);
  };

  const handleExitAlertClose = () => {
    setIsExitAlertOpen(false);
  };

  // const handle_calc = () => {
  //   if (dailyallowsdetls) {
  //     const totbonus = dailyallowsdetls
  //       .filter((r) => r.period === allows_period && r.empid === allows_empid)
  //       .reduce((acc, item) => {
  //         if (isNaN(item.jobbonus)) {
  //           return acc;
  //         } else {
  //           return acc + item.jobbonus;
  //         }
  //       }, 0);
  //     const totdiem = dailyallowsdetls
  //       .filter((r) => r.period === allows_period && r.empid === allows_empid)
  //       .reduce((acc, item) => {
  //         if (isNaN(item.perdiem)) {
  //           return acc;
  //         } else {
  //           return acc + item.perdiem;
  //         }
  //       }, 0);
  //     const totdays = dailyallowsdetls
  //       .filter((r) => r.period === allows_period && r.empid === allows_empid)
  //       .reduce((acc, item) => {
  //         let val = 0;
  //         if (item.jobbonus > 0 || item.perdiem > 0) {
  //           val = 1;
  //         } else {
  //           val = 0;
  //         }
  //         return acc + val;
  //       }, 0);
  //     const total = totbonus + totdiem;

  //     setTimeout(() => {
  //       setTotals({
  //         totalamount: total,
  //         totalbonus: totbonus,
  //         totaldiem: totdiem,
  //         totaldays: totdays,
  //       });
  //     }, 3000);
  //     console.log("calc", totdays, totals);
  //   }
  // };

  const handle_tempcalc = (allowsdata) => {
    if (allowsdata) {
      const totbonus = allowsdata
        .filter((r) => r.period === allows_period && r.empid === allows_empid)
        .reduce((acc, item) => {
          if (isNaN(item.jobbonus)) {
            return acc;
          } else {
            return acc + item.jobbonus;
          }
        }, 0);
      const totdiem = allowsdata
        .filter((r) => r.period === allows_period && r.empid === allows_empid)
        .reduce((acc, item) => {
          if (isNaN(item.perdiem)) {
            return acc;
          } else {
            return acc + item.perdiem;
          }
        }, 0);
      const totdays = allowsdata
        .filter((r) => r.period === allows_period && r.empid === allows_empid)
        .reduce((acc, item) => {
          let val = 0;
          if (item.jobbonus > 0 || item.perdiem > 0) {
            val = 1;
          } else {
            val = 0;
          }
          return acc + val;
        }, 0);
      const total = totbonus + totdiem;

      const data = dailyallows
        .filter((r) => r.period === allows_period && r.empid === allows_empid)
        .map((rec) => {
          return { ...rec };
        });

      updateDailyAllows({
        id: data[0].id,
        no_of_days: totdays,
        amount: total,
        totaljobbonus: totbonus,
        totalperdiem: totdiem,
      });
      // setTimeout(() => {
      //   setTotals({
      //     totalamount: total,
      //     totalbonus: totbonus,
      //     totaldiem: totdiem,
      //     totaldays: totdays,
      //   });
      // }, 3000);
      // console.log("tempcalc", totdays, totals);
    }
  };

  // const update_SiteAllowsTotals = () => {
  //   setSiteAllowsTotals({
  //     totalamount: totals.totalamount,
  //     totalbonus: dailyallowsdetls.reduce((acc, item) => {
  //       if (isNaN(item.jobbonus)) {
  //         return acc;
  //       } else {
  //         return acc + item.jobbonus;
  //       }
  //     }, 0),
  //     totaldiem: totals.totaldiem,
  //     totaldays: dailyallowsdetls.reduce((acc, item) => {
  //       let val = 0;
  //       if (item.jobbonus > 0 || item.perdiem > 0) {
  //         val = 1;
  //       } else {
  //         val = 0;
  //       }
  //       return acc + val;
  //     }, 0),
  //   });
  //   console.log("update", siteallowsTotals);
  // };

  // const add_DailyAllowsDetl = async (data) => {
  //   console.log("add", data);
  //   const { description, amount } = data;
  //   addDailyAllowsDetl({
  //     description: description,
  //     amount: amount,
  //     name: single_dailyallowance.name,
  //     empid: single_dailyallowance.empid,
  //     period: dailyallowance_period,
  //   });
  // };

  const delete_AllowsDetl = (data, index) => {
    const allowsdata = dailyallowsdetls;
    const { id } = data;
    deleteDailyAllowsDetls(id);
    // toast({
    //   title: "Site Allowances details record being deleted!",
    //   status: "warning",
    // });
    //recalc
    allowsdata.splice(index, 1);
    handle_tempcalc(allowsdata);
  };

  //  setAllowsDetlsdata(dailyallowsdetls);

  // console.log("load allows detls", allowsDetlsdata);
  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "75%", paddingTop: "5px" }}>
        {/* <h2>Site Allows Detils Table</h2> */}
        <MaterialTable
          columns={columns}
          data={dailyallowsdetls}
          title="Daily Allowances Details"
          editable={{
            // onRowAdd: (newData) =>
            //   new Promise((resolve, reject) => {
            //     // setTimeout(() => {
            //     //   setAllowsdata([...allowsdata, newData]);
            //     //   resolve();
            //     // }, 1000);
            //   }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...dailyallowsdetls];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  //setDailyAllowsData([...dataUpdate]);

                  update_AllowsDetls(newData, index);
                  //handle_calc();
                  //setAllowsDetlsTable([...dataUpdate]);
                  //editable = dataUpdate;
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  //const dataDelete = [...allowsDetlsTable];
                  const index = oldData.tableData.id;
                  delete_AllowsDetl(oldData, index);
                  //dataDelete.splice(index, 1);
                  //setAllowsDetlsTable([...dataDelete]);

                  resolve();
                }, 1000);
              }),
          }}
          options={{
            filtering: true,
            selection: false,
            pageSize: 10,
            headerStyle: {
              backgroundColor: "orange",
              color: "primary",
            },
            showTitle: true,
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ padding: "5px 10px" }}>
                  {/* <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={(e) => delete_AllowsDetls(e)}
                    >
                      delete
                    </Button> */}
                  {/* <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={(e) => handle_refresh(e)}
                  >
                    re-fresh
                  </Button> */}
                  {/* <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={(e) => handle_calc(e)}
                  >
                    re-calc
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={(e) => save_AllowsDetls(e)}
                  >
                    Update all
                  </Button> */}
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={(e) => submit_AllowsDetls(e)}
                  >
                    Submit <Icon className={classes.rightIcon}>send</Icon>
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={(e) => exit_AllowsDetls(e)}
                  >
                    Exit
                  </Button>

                  <div>
                    <Grid
                      container
                      spacing={0}
                      direction="row"
                      style={{ border: "1px solid white" }}
                    >
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <TextField
                          label="Total Job Bonus"
                          variant="filled"
                          style={{ width: "100%" }}
                          name="totalbonus"
                          value={
                            dailyallows &&
                            dailyallows
                              .filter(
                                (r) =>
                                  r.period === allows_period &&
                                  r.empid === allows_empid
                              )
                              .map((rec) => {
                                return rec.totaljobbonus;
                              })
                          }
                          type="currency"
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        ></TextField>
                        <TextField
                          label="Total Diem"
                          variant="filled"
                          style={{ width: "100%" }}
                          name="totaldiem"
                          value={
                            dailyallows &&
                            dailyallows
                              .filter(
                                (r) =>
                                  r.period === allows_period &&
                                  r.empid === allows_empid
                              )
                              .map((rec) => {
                                return rec.totalperdiem;
                              })
                          }
                          type="currency"
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        ></TextField>

                        <TextField
                          label="No of Days"
                          variant="filled"
                          style={{ width: "100%" }}
                          name="totaldays"
                          value={
                            dailyallows &&
                            dailyallows
                              .filter(
                                (r) =>
                                  r.period === allows_period &&
                                  r.empid === allows_empid
                              )
                              .map((rec) => {
                                return rec.no_of_days;
                              })
                          }
                          type="numeric"
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        ></TextField>
                        <TextField
                          label="Total Amount"
                          variant="filled"
                          style={{ width: "100%" }}
                          name="totalamount"
                          value={
                            dailyallows &&
                            dailyallows
                              .filter(
                                (r) =>
                                  r.period === allows_period &&
                                  r.empid === allows_empid
                              )
                              .map((rec) => {
                                return rec.amount;
                              })
                          }
                          type="currency"
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        ></TextField>
                      </div>
                    </Grid>
                  </div>
                </div>
              </div>
            ),
          }}
        />
      </div>
      <div>
        <AlertDialogBox
          onClose={handleSubmitAlertClose}
          onConfirm={handleOnSubmitConfirm}
          isOpen={isSubmitAlertOpen}
          title="Site Allowances Batch"
        >
          <h2>After submition for approval, no changes can be made.</h2>
          <h2>Are you sure you want to submit ?</h2>
        </AlertDialogBox>
      </div>
      <div>
        <AlertDialogBox
          onClose={handleExitAlertClose}
          onConfirm={handleOnExitConfirm}
          isOpen={isExitAlertOpen}
          title="Site Allowances Batch"
        >
          <h2>Are you sure you want to exit ?</h2>
        </AlertDialogBox>
      </div>
      {/* <div>
        <AlertDialogBox
          onClose={onAlertDeleteClose}
          onConfirm={handleOnAlertDeleteConfirm}
          isOpen={isAlertDeleteOpen}
          title="Site Allowances Batch"
        >
          <h2>Are you sure you want to delete {isRowIndex} ?</h2>
        </AlertDialogBox>
      </div> */}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    width: 1500,
  },
  button: {
    margin: theme.spacing(1),
  },
}));
