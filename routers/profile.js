const express = require("express");
const router = new express.Router();
const auth = require("../libs/auth");

const User = require("../models/user.model");

router.get("/api/profile/:username", async (req, res) => {
  try {
    let user = await User.findOne({ name: req.params.username });

    res.send({ status: true, user: user });
  } catch (err) {
    console.log(err);

    res.status(500).send({ status: false, error: err });
  }
});

router.patch("/api/account/update", auth, async (req, res) => {
  try {
    // console.log(res.locals.user);
    await User.findByIdAndUpdate(res.locals.user._id, req.body);
    res.send({ status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, error: err });
  }
});

module.exports = router;
