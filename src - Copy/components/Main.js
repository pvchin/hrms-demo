import React from "react";
import { useRecoilState } from "recoil";
//import {  useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
//import DashboardMain from "./DashboardMain";
// import DashboardStaff from "./DashboardStaff";
// import DashboardAdmin from "./DashboardAdmin";
// import DashboardOpsSpvr from "./DashboardOpsSpvr";
// import DashboardAdminManager from "./DashboardAdminManager";
// import DashboardManager from "./DashboardManager";
// import DashboardDirector from "./DashboardDirector";
import { loginLevelState } from "./data/atomdata";
import DashboardMain from "./DashboardMain";
//import { useAuthContext } from "../context/auth_context";
//import { useEmployees } from "./employees/useEmployees";

const Main = () => {
  //const history = useHistory();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  //const { currentUser } = useAuthContext();
  //const [role, setRole] = useState("");
  // const SwitchCase = () => {
    
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
