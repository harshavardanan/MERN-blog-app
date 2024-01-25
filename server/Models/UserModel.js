const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 4,
      unique: true,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      min: 8,
      require: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
