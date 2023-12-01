const express = require("express");
const router = express.Router();
const createTask = require("../Models/userSchema");
const employeeDetails = require("../Models/EmployeeDetails");
const notification = require("../Models/Notification");
const cors = require("cors");
const app = express();
const { addEmployee, employeeLogin } = require("../utils/Auth");
const { upload } = require("../helpers/filehelper");
const { singleFileUpload } = require("../controllers/fileUploadController");
const { newtask } = require("../controllers/createTaskController");

app.use(cors());

router.post("/createtask", async (req, res) => {
  // console.log(req.body);

  const { taskName, assignTo, startedOn, dueDate, taskDescription } = req.body;

  if (!taskName || !assignTo || !taskDescription || !startedOn || !dueDate) {
    res.status(404).json("Please Complete the Empty Fields");
  } else {
    const newTask = new createTask({
      taskName,
      assignTo,
      startedOn,
      dueDate,
      taskDescription,
    });

    await newTask.save();
    res.status(201).json(newTask);
    console.log(newTask);
  }
});

//get user data
router.get("/createtask", async (req, res) => {
  try {
    const userData = await createTask.find();
    res.status(201).json(userData);
    console.log(userData);
  } catch (error) {
    res.status(404).json(error);
  }
});

//get employee data
router.get("/employee", async (req, res) => {
  try {
    const userData = await employeeDetails.find();
    res.status(201).json(userData);
    console.log(userData);
  } catch (error) {
    res.status(404).json(error);
  }
});

//delete employee data
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteEmployee = await employeeDetails.findByIdAndDelete({ _id: id });
    console.log(deleteEmployee);
    res.status(201).json(deleteEmployee);
  } catch (error) {
    res.status(404).json(error);
  }
});

//get individual employee id

router.get("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const individualEmployee = await employeeDetails.findById({ _id: id });
    console.log(individualEmployee);
    res.status(201).json(individualEmployee);
  } catch (error) {
    res.status(404).json(error);
  }
});

//login auth
router.post("/signup", (req, res) => {
  const { userName, password } = req.body;
  employeeDetails.findOne({ userName: userName }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Logged in Sucessfully", user: user });
      } else {
        res.send({ message: "Incorrect Password" });
      }
    } else {
      res.send({ message: "User not Available" });
    }
  });

  // const user = await Login.findOne({
  //   userName: req.body.userName,
  //   password: req.body.password,
  // });
  // console.log(user);
  // if (user) {
  //   return res.status(201).json({ status: "ok", user: true });
  // } else {
  //   return res.status(404).json({ status: "error", user: false });
  // }
});

//Notification add
router.post("/notification", async (req, res) => {
  const { notificationTitle, notificationBody } = req.body;
  if (!notificationTitle || !notificationBody) {
    res.status(404).json("Complete the Empty Fileds");
  } else {
    const newNotification = new notification({
      notificationTitle,
      notificationBody,
    });
    await newNotification.save();
    res.status(201).json(newNotification);
    console.log(newNotification);
  }
});

//Notification Get
router.get("/notification", async (req, res) => {
  try {
    const notiData = await notification.find();
    res.status(201).json(notiData);
  } catch (error) {
    res.status(404).json(error);
  }
});

// register a new task

router.post("/employee/taskdata", newtask);

//Adding new employee Route
router.post("/employee", async (req, res) => {  
  await addEmployee(req.body, "employee", res);
});

//admin login
router.post("/login", async (req, res) => {
  await employeeLogin(req.body, "admin", res);
});

// employee login
router.post("/employee/login", async (req, res) => {
  await employeeLogin(req.body, "employee", res);
});

//file upload
router.post("/singlefile", upload.single("file"), singleFileUpload);

module.exports = router;
