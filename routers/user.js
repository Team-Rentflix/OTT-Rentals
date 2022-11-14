const express = require("express");
const router = new express.Router();
const auth = require("../libs/auth");
const userController = require('../controllers/userController')


router.post("/api/login", userController.loginUser);

router.get("/api/auth", auth, (req, res) => {
  return res.send({ status: true, username: res.locals.user.name });
});

router.get("/api/account", auth, userController.getAccountDetails);

router.post("/api/register", userController.createNewAccount);

module.exports = router;
