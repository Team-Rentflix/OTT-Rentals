const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//model
const User = require("../models/user.model");

const userHlp = require('../helper/userHlp')
const profileHlp = require('../helper/profileHlp')

require("dotenv").config({ path: "./config.env" });

exports.loginUser = async (req, res) => {
    // console.log(req.body);
    const user = await User.findOne({
        name: req.body.username,
    });
    if (!user) {
        return res.send({ status: false, error: "No User Found" });
    }
    const isPassValid = await bcrypt.compare(req.body.password, user.password);
    if (isPassValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
            },
            process.env.SECRET
        );
        return res.send({
            status: true,
            user: token,
            username: user.name,
            user_id: user._id,
        });
    } else {
        return res.send({
            status: false,
            user: false,
            error: "Password do not match",
        });
    }
}

exports.getAccountDetails = async (req, res) => {
    try {
        let user = res.locals.user;
        await userHlp.getUserPurchases(user, (err, purchaseDetails) => {
            if (err) {
                throw err
            }
            user = { user, purchaseDetails }
        })
        await profileHlp.getposts(user.user,(err,posts) => {
            if(err) throw err
            user = {...user, posts}
        })
        return res.send({
            status: true,
            user: user
        })
    } catch (err) {
        res.status(500).send({ status: false, error: err })
    }
}

exports.createNewAccount = async (req, res) => {
    let user = new User(req.body);
    try {
        await user.save();
        res.send({ status: true });
    } catch (err) {
        res.status(500).send({ status: false, error: err });
    }
}