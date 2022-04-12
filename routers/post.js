const express = require('express')
const router = new express.Router()
const auth = require('../libs/auth')
const Post = require('../models/post.model')
const User = require('../models/user.model')

router.post('/api/post/create', auth, async (req, res) => {
    try {
        await Post.create({ ...req.body, user_id: res.locals.user._id, active: true })
        return res.status(200).send({ status: true })
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, error: err });
    }
})

router.get('/api/posts', async (req, res) => {
    try {
        let posts = await Post.find({});
        const new_posts = await Promise.all(posts.map(async post => {
            const user_data = await User.findOne({ _id: post.user_id })
            return ({
                ...post._doc, user_data: {
                    name: user_data.name,
                    phoneNumber: user_data.phoneNumber
                }
            })
        }))
        return res.status(200).send({ status: true, posts: new_posts })
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, error: err });
    }
})

module.exports = router