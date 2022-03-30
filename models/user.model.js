const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const user = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
  },
  { collection: "UserData" }
);

user.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const model = mongoose.model("UserData", user);

module.exports = model;
