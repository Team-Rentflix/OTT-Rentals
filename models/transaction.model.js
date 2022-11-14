const mongoose = require('mongoose')

const transaction = new mongoose.Schema({
    sender_id: { type: String, required: true },
    reciever_id: { type: String, required: true },
    post_id: { type: String, required: true },
    razorpay_payment_id: { type: String, required: true }
}, { timestamps: true })

const model = mongoose.model('transactions',transaction);

module.exports = model