const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Models/UserModel");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const secret = "ajkdhklnrfewbc2342nkjsdc";
const multer = require("multer");
const uploads = multer({ dest: "uploads/" });
const fs = require("fs");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
// Register Page
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(user);
    console.log("User created Successfully");
  } catch (err) {
    return res.status(400).send("Failed to create the user.");
  }
});

//Login Page
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const data = await User.findOne({ username });
  const login = bcrypt.compareSync(password, data.password);
  if (login) {
    jwt.sign({ username, id: data._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: data._id,
        username,
      });
    });
  } else {
    res.status(400).json("Invalid Credentials");
  }
});

app.post("/profile", (req, res) => {
  const { token } = req.cookie;
  jwt.verify(token, secret, {}, (err, authData) => {
    if (err) throw err;
    res.json(authData);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploads.single("image"), (req, res) => {
  const { originalname, path, filename } = req.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  console.log(originalname, path, filename);
  fs.renameSync(path, path + "." + extension);

  res.json({
    image: req.image,
    title: req.title,
    summary: req.summary,
    content: req.content,
    files: req.file,
  });
});

mongoose
  .connect(
    "mongodb+srv://blogapp:luP5lnbHAx80kODG@cluster0.kffjo.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Db Connection successful"));
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
