const express = require("express");
const router = new express.Router();
const auth = require("../libs/auth");
const Post = require("../models/post.model");
const User = require("../models/user.model");

router.post("/api/post/create", auth, async (req, res) => {
  let post = new Post({
    ...req.body,
    user_id: res.locals.user._id,
    active: true,
  });
  try {
    await post.save();
    // await Post.create({
    //   ...req.body,
    //   user_id: res.locals.user._id,
    //   active: true,
    // });
    return res.status(200).send({ status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, error: err });
  }
});

router.get(
  "/api/posts",
  async (req, res, next) => {
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
  },
  async (req, res) => {
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
);

router
  .route("/api/post/:id")
  .get(async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
      let user_data = await User.findById(post.user_id);
      let new_post = [
        {
          ...post._doc,
          user_data: {
            name: user_data.name,
            phoneNumber: user_data.phoneNumber,
          },
        },
      ];

      res.send({ status: true, post: new_post });
    } catch (err) {
      console.log(err);

      res.status(500).send({ status: false, error: err });
    }
  })
  .patch(auth, async (req, res) => {
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
  })
  .delete(auth, async (req, res) => {
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
  });

module.exports = router;
