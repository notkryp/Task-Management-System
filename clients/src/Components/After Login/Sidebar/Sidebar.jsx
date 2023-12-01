import React from "react";
import { NavLink, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import tick from "../../../Icons/tick.png";
import Profile from "../../../Icons/profile.png";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import login from "../../Before Login/Login/Login";

function Sidebar({ children }) {
  const history = useNavigate();
  const routes = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <DashboardRoundedIcon />,
    },
    {
      path: "/task",
      name: "Task",
      icon: <FolderRoundedIcon />,
    },
    {
      path: "/employee",
      name: "Employee",
      icon: <GroupRoundedIcon />,
    },
    {
      path: "/history",
      name: "History",
      icon: <FileCopyRoundedIcon />,
    },
    {
      path: "/notification",
      name: "Notification",
      icon: <NotificationsActiveRoundedIcon />,
    },
  ];
  const handlerChange = () => {
    history("/dashboard/details");
  };

  const logout = () => {
    if (confirm("Are you sure, You want to logout?")) {
      true(history("/"));
    } else {
      false();
    }
  };

  return (
    <>
      <div className="tskms_sidebar">
        <div className="top-section">
          <img src={Profile} className="profile" onClick={handlerChange} />
          <p className="tskms_sidebar_top-section name">
            <h4> Abhishek</h4> <h6> Pokharel</h6>
            <img src={tick} />
          </p>
          <p className="tskms_sidebar_top-section designation">
            Chief Executive Officer
          </p>
        </div>
        <div className="tskms_sidebar-miniMenu">
          <section className="routes">
            {routes.map((route) => (
              <NavLink
                activeClassName={
                  window.location.pathname === route.path ? "active" : ""
                }
                to={route.path}
                key={route.name}
                className="links"
              >
                <div className="icon">{route.icon}</div>
                <div className="link-name">{route.name}</div>
              </NavLink>
            ))}
          </section>
        </div>
        <div className="logout">
          <Button onClick={logout} variant="contained" id="logout-btn">
            <LogoutIcon />
            Logout
          </Button>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
}

export default Sidebar;
