const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require("cors");
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const multer = require("multer");
const uploads = multer({
  dest: "uploads/",
  limits: {
    fieldNameSize: 100,
    fieldSize: 10 * 1024 * 1024,
  },
});
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
const route = require("./Router/Routes");
app.use("/", route.app);

require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Db Connection successful"));
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
