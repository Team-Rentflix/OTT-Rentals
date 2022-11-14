const User = require("../models/user.model");
const Post = require('../models/post.model');
const Transaction = require('../models/transaction.model')

exports.getProfileData = async (req, res) => {
    try {
        let user = await User.findOne({ name: req.params.username });
        let posts = await Post.find({ user_id: user._id })
        const user_transaction_details = await Transaction.find({ $or: [{ sender_id: user._id }, { reciever_id: user._id }] })
        res.send({ status: true, user: { user, posts }, user_transaction_details });
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