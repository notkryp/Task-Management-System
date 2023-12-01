require("dotenv").config();
const express = require("express");
const app = express();
require("./DB/Conn");
const cors = require("cors");
const router = require("./Routes/Router");
const { urlencoded } = require("express");
const bodyParser = require("body-parser");
const path = require('path')

const port = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(router);
app.use(urlencoded);

app.listen(port, () => {
  console.log(`app is running in ${port}`);
});
