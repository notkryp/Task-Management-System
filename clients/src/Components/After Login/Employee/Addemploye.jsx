import React, { useState } from "react";
import "./Addemploye.css";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Addemploye(props) {
  const { openPopup, setOpenPopup } = props;
  const [employeeDetails, setemployeeDetails] = useState({
    employeeName: "",
    employeePhone: "",
    employeeEmail: "",
    employeeAddress: "",
    employeeLink: "",
    userName: "",
    password: "",
    employeePhoto: "",
  });

  const clg = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setemployeeDetails((newData) => {
      return { ...newData, [name]: value };
    });
  };

  const newEmployee = async (e) => {
    e.preventDefault();
    const {
      employeeName,
      employeePhone,
      employeeEmail,
      employeeAddress,
      employeeLink,
      userName,
      password,
      employeePhoto,
    } = employeeDetails;

    const res = await fetch("http://localhost:3001/employee", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        employeeName,
        employeePhone,
        employeeEmail,
        employeeAddress,
        employeeLink,
        userName,
        password,
        employeePhoto,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 404 || !data) {
      alert("Please Complete the Empty Fields");
    } else {
      alert("Employee has been added");
      setOpenPopup(false);
    }
  };

  return (
    <>
      <div className="employeeform">
        <Dialog open={openPopup}>
          <DialogTitle>
            <div className="title">
              <ArrowBackIcon
                className="leftArrow"
                onClick={() => setOpenPopup(false)}
              >
                close
              </ArrowBackIcon>

              <h3>Add an Employee</h3>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="detailform">
              <TextField
                className="detail_btn"
                name="employeeName"
                type="text"
                id="outlined-basic"
                label="Full Name"
                variant="outlined"
                onChange={clg}
                value={employeeDetails.employeeName}
              />
              <TextField
                className="detail_btn"
                name="employeePhone"
                type="number"
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                onChange={clg}
                value={employeeDetails.employeePhone}
              />

              <TextField
                className="detail_btn"
                name="employeeEmail"
                type="email"
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                onChange={clg}
                value={employeeDetails.employeeEmail}
              />

              <TextField
                className="detail_btn"
                name="employeeAddress"
                type="text"
                id="outlined-basic"
                label="Permanent Address"
                variant="outlined"
                onChange={clg}
                value={employeeDetails.employeeAddress}
              />

              <TextField
                className="detail_btn"
                name="employeeLink"
                type="text"
                id="outlined-basic"
                label="Social Media Link"
                variant="outlined"
                onChange={clg}
                value={employeeDetails.employeeLink}
              />

              <TextField
                className="detail_btn"
                name="userName"
                type="text"
                id="outlined-basic"
                label="Username"
                variant="outlined"
                onChange={clg}
                value={employeeDetails.userName}
              />

              <TextField
                className="detail_btn"
                name="password"
                type="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={clg}
                value={employeeDetails.password}
              />

              {/* <TextField
                className="detail_btn"
                name="employeePhoto"
                type="text"
                id="outlined-basic"
                label="Add a photo"
                variant="outlined"
                onChange={clg}
                value={employeeDetails.employeePhoto}
              /> */}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={newEmployee}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
      ;
    </>
  );
}

export default Addemploye;
