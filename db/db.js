const mongoose = require("mongoose");

require("dotenv").config({ path: "./config.env" });

module.exports = mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((err) => console.log(err));
