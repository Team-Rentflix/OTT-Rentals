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
//mongodb://localhost:27017/rentflix
mongoose.connect("mongodb+srv://abhinavginti:eojay8VdTDhp96yP@cluster0.gbpfp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connection successful')
}).catch(err => console.log(err));


const verifyUser = async (token) => {
    try {
        const decoded_token = jwt.verify(token, 'rentflix111110');
        const username = decoded_token.name;
        const user = await User.findOne({ name: username });
        if (user) {
            return { status: true, user: user }
        }
    } catch (err) {
        return { status: false }
    }
}

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

        return res.json({ status: true, user: token, username: user.name })
    }
    else {
        return res.json({ status: false, user: false, error: 'Password do not match' })
    }

})

app.get('/api/auth', async (req, res) => {

    const Vdata = await verifyUser(req.headers['x-access-token'])
    console.log(await User.findOne({ _id: '61bc82803861aef445ec92bb'}))
    if (Vdata.status) {
        return res.json({ status: true, username: Vdata.user.name })
    }
    else {
        return res.json({ status: false, error: 'invalid token' })
    }
})


app.post('/api/register', async (req, res) => {
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

app.get('/api/account', async (req, res) => {
    const Vdata = await verifyUser(req.headers['x-access-token']);
    const user = Vdata.user;

    if (Vdata.status) {
        return res.json({
            status: true,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber
        })
    }
    else {
        return res.json({ status: false, error: 'Some Error Occured' })
    }
})

app.post('/api/newpost', async (req, res) => {
    const Vdata = await verifyUser(req.headers['x-access-token']);
    const user = Vdata.user;
    console.log(req.body)
})

app.listen(port, () => console.log(`Server running on port:${port}`))
