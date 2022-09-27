import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import clsx from "clsx";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { useRecoilState } from "recoil";
import { List } from "@material-ui/core";
import { loginLevelState } from "./data/atomdata";
import { useEmployees } from "./employees/useEmployees";
//import { useUser } from "./user/useUser";

//const drawerWidth = 240;

// const columns = [
//   {
//     title: "Name",
//     field: "name",
//     editable: "never",
//   },
//   {
//     title: "Work Permit No",
//     field: "workpermitno",
//     editable: "never",
//   },
//   {
//     title: "Work Permit Expiry",
//     field: "workpermit_expirydate",
//     type: "date",
//     dateSetting: { locale: "en-GB" },
//     editable: "never",
//   },
// ];

const WPExpiryViewStaff = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { employees } = useEmployees();
  //const { user } = useUser();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  //const [userdata, setUserdata] = useState([]);
  const today = Date().toLocaleString();

  // useEffect(() => {
  //   setFilter(user.id);
  // }, []);

  return (
    <List className={classes.root}>
      <Grid direction="row">
        <Stack direction="row">
          <Heading as="h4" size="md">
            Work Permit Expiry Within 90 days
          </Heading>
          <Spacer />
          <IconButton
            // variant="outline"
            size="md"
            aria-label="Edit"
            icon={<EditIcon />}
            onClick={() => navigate("/singleemployee")}
          />
        </Stack>
        {employees
          .filter(
            (i) =>
              differenceInDays(
                new Date(i.workpermit_expirydate),
                new Date(today)
              ) < 90 && i.id === loginLevel.loginUserId
          )
          .map((row) => {
            return (
              <Grid key={row.id} templateColumns="repeat(6, 1fr)" gap={3} p={1}>
                <GridItem colSpan={3}>
                  <Box w="100%">{row.workpermitno}</Box>
                </GridItem>

                <GridItem colSpan={3}>
                  <Box w="100%">{row.workpermit_expirydate}</Box>
                </GridItem>
              </Grid>
              // <ListItem key={row.id}>
              //   <Grid item sm={4} align="center">
              //     <ListItemText>{row.workpermitno}</ListItemText>
              //   </Grid>
              //   <Grid item sm={4} align="center">
              //     <ListItemText>{row.workpermit_expirydate}</ListItemText>
              //   </Grid>
              // </ListItem>
            );
          })}
      </Grid>
    </List>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));

export default WPExpiryViewStaff;
