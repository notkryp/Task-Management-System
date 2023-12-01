const mongoose = require("mongoose");

const employeeDetails = mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
    },
    employeePhone: {
      type: Number,
      required: true,
    },
    employeeEmail: {
      type: String,
      required: true,
    },
    employeeAddress: {
      type: String,
      required: true,
    },
    employeeLink: {
      type: String,
    },
    userName:{
      type: String,
    },
    password:{
      type: String,
    },
    // employeePhoto: {
    //   type: String,
    // },
    role:{
      type: String,
      default:'employee',
      enum:["employee", "admin"]

    }
  },
  { collection: "employeeDetails" }
);

const addemployee = mongoose.model("Employee_details", employeeDetails);

module.exports = addemployee;
