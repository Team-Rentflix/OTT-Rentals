const Post = require('../models/post.model');

module.exports = {
    getposts: async (user, cb) => {
        try {
            let posts = await Post.find({ user_id: user._id })
            cb(null, posts)
        } catch (err) {
            cb(err, null)
        }
    }
}