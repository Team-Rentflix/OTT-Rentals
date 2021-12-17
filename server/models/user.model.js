const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phoneNumber: { type: Number, required: true, unique: true },
        email: { type: String, required: true, unique: true }
    },
    { collection: 'UserData' }
)

const model = mongoose.model('Rentflix', User);

module.exports = model