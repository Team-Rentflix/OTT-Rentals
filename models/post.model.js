const mongoose = require("mongoose");

const post = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    subscription_type: { type: String, required: true },
    time_period: { type: Number, required: true },
    end_date: { type: Date, required: true },
    rate: { type: Number, required: true },
    description: { type: String },
    user_id: { type: String },
    active: { type: Boolean },
    acc_pass: { type: String, required: true },
    secret_key: { type: String, required: true },
    acc_id: { type: String, required: true }
  },
  { timestamps: true }
);

const model = mongoose.model("posts", post);
module.exports = model;
