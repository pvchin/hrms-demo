import React from "react";
import { useRecoilState } from "recoil";
//import {  useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
//import DashboardMain from "./DashboardMain";
import DashboardMain from "./DashboardMain";
import { loginLevelState } from "./data/atomdata";
//import { useAuthContext } from "../context/auth_context";
//import { useEmployees } from "./employees/useEmployees";

const Main = () => {
  //const history = useHistory();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  //const { currentUser } = useAuthContext();
  //const [role, setRole] = useState("");
  // const SwitchCase = () => {
  //   //onsole.log(loginLevel);
  //   switch (loginLevel.loginLevel) {
  //     case "Staff":
  //       return <DashboardStaff />;
  //     case "Admin":
  //       return <DashboardAdmin />;
  //     case "OpsSpvr":
  //       return <DashboardOpsSpvr />;
  //     case "AdminManager":
  //       return <DashboardAdminManager />;
  //     case "Manager":
  //       return <DashboardManager />;
  //     case "Director":
  //       return <DashboardDirector />;
  //     default:
  //       return `You are not an authorised user!`;
  //   }
  // };

  if (!loginLevel.login) {
    return <LoginForm />;
  } else {
    return (
      <div>
        <DashboardMain />
      </div>
    );
  }
};

export default Main;
