import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./NotiPopup.css";
import { useNavigate } from "react-router-dom";

function NotiPopup(props) {
  const { open, setOpen } = props;
  const [notiData, setNotiData] = useState({
    notificationTitle: "",
    notificationBody: "",
  });

  const changeValue = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setNotiData((data) => {
      return { ...data, [name]: value };
    });
  };

  const changeHandle = async (e) => {
    e.preventDefault();
    const { notificationTitle, notificationBody } = notiData;

    const res = await fetch("http://localhost:3001/notification", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        notificationTitle,
        notificationBody,
      }),
    });

    const notifiData = await res.json();
    console.log(notifiData);
    if (res.status === 404 || !notifiData) {
      alert("please Complete the Empty Fields");
    } else {
      alert('Notification Sent to all Employees')
      // window.location.reload(true);
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>
          <div className="NotiTitle">
            <ArrowBackIcon className="leftArrow" onClick={() => setOpen(false)}>
              Close
            </ArrowBackIcon>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="notiForm">
            <TextField
              sx={{ m: 1, minWidth: 500 }}
              className="notiFormBtn"
              type="text"
              label="Title"
              variant="outlined"
              onChange={changeValue}
              name="notificationTitle"
              value={notiData.notificationTitle}
            />

            <TextField
              sx={{ m: 1, minWidth: 500 }}
              className="notiFormBtn"
              name="notificationBody"
              type="text"
              label="Body"
              id="outlined-multiline-flexible"
              multiline
              onChange={changeValue}
              value={notiData.notificationBody}
            />
            {/* 
            <div>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Select Employee
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={drop}
                  onChange={handleChange}
                  autoWidth
                  label="Select Employee"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Twenty Nine</MenuItem>
                  <MenuItem value={21}>Twenty one</MenuItem>
                  <MenuItem value={22}>Twenty one and a half</MenuItem>
                </Select>
              </FormControl>
            </div>

            <TextField
              className="notiFormBtn"
              name="Fullname"
              type="text"
              label="Title"
              variant="outlined"
              // onChange={}
              // value=
            /> */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={changeHandle}>Send</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NotiPopup;
