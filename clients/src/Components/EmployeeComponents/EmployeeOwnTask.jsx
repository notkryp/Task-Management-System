import React, { useEffect, useState } from "react";
import EmployeeSidebar from "./EmployeeSidebar";
import "./EmployeeOwnTask.css";
import { Button } from "@mui/material";

function EmployeeOwnTask() {
  const [getTask, setGetTask] = useState([]);
  const [getEmployee, setGetEmployee] = useState([]);
  const [ownTask, setOwnTask] = useState("");

  // const gettingTask = async () => {
  //   const res = await fetch("/createtask", {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   });

  //   const recievedTask = await res.json();
  //   if (res.status === 404 || !recievedTask) {
  //     alert("Error");
  //   } else {
  //     setGetTask(recievedTask);
  //   }
  // };

  // const gettingEmployee = async () => {
  //   const res = await fetch("/employee", {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   });

  //   const recievedEmployeeData = await res.json();
  //   if (res.status === 404 || !data) {
  //     alert("error");
  //   } else {
  //     setGetEmployee(recievedEmployeeData);
  //     console.log(recievedEmployeeData);
  //   }
  // };

  const gettingOwnTask = async () => {
    const res = await fetch("/employee/taskdata", {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    const recievedOwnTask = await res.json();
    setOwnTask(recievedOwnTask);
    console.log(recievedOwnTask);
  };

  useEffect(() => {
    // gettingTask();
    // gettingEmployee();
    gettingOwnTask();
  }, []);

  return (
    <>
      <EmployeeSidebar />
      <div className="tskms_Dashboard-mid">
        <div className="tskms_Dashboard-midTop">
          <h2>Tasks</h2>
          <div className="tskms_task_mid-mid">
            <h4>All Tasks</h4>
          </div>
          {ownTask.map((element) => {
            return (
              <>
                <div className="taskdetails">
                  <h5 id="newp">Task Name</h5>
                  <p id="description">{element.taskName}</p>
                  <h5 id="newp">Task Description</h5>
                  <p id="description">{element.taskDescription}</p>
                  <div className="timeview">
                    <h5 id="nextp">Recieved at</h5>
                    <p id="timedescription">{element.startedOn}</p>
                    <h5 id="nextp2">Due Date</h5>
                    <p id="timedescription">{element.dueDate}</p>
                  </div>
                  <div className="buttonsAll">
                    <Button className="starttask" variant="contained">
                      Submit
                    </Button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default EmployeeOwnTask;
