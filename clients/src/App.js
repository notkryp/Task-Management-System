import "./App.css";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Components/After Login/Dashboard/Dashboard";
import Task from "./Components/After Login/Task/Task";
import Employee from "./Components/After Login/Employee/Employee";
import History from "./Components/After Login/History/History";
import Notification from "./Components/After Login/Notification/Notification";
import Popup from "./Components/After Login/Task/Popup";
import Addemploye from "./Components/After Login/Employee/Addemploye";
import Login from "./Components/Before Login/Login/Login";
import { useState} from "react";
import EmployeeDashboard from "./Components/EmployeeComponents/EmployeeDashboard";
import EmployeeNotification from "./Components/EmployeeComponents/EmployeeNotification";
import NotiPopup from "./Components/After Login/Notification/NotiPopup";
import Details from "./Components/After Login/Sidebar/Details";
import EmployeeCard from "./Components/After Login/Employee/EmployeeCard";
import EmployeeOwnDetails from "./Components/EmployeeComponents/EmployeeOwnDetails";
import EmployeeOwnTask from "./Components/EmployeeComponents/EmployeeOwnTask";
import EmployeeLogin from "./Components/Before Login/Login/EmployeeLogin";

function App() {
  const [user, setusers] = useState({});
  const [employeeUser, setEmployeeUser] = useState({});

  return (
    /*
 if(user && user._id && role.role == "admin"){
       (<Navigate to = "/dashboard")}
    }else if(user && user._id && role.role='employee'){
      (Navigate to ="/employee/:id/dashboard")
    } else (<login)
    */
    <>
      <Routes>
        <Route
          path="/"
          element={
            user && user._id ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setusers={setusers} />
            )
          }
        />
        <Route
          path="/employee/login"
          element={
            employeeUser && employeeUser._id ? (
              <Navigate to="/employee/dashboard" />
            ) : (
              <EmployeeLogin setEmployeeUser={setEmployeeUser} />
            )
          }
        />
        <Route path="/login" element={<Login setusers={setusers} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/task" element={<Task />} />
        <Route path="/createtask" element={<Popup />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/history" element={<History />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/notification/create" element={<NotiPopup />} />
        <Route path="/employee" element={<Addemploye />} />
        <Route exact path="/dashboard/details" element={<Details />} />
        <Route path="/employee/:id" element={<EmployeeCard />} />

        <Route path="/employee" element={<EmployeeLogin setEmployeeUser={setEmployeeUser} />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employees/detail" element={<EmployeeOwnDetails />} />
        <Route path="/employee/task" element={<EmployeeOwnTask />} />

        <Route
          path="/employee/notification"
          element={<EmployeeNotification />}
        />
      </Routes>
    </>
  );
}

export default App;
