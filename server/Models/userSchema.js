const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    assignTo: {
      type: String,
      required: true,
      unique: true,
    },
    startedOn: {
      type: Date,
      // required: true,
    },
    dueDate: {
      type: Date,
      // required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const createTask = mongoose.model("createTask", userSchema);

module.exports = createTask;
