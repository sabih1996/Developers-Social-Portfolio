const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

//@route   POST api/post
//@desc    Create a post API
//@access  Private

router.post(
  "/",
  [auth, [body("text", "text is required").not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      console.log("User posted a post!!");
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route   GET api/posts
//@desc    get all posts
//@access  Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
    console.log("get all posts");
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "server error!!!" });
  }
});

//@route   GET api/posts/:id
//@desc    get post by id
//@access  Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not  found" });
    }

    res.json(post);
    console.log("get all posts");
  } catch (error) {
    console.error(error.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not  found" });
    }

    res.status(500).send({ msg: "server error!!!" });
  }
});

//@route   DELETE api/posts/:id
//@desc    Delete a post
//@access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // if (err.kind === "ObjectId") {
    //   return res.status(404).json({ msg: "Post not  found" });
    // }

    //Check User
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post Deleted" });

    console.log("Post Deleted");
  } catch (error) {
    console.error(error.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not  found" });
    }

    res.status(500).send({ msg: "server error!!!" });
  }
});

module.exports = router;
