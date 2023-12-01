import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Employee.css";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Addemploye from "./Addemploye";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { NavLink, useNavigate } from "react-router-dom";

function Employee() {
  const history = useNavigate();
  const [getEmployee, setgetEmployee] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  const getData = async (e) => {
    const res = await fetch("/employee", {
      method: "GET",
      header: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    // console.log(data);
    if (res.status === 404 || !data) {
      alert("error");
    } else {
      setgetEmployee(data);
    }
  };

  const deleteUser = async (id) => {
    const res2 = await fetch(`/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    const deleteEmployee = await res2.json();
    console.log(deleteEmployee);

    if (res2.status === 404 || !deleteEmployee) {
      alert("Error");
    } else {
      alert("Employee is deleted");
      getData();
      history("/employee");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="tskms_employee-mid">
        <div className="tskms_employee-midTop">
          <h2>Employees</h2>
          <Button
            id="addEmployee"
            variant="contained"
            onClick={() => setOpenPopup(true)}
          >
            Add Employee
          </Button>
        </div>

        <div className="Task_table">
          <TableContainer className="Table_main" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="Table_row">
                  <TableCell className="heading_text" align="center">
                    Employee Name
                  </TableCell>
                  <TableCell className="heading_text" align="center">
                    Phone Number
                  </TableCell>
                  <TableCell className="heading_text" align="center">
                    Email
                  </TableCell>
                  <TableCell className="heading_text" align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getEmployee.map((element, id) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell align="center" component="th" scope="row">
                          {element.employeeName}
                        </TableCell>
                        <TableCell align="center">
                          {element.employeePhone}
                        </TableCell>
                        <TableCell align="center">
                          {element.employeeEmail}
                        </TableCell>
                        <div className="Action">
                          <TableCell align="center">
                            <NavLink to={`/employee/${element._id}`}>
                              <RemoveRedEyeIcon className="icons" />
                            </NavLink>
                            <NavLink
                              to={`/delete/${element.id}`}
                              onClick={() => deleteUser(element._id)}
                            >
                              <DeleteIcon className="icons" />
                            </NavLink>
                            
                          </TableCell>
                        </div>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Addemploye openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </>
  );
}

export default Employee;
