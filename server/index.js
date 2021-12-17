const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const port = process.env.PORT | 4000;

app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/Rentflix').then(() => {
    console.log('connection successful')
});
console.log(User)

app.post('/api/login', (req, res) => {
    console.log(req.body);
})

app.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            username: req.body.username,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            password: newPassword,
        })
        res.json({ status: true })
    } catch (err) {
        res.json({ status: false , error: err._message })
    }
})

app.listen(port, () => console.log(`Server running on port:${port}`))
