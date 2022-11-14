const express = require("express");
const router = new express.Router();
const auth = require("../libs/auth");

const profileController = require('../controllers/profileController')

router.get("/api/profile/:username", profileController.getProfileData);

router.patch("/api/account/update", auth, profileController.updateProfileData);

module.exports = router;
