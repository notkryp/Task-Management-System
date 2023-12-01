import React, { useState } from "react";
import "./Login.css";
import logo from "../../../Icons/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

function EmployeeLogin({setEmployeeUser}) {
  const history = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginAsAdmin = () => {
    history("/");
  };

  const loginEmployee = () => {
    axios.post("/employee/login", user).then((res) => {
      alert(res.data.message);
      setEmployeeUser(res.data.user);
      history("/employee/dashboard");
    });
  };

  return (
    <>
      <div className="tskms_login-container">
        <div className="tskms_login-container-left">
          <img src={logo} alt="logo" />
        </div>
        <div className="tskms_login-container-right">
          <p>Login for Employee</p>
          <form>
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handlechange}
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handlechange}
              placeholder="Password"
            />

            <h5>Forgot Password?</h5>
            {/* <NavLink to={"/dashboard"}> */}
          </form>
          <Button
            className="tskms_login-right-btn"
            variant="contained"
            sx={{
              width: "33ch",
              height: "5ch",
              mb: 1,
              backgroundColor: "#00abc5",
            }}
            onClick={loginEmployee}
          >
            Login
          </Button>
          {/* <Button
            className="tskms_login-employee"
            variant="contained"
            sx={{ width: "33ch", height: "5ch", backgroundColor: "#00abc5" }}
            onClick={loginAsAdmin}
          >
            Login as Admin
          </Button> */}
          <div></div>
          {/* </NavLink> */}
        </div>
      </div>
    </>
  );
}

export default EmployeeLogin;
