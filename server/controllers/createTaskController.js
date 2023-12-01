const createTask = require("../Models/userSchema");

const newtask = async (req, res, next) => {
  try {
    const newTaskCreated = new createTask({
      taskName: req.newTaskCreated.taskName,
      assignTo: req.assignTo,
      startedOn: req.startedOn,
      dueDate: req.dueDate,
      taskDescription: req.taskDescription,
      requiredFiles: {
        fileName: req.filename,
        filePath: req.filePath,
        fileType: req.fileType,
        fileSize: fileSizeFormatter(req.fileSize, 2),
      },
    });
    await newTaskCreated.save();
    res.status(201).json(newTaskCreated, "Task has been assigned");
    console.log(newTaskCreated);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes == 0) {
    return "0 bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + "-" + sizes[index]
  );
};

module.exports = { newtask };
