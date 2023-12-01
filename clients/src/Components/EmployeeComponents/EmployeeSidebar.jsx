import React from "react";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
// import "../After Login/Sidebar/Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Profile from "../../Icons/me.jpg";

// import profile from "../../../Icons/profile.png";

function EmployeeSidebar({ children }) {
  const history = useNavigate();
  const routes = [
    {
      path: "/employee/dashboard",
      name: "Dashboard",
      icon: <DashboardRoundedIcon />,
    },
    {
      path: "/employee/task",
      name: "Task",
      icon: <FolderRoundedIcon />,
    },
    {
      path: "/employee/notification",
      name: "Notification",
      icon: <NotificationsActiveRoundedIcon />,
    },
  ];

  const handlerChange = () => {
    history("/employees/detail");
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
            <h4>Abhishek</h4> <h6>Pokharel</h6>
          </p>
          <p className="tskms_sidebar_top-section designation">Employee</p>
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
          <Button variant="contained" id="logout-btn" onClick={logout}>
            <LogoutIcon />
            Logout
          </Button>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
}

export default EmployeeSidebar;
