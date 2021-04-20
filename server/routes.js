const Post = require("./models/Post");
const express = require("express");
const router = express.Router();

// GET all twats
router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

// POST new twat
router.post("/posts", async (req, res) => {
  const post = new Post({
    author: req.body.author,
    content: req.body.content,
    likes: req.body.likes,
    date: req.body.date,
  });
  await post.save();
  res.send(post);
});

// GET specific post
router.get("/posts/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.send(post);
});

//delete character from ID
router.delete("/posts/:id", async (req, res) => {
  const post = await Post.findOneAndDelete({ _id: req.params.id });
  res.send(post);
});

//update post from ID 
router.put("/posts/:id", async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { content: req.body.content } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Opsiiii something went wrooong");
      }
      console.log(doc);
    }
  );
  res.send(post);
});

module.exports = router;
