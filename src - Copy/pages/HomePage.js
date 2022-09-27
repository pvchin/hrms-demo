import React from "react";
import { useRecoilState } from "recoil";
import { loginLevelState } from "../components/data/atomdata";
import HomeAdmin from "../components/HomeAdmin";
import HomeOpsSpvr from "../components/HomeOpsSpvr";
import HomeStaff from "../components/HomeStaff";
import HomeAdminManager from "../components/HomeAdminManager";
import HomeManager from "../components/HomeManager";
import HomeDirector from "../components/HomeDirector";

//const HomeStaff = React.lazy(() => import("../components/HomeStaff"));

const HomePage = () => {
  // const classes = useStyles();
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [loginLevel] = useRecoilState(loginLevelState);

const SwitchCase = () => {
 
  switch (loginLevel.loginLevel) {
    case "Staff":
      return <HomeStaff />;
    case "Admin":
      return <HomeAdmin />;
    case "OpsSpvr":
      return <HomeOpsSpvr />;
    case "AdminManager":
      return <HomeAdminManager />;
    case "Manager":
      return <HomeManager />;
    case "Director":
      return <HomeDirector />;
    default:
      return "You are not authorised user!";
  }
};

  return (
    <div>
      <SwitchCase />
    </div>
  );
};


export default HomePage;
