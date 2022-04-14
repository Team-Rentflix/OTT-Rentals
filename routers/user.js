const express = require("express");
const router = new express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth = require("../libs/auth");
const bcrypt = require("bcryptjs");

require("dotenv").config({ path: "./config.env" });

// const verifyUser = async (token) => {
//   try {
//     const decoded_token = jwt.verify(token, process.env.SECRET);
//     const username = decoded_token.name;
//     const user = await User.findOne({ name: username });
//     if (user) {
//       return { status: true, user: user };
//     } else {
//       return { status: false };
//     }
//   } catch (err) {
//     return { status: false };
//   }
// };

router.post("/api/login", async (req, res) => {
  // console.log(req.body);
  const user = await User.findOne({
    name: req.body.username,
  });
  if (!user) {
    return res.send({ status: false, error: "No User Found" });
  }
  const isPassValid = await bcrypt.compare(req.body.password, user.password);
  if (isPassValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      process.env.SECRET
    );
    return res.send({
      status: true,
      user: token,
      username: user.name,
      user_id: user._id,
    });
  } else {
    return res.send({
      status: false,
      user: false,
      error: "Password do not match",
    });
  }
});

router.get("/api/auth", auth, (req, res) => {
  // const Vdata = await verifyUser(req.headers["x-access-token"]);
  // console.log(await User.findOne({ _id: "61bc82803861aef445ec92bb" }));
  // if (Vdata.status) {
  return res.send({ status: true, username: res.locals.user.name });
  // } else {
  // return res.send({ status: false, error: "invalid token" });
  // }
});

router.get("/api/account", auth, async (req, res) => {
  let user = res.locals.user;
  return res.json({
    status: true,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });
});

router.post("/api/register", async (req, res) => {
  let user = new User(req.body);
  try {
    await user.save();
    res.send({ status: true });
  } catch (err) {
    res.status(500).send({ status: false, error: err });
  }
});

module.exports = router;
