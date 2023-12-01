const employeeDetails = require("../Models/EmployeeDetails");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");


const addEmployee = async (employeeDets, role, res) => {
  try {
    //validate the employee
    let usernameNotTaken = await validateUsername(employeeDets.userName);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: "Username Already Taken",
        success: false,
      });
    }
    //validate the email
    let emailNotRegistered = await validateEmail(employeeDets.employeeEmail);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: "Email is already registered",
        success: false,
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(employeeDets.password, 12);
    //create new employee
    const newEmployee = new employeeDetails({
      ...employeeDets,
      password: hashedPassword,
      role: role,
    });
    await newEmployee.save();
    return res.status(201).json({
      message: "Employee added",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to create New Employee",
      success: false,
    });
  }
};

const employeeLogin = async (employeeCreds, role, res) => {
  let { userName, password } = employeeCreds;

  //Check the username is available or not
  const employee = await employeeDetails.findOne({ userName });

  if (!employee) {
    return res.status(404).json({
      message: "Username Not found, Unable to login",
      success: false,
    });
  }
  // checking the role
  if (employee.role !== role) {
    return res.status(401).json({
      message: "Invalid role",
      success: false,
    });
  }
  //user exists now checking password
  let isMatch = await bcrypt.compare(password, employee.password);
  if (isMatch) {
    //sign in the token and pass it to employee
    let token = jwt.sign(
      {
        employee_id: employee._id,
        role: employee.role,
        userName: employee.userName,
        email: employee.employeeEmail,
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      userName: employee.userName,
      role: employee.role,
      employeeEmail: employee.employeeEmail,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };
    return res.status(200).json({
      ...result,
      message: "Logged in sucessfully",
      success: true,
    });
  } else {
    return res.status(403).json({
      message: "Incorrect Password",
      success: false,
    });
  }
};

const validateUsername = async (userName) => {
  let employee = await employeeDetails.findOne({ userName });
  return employee ? false : true;
};

const validateEmail = async (employeeEmail) => {
  let employee = await employeeDetails.findOne({ employeeEmail });
  return employee ? false : true;
};

module.exports = {
  addEmployee,
  employeeLogin,
};
