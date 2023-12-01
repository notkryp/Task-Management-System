import React from "react";
import Sidebar from "./Sidebar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Details.css";
import { useNavigate } from "react-router-dom";
import Profile from "../../../Icons/profile.png";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

function details() {
  const history = useNavigate();
  const back = () => {
    history("/dashboard");
  };
  const [values, setValues] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const changeProfile = (e) => {
    e.preventDefault();
    const formData = new formData();
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowCurrentPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowNewPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const [newUser, setnewUser] = useState({
    employeeUsername: "",
    employeePassword: "",
  });

  const clg = (e) => {
    const { name, value } = e.target;
    setnewUser((newdata) => {
      return { ...newdata, [name]: value };
    });
  };

  return (
    <>
      <Sidebar />
      <div className="tskms_task_mid">
        <div className="tskms_task_mid-top">
          <ArrowBackIcon sx={{ p: 1 }} className="leftArrow" onClick={back} />
          <h2>Detail</h2>
        </div>
        <div className="allContent">
          <div className="wholeLeft">
            <div className="pic-left">
              <img src={Profile} className="profile5" />
            </div>
            <div className="pic-bottom">
            </div>
          </div>
          <div className="wholeRight">
            <h3 className="newName">Full Name : Abhishek Pokharel</h3>
            <h3 className="newName">Phone Number: 9841589007</h3>
            <h3 className="newName">Role : Admin</h3>
            <h3 className="newName">
              Designation: Cheif Executive Officer (CEO)
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default details;
