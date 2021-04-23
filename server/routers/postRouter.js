const Post = require("../models/Post");
const postModel = require("../models/Post");
const express = require("express");
const moment = require("moment");
const postRouter = express.Router();

let liked = false;

// GET all twats
postRouter.get("/posts", async (req, res) => {
  const twat = await postModel.find();
  res.send(twat);
});

// POST new twat
postRouter.post("/posts"/* , secureWithRole("plebian") */, async (req, res) => {
  const today = moment().format("MMM DD YYYY HH:mm");
  console.log("test");
  const post = new Post({
    name: req.session.name,
    author: req.session.userName,
    content: req.body.content,
    likes: 0,
    date: today,
  });

  await post.save();
  res.status(201).json(post);
});

/* postRouter.post("/posts", async (req, res) => {
  const twat = await postModel.create(req.body);
  res.status(201).json(twat);
}); */

// GET specific post
postRouter.get("/posts/:id", async (req, res) => {
  const twat = await postModel.findOne({ _id: req.params.id });
  res.send(twat);
});

//delete post from ID
postRouter.delete("/posts/:id", /* secureWithRole("plebian"), */ async (req, res) => {
  /* const twatToDelete = await Post.findOne({ _id: req.params.id }); */
  const post = await Post.findOneAndDelete({ _id: req.params.id });
  res.status(200).json(post);

 /*  if (twatToDelete.author === req.session.userName || req.session.role === "admin") {
    
  } else {
    res.status(401).json("You do not have the necessary priviliges");
  } */
});

//Update post from ID
postRouter.put("/posts/:id", secureWithRole("plebian"), async (req, res) => {
  const twatToUpdate = await Post.findOne({ _id: req.params.id });
  if (
    twatToUpdate.author === req.session.userName ||
    req.session.role === "admin"
  ) {
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
    res.status(200).json("updated");
    res.send(post);
  } else {
    res.status(401).json("You do not have the necessary priviliges");
  }
});

//Update like
postRouter.post("/posts/:id", async (req, res) => {
  //if post is clicked again with same id remove the like.
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { likes: 1 } },
    { new: true }
  );
  
  res.status(200).json(post);
});

//Middleware functions
function secure(req, res, next) {
  if (req.session.userName) {
    next();
  } else {
    res.status(401).json("loginfirst pls");
  }
}

function secureWithRole(user) {
  return [
    secure,
    (req, res, next) => {
      if (req.session.role === user || req.session.role === "admin") {
        next();
      } else {
        res.status(403).json("Check your priviliges!");
      }
    },
  ];
}

module.exports = postRouter;
