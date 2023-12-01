import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import "./Popup.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import FileUploader from "../../File Uploader/FileUploader";

function Popup(props) {
  const history = useNavigate();
  const { openPopup, setOpenPopup } = props;
  const [employeeName, setEmployeeName] = useState({
    taskName: "",
    assignTo: "",
    startedOn: new Date(),
    dueDate: new Date(),
    taskDescription: "",
    requiredFiles: "",
  });

  const clgdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setEmployeeName((newData) => {
      return { ...newData, [name]: value };
    });
  };

  const changeStartDate = (newValue) => {
    setEmployeeName((prev) => {
      return { ...prev, startedOn: newValue };
    });
  };

  const changeDueDate = (newValue) => {
    setEmployeeName((prev) => {
      return { ...prev, dueDate: newValue };
    });
  };

  const createTask = async (e) => {
    e.preventDefault();
    const {
      taskName,
      assignTo,
      startedOn,
      dueDate,
      taskDescription,
      requiredFiles,
    } = employeeName;
    const res = await fetch("http://localhost:3001/createtask", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        taskName,
        assignTo,
        startedOn,
        dueDate,
        taskDescription,
        requiredFiles,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 404 || !data) {
      alert("Please Complete the Empty Fields");
    } else {
      alert(`Task has been assigned to the employee`);
      setOpenPopup(false);
      history("/task");
    }
  };

  const [getEmployee, setgetEmployee] = useState([]);
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
      console.log(data);
    }
  };

  const [files, setFiles] = useState([
    {
      name: "myfile.pdf",
    },
  ]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Dialog open={openPopup}>
        <DialogTitle>
          <div className="title">
            <ArrowBackIcon
              className="leftArrow"
              onClick={() => setOpenPopup(false)}
            >
              close
            </ArrowBackIcon>

            <h3>Create a task</h3>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="form">
            <TextField
              className="form-btn"
              name="taskName"
              type="text"
              id="outlined-basic"
              label="Task Title"
              variant="outlined"
              onChange={clgdata}
              value={employeeName.taskName}
            />

            {/* <TextField
              sx={{ mb: 1 }}
              name="assignTo"
              type="text"
              onChange={clgdata}
              value={employeeName.assignTo}
              className="form-btn"
              id="outlined-basic"
              label="Select an Employee"
            ></TextField> */}

            <FormControl sx={{ mt: 1, mb: 1, width: 500 }}>
              <InputLabel id="demo-simple-select-label">Assign to</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={employeeName.assignTo}
                label="Assign to"
                onChange={clgdata}
                name="assignTo"
              >
                {getEmployee.map((element) => (
                  <MenuItem value={element.employeeName}>
                    {element.employeeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={1}>
                <DatePicker
                  sx={{ m: 4 }}
                  name="startedOn"
                  minDate={new Date()}
                  className="form-btn startedOn"
                  label="Started On"
                  type="date"
                  value={employeeName.startedOn}
                  onChange={changeStartDate}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  className="startedOff"
                  minDate={new Date()}
                  id="dueDate"
                  name="dueDate"
                  label="Due Date"
                  value={employeeName.dueDate}
                  onChange={changeDueDate}
                  renderInput={(params) => <TextField {...params} />}
                />

                <TextField
                  sx={{ mb: 1 }}
                  className="form-btn"
                  id="outlined-basic"
                  label="Task Description"
                  variant="outlined"
                  name="taskDescription"
                  type="text"
                  onChange={clgdata}
                  value={employeeName.taskDescription}
                />
              </Stack>
            </LocalizationProvider>
            {/* <TextField
              sx={{ mb: 1 }}
              className="form-btn"
              id="outlined-basic"
              label="Required Files"
              variant="outlined"
              name="requiredFiles"
              type="text"
              onChange={clgdata}
              value={employeeName.requiredFiles}
            /> */}

          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={createTask}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Popup;
