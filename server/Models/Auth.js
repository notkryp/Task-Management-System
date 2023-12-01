const mongoose = require("mongoose");

const Auth = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    newPassword: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { collection: "user-auth" }
);

const Login = mongoose.model("Authetication", Auth);

module.exports = Login;
