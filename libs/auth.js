const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

require("dotenv").config({ path: "./config.env" });

module.exports = async (req, res, next) => {
  let decoded_token = jwt.verify(
    req.headers["x-access-token"],
    process.env.SECRET
  );

  try {
    let user = await User.findOne({ name: decoded_token.name });
    if (user) {
      res.locals.user = user;
      next();
    } else throw new Error("Invalid Token");
  } catch (err) {
    console.log(err);
    res.status(401).send({ status: false, error: err });
  }
};
