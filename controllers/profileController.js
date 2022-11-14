const User = require("../models/user.model");
const profileHlp = require('../helper/profileHlp')
exports.getProfileData = async (req, res) => {
    try {
        let user = await User.findOne({ name: req.params.username });
        await profileHlp.getposts(user, (err, posts) => {
            if (err) throw err
            user = { user, posts }
        })
        res.send({ status: true, user: user});
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, error: err });
    }
}

exports.updateProfileData = async (req, res) => {
    try {
        // console.log(res.locals.user);
        await User.findByIdAndUpdate(res.locals.user._id, req.body);
        res.send({ status: true });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, error: err });
    }
}