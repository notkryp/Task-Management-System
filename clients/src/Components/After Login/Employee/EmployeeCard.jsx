import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EmployeeCard.css";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import defaultimg from "../../../Icons/default.png";
import Sidebar from "../Sidebar/Sidebar";

function EmployeeCard() {
  const { id } = useParams("");
  const history = useNavigate();
  console.log(id);

  const [detailEmployee, setDetailEmployee] = useState([]);
  // console.log(detailEmployee);
  const handlechange = async (e) => {
    // e.preventDefault();
    const res = await fetch(`/employee/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const employeeData = await res.json();
    // console.log(employeeData);
    if (res.status === 404 || !employeeData) {
      console.log("error");
    } else {
      setDetailEmployee(employeeData);
      console.log("Data is recieved");
    }
  };

  const goBack = () => {
    history("/employee");
  };

  useEffect(() => {
    handlechange();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="tskms_Dashboard-mid">
        <div className="tskms_Dashboard-midTop">
          <div className="head">
            <ArrowBackIcon className="Arrowleft" onClick={goBack}>
              close
            </ArrowBackIcon>
            <h3>Employee Full Details</h3>
          </div>

          <div className="allcontent">
            <div className="profilepic">
              <img src={defaultimg} alt="profilepic" id="profilepic" />
            </div>
            <div className="rightcontent">
              <div className="item6 firstCSS">
                <h4 className="secondCSS">Id : </h4>
                <span>{detailEmployee._id}</span>
              </div>
              <div className="item1 firstCSS">
                <h4 className="secondCSS">Full Name : </h4>
                <span>{detailEmployee.employeeName}</span>
              </div>
              <div className="item2 firstCSS">
                <h4 className="secondCSS">Contact Number : </h4>
                <span>{detailEmployee.employeePhone}</span>
              </div>
              <div className="item3 firstCSS">
                <h4 className="secondCSS">Email address : </h4>
                <span>{detailEmployee.employeeEmail}</span>
              </div>
              <div className="item4 firstCSS">
                <h4 className="secondCSS">Address : </h4>
                <span>{detailEmployee.employeeAddress}</span>
              </div>
              <div className="item5 firstCSS">
                <h4 className="secondCSS">Social Media : </h4>
                <span>{detailEmployee.employeeLink}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeCard;
