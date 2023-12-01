import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "../Notification/Notification.css";
import Button from "@mui/material/Button";
import NotiPopup from "./NotiPopup";
import { useState, useEffect } from "react";

function Notification() {
  const [open, setOpen] = useState(false);

  const [getNotiData, setGetNotiData] = useState([]);

  const getNoti = async (e) => {
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
    } else {
      setGetNotiData(data);
    }
  };
  useEffect(() => {
    getNoti();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="tskms_Notification-mid">
        <div className="tskms_Notification-midTop">
          <h2>Notification</h2>
          <Button
            id="createnotification"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Create notification
          </Button>
        </div>
        <div className="tskms_task_mid-mid">
          <h4>Notifications</h4>
        </div>
        {getNotiData.map((element, id) => {
          return (
            <>
              <div className="fullNoti">
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
      <NotiPopup open={open} setOpen={setOpen} />
    </>
  );
}

export default Notification;
