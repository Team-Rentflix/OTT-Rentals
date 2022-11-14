const express = require("express");
const router = new express.Router();
const auth = require("../libs/auth");
const postController = require('../controllers/postController')
const Post = require("../models/post.model");

router.post("/api/post/create", auth, postController.createPost);

router.get("/api/posts", async (req, res, next) => {
  try {
    let posts = await Post.find({ active: true });
    posts.forEach(async (post) => {
      if (post.end_date <= new Date()) {
        await Post.findByIdAndUpdate(post._id, { active: false });
      }
    });
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, error: err });
  }
}, postController.getPosts);

router.route("/api/post/:id").get(postController.getPostById).patch(auth, postController.updatePost).delete(auth, postController.deletePost);

module.exports = router;
