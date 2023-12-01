import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../../Icons/logo.png";
import { useNavigate, useParams, NavLink, Navigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

function Login({ setusers }) {
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

  const loginData = async (e) => {
    const res = await fetch("/employee", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    if (!data) {
      alert("error");
    } else {
      setRole(data);
      console.log(data);
    }
  };

  useEffect(() => {
    loginData();
  }, []);

  const login = () => {
    axios.post("login", user).then((res) => {
      alert(res.data.message);
      setusers(res.data.user);
      history("/dashboard");
      // if (res.status === 200) {
      //   history("/dashboard");
      //   console.log("logged in");
      //   alert("logged in");
      // } else {
      //   alert("ok");
      // }
    });
  };

  const goToEmployeeLogin = ()=>{
    history('/employee/login')
  }

  return (
    <>
      <div className="tskms_login-container">
        <div className="tskms_login-container-left">
          <img src={logo} alt="logo" />
        </div>
        <div className="tskms_login-container-right">
          <p>Login</p>
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
            onClick={login}
            variant="contained"
            sx={{width:'33ch', height:'5ch', mb:1, backgroundColor:'#00abc5'}}
          >
            Login
          </Button>
          {/* <Button
            className="tskms_login-employee"
            variant="contained"
            sx={{width:'33ch', height:'5ch',  backgroundColor:'#00abc5'}}
            onClick={goToEmployeeLogin}
          >
            Login as Employee
          </Button> */}
          <div></div>
          {/* </NavLink> */}
        </div>
      </div>
    </>
  );
}

export default Login;
