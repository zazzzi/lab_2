const postModel = require("../models/Post");
const express = require("express");
const { json } = require("express");
const postRouter = express.Router();

// GET all twats
postRouter.get("/posts", async (req, res) => {
  const twat = await postModel.find();
  res.send(twat);
});

// POST new twat
postRouter.post("/posts", async (req, res) => {
  const twat = await postModel.create(req.body);
  res.status(201).json(twat);
});

// GET specific post
postRouter.get("/posts/:id", async (req, res) => {
  const twat = await postModel.findOne({ _id: req.params.id });
  res.send(twat);
});

//delete post from ID
postRouter.delete("/posts/:id", secureWithRole("plebian"), async (req, res) => {
  const twatToDelete = await Post.findOne({ _id: req.params.id });
  if(twatToDelete.author === req.session.userName){
    const post = await Post.findOneAndDelete({ _id: req.params.id });
    res.status(200).json('delet')
    res.send(post);
  } else { 
    res.status(401).json('You do not have the necessary priviliges')
  }
});

//Update post from ID 
postRouter.put("/posts/:id", secureWithRole("plebian"), async (req, res) => {
  const twatToUpdate = await Post.findOne({ _id: req.params.id });
  if(twatToUpdate.author === req.session.userName){
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
    res.status(200).json('updated')
    res.send(post);
  } else {
    res.status(401).json('You do not have the necessary priviliges')
  }
});

//Update like 
postRouter.post("/posts/:id", async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { likes: 1 } },
    { new: true }
  );
  res.status(200).json('Likes updated')
  res.send(post)


//Middleware functions
function secure(req,res,next){
    if(req.session.userName){
        next()
    } else {
        res.status(401).json('loginfirst pls')
    }
}

function secureWithRole(role) {
    return [secure, (req,res,next) => {
        if(req.session.role === role){
            next()
        } else {
            res.status(403).json('Check your priviliges!')
        }
    }]
}

module.exports = postRouter;
