import React, { useState, useEffect } from "react";
// import { useNavigate, NavLink } from "react-router-dom";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import "./Task.css";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Popup from "./Popup";
import Sidebar from "../Sidebar/Sidebar";

function Task() {
  // const redirect = useNavigate();
  const [getUserData, setUserdata] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  const getData = async (e) => {
    const res = await fetch("/createtask", {
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
      setUserdata(data);
      // console.log("Get Data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <Sidebar/>
      <div className="tskms_task_mid">
        <div className="tskms_task_mid-top">
          <h2>Tasks</h2>
          <Button
            id="createtask"
            variant="contained"
            onClick={() => setOpenPopup(true)}
          >
            Create Task
          </Button>
        </div>
        <div className="tskms_task_mid-mid"> 
          <h4>All Tasks</h4>
        </div>
        <div className="Task_table">
          <TableContainer className="Table_main" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="Table_row">
                  <TableCell className="heading_text" align="center">
                    Task Name
                  </TableCell>
                  <TableCell className="heading_text" align="center">
                    Assigned to
                  </TableCell>
                  <TableCell className="heading_text" align="center">
                    Started on
                  </TableCell>
                  <TableCell className="heading_text" align="center">
                    Due Date
                  </TableCell>
                  <TableCell className="heading_text" align="center">
                    Progress
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getUserData.map((element, id) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell align="center" component="th" scope="row">
                          {element.taskName}
                        </TableCell>
                        <TableCell align="center">{element.assignTo}</TableCell>
                        <TableCell align="center">
                          {element.startedOn}
                        </TableCell>
                        <TableCell align="center">{element.dueDate}</TableCell>
                        <TableCell align="center">
                          <div className="running">
                              <AssignmentTurnedInIcon />
                            <p>
                              Assigned
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </>
  );
}

export default Task;
