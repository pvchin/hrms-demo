import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

const CardLayout3 = ({ title, children, handleClick }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <div>
            {/* <IconButton aria-label="settings">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton aria-label="settings" onClick={handleClick}>
              <EditIcon />
            </IconButton>
          </div>
        }
        title={title}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500",
  },
  card: {
    margin: "15px 10px",
    padding: 0,
    border: "solid 1px black",
    borderRadius: "16px",
    backgroundColor: "dark",
  },
  small: {
    gridRowEnd: "span 26",
  },
  medium: {
    gridRowEnd: "span 33",
  },
  large: {
    gridRowEnd: "span 45",
  },
}));

export default CardLayout3;
