import React, { useState, useEffect } from "react";
// import Mid from '../Dashboard/Mid'
import "../Dashboard/Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
// import { NavLink } from "react-router-dom";

function Dashboard() {
  const [employeeData, setemployeeData] = useState([]);
  const [notificationData, setnotificationData] = useState([]);
  const [taskData, settaskData] = useState([]);

  const getEmployeeData = async () => {
    const res = await fetch("/employee", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const recievedEmployeeData = await res.json();
    if (res.status === 404 || !recievedEmployeeData) {
      console.log("Error");
    } else {
      setemployeeData(recievedEmployeeData);
    }
  };

  const getTaskData = async () => {
    const res = await fetch("/createtask", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const recievedTaskData = await res.json();
    if (res.status === 404 || !recievedTaskData) {
      console.log("Error");
    } else {
      settaskData(recievedTaskData);
    }
  };

  const getData = async (e) => {
    const res = await fetch("/notification", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 404 || !data) {
      alert("error");
      console.log("error");
    } else {
      setnotificationData(data);
      // console.log("Get Data");
    }
  };

  useEffect(() => {
    getEmployeeData(), getData(), getTaskData();
  }, []);

  let len = employeeData.length;
  console.log(len);

  return (
    <>
      <Sidebar />
      <div className="tskms_Dashboard-mid">
        <div className="tskms_Dashboard-midTop">
          <h2>Overview</h2>
          <div className="boxes">
            <div className="boxOne employee">
              <h1>{len}</h1>
              <h3>Employees</h3>
            </div>
            <div className="boxOne tasks">
              <h1>{taskData.length}</h1>
              <h3>Tasks</h3>
            </div>
            <div className="boxOne date">
              <h1>300</h1>
              <h3> Working days</h3>
            </div>
          </div>
          <div className="allmidcontent">
            <div className="sectionTitle">
              <h2>Notifications</h2>
              {notificationData.map((element) => {
                return (
                  <>
                    <div className="fullNotismall">
                      <div className="Title Noti">
                        <h3>{element.notificationTitle}</h3>
                      </div>
                      <div className="body Noti">
                        <p>{element.notificationBody}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="rightContent">
              <h2>Employees List</h2>

              {employeeData.map((element) => {
                return (
                  <div className="employeeList">
                    <h5>{element.employeeName}</h5>
                  </div>
                );
              })}
            </div>
            ;
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
