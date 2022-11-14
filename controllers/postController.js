const Post = require("../models/post.model");
const User = require("../models/user.model");
const jwt = require('jsonwebtoken')
require("dotenv").config({ path: "./config.env" });


exports.createPost = async (req, res) => {
    const enc_pass = jwt.sign({acc_pass: req.body.acc_pass}, req.body.secret_key)
    const enc_key = jwt.sign({secret_key: req.body.secret_key},process.env.SECRET)
    let post = new Post({
        ...req.body,
        user_id: res.locals.user._id,
        active: true,
        acc_pass: enc_pass,
        secret_key: enc_key
    });
    try {
        await post.save();
        return res.status(200).send({ status: true });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, error: err });
    }
}

exports.getPosts = async (req, res) => {
    try {
        let posts = await Post.find({ active: true });
        const new_posts = await Promise.all(
            posts.map(async (post) => {
                const user_data = await User.findOne({ _id: post.user_id });
                return {
                    ...post._doc,
                    user_data: {
                        name: user_data.name,
                        phoneNumber: user_data.phoneNumber,
                        email: user_data.email
                    },
                };
            })
        );
        return res.status(200).send({ status: true, posts: new_posts });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, error: err });
    }
}

exports.getPostById = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        let user_data = await User.findById(post.user_id);
        let new_post = {
            ...post._doc,
            user_data: {
                name: user_data.name,
                phoneNumber: user_data.phoneNumber,
                email: user_data.email
            },
        };

        res.send({ status: true, post: new_post });
    } catch (err) {
        console.log(err);

        res.status(500).send({ status: false, error: err });
    }
}

exports.updatePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user_id == res.locals.user._id) {
            await Post.findByIdAndUpdate(req.params.id, req.body);
            return res.send({ status: true })
        }

        res.send({ status: false, error: "Not authorized" });
    } catch (err) {
        console.log(err);

        res.status(500).send({ status: false, error: err });
    }
}

exports.deletePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user_id == res.locals.user._id) {
            await post.delete();
            return res.send({ status: true });
        }

        res.send({ status: false, error: "Not authorized" });
    } catch (err) {
        console.log(err);

        res.status(500).send({ status: false, error: err });
    }
}