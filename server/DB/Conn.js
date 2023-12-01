const mongoose = require("mongoose");

const DB =
  "mongodb+srv://Abhi:SOwxYcIWUOaWMRRg@dbtskms.9gmng.mongodb.net/dbTSKMS?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Started"))
  .catch((err) => console.log(err.message));
