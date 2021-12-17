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
mongoose.connect('mongodb://localhost:27017/rentflix', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connection successful')
}).catch(err => console.log(err));

app.post('/api/login', async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({
        name: req.body.username
    })
    if (!user) {
        res.json({ status: false, error: 'No User Found' });
        return
    }
    const isPassValid = await bcrypt.compare(req.body.password, user.password);
    if (isPassValid) {
        const token = await jwt.sign({
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber
        }, 'rentflix111110')

        return res.json({ status: true, user: token })
    }
    else {
        return res.json({ status: false, user: false, error: 'Password do not match' })
    }

})

app.get('/api/auth', async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded_token = jwt.verify(token, 'rentflix111110');
        const username = decoded_token.name;
        const user = await User.findOne({ name: username });
        if (user) {
            return res.json({ status: true })
        }
    } catch (err) {
        return res.json({ status: false, error: 'invalid token' })
    }
})


app.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.username,
            email: req.body.email,
            phoneNumber: req.body.phonenumber,
            password: newPassword,
        })
        res.json({ status: true })
    } catch (err) {
        res.json({ status: false, error: Object.keys(err.keyValue)[0] })
    }
})

app.listen(port, () => console.log(`Server running on port:${port}`))
