const express = require("express");
const app = express.Router();
const Post = require("../Models/PostSchema");
const User = require("../Models/UserModel");

const secret = "ajkdhklnrfewbc2342nkjsdc";
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
// Register Page

const uploads = multer({
  dest: "uploads/",
  limits: {
    fieldNameSize: 100, // Increase the limit according to your requirements
    fieldSize: 10 * 1024 * 1024, // Increase the limit according to your requirements (10MB in this example)
  },
});

const fs = require("fs");
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
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, authData) => {
    if (err) throw err;
    res.json(authData);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploads.single("image"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const filepath = path + "." + extension;
  fs.renameSync(path, filepath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, authData) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const newPost = await Post.create({
      title,
      summary,
      content,
      image: filepath,
      author: authData.id,
    });
    res.json(newPost);
  });
});

app.put("/post", uploads.single("image"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }

    await postDoc.updateOne({
      title,
      summary,
      content,
      image: newPath ? newPath : postDoc.image,
    });

    res.json(postDoc);
  });
});

app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const removePost = await Post.deleteOne({ _id: id });
    res.json(removePost);
  } catch (err) {
    res.json({ message: err });
  }
});
app.get("/post", async (req, res) => {
  const authorData = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(15);
  res.json(authorData);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postData = await Post.findById(id).populate("author", ["username"]);
  res.json(postData);
});

module.exports = { app, uploads };
