const postModel = require("../models/Post");
const express = require("express");
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

//delete character from ID
postRouter.delete("/posts/:id", async (req, res) => {
  const twat = await postModel.findOneAndDelete({ _id: req.params.id });
  res.send(twat);
});

//update post from ID
postRouter.put("/posts/:id", async (req, res) => {
  const twat = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { content: req.body.content } },
    { new: true },
    (err) => {
      if (err) {
        console.log("Opsiiii something went wrooong");
      }
    }
  );
  res.send(twat);
});

module.exports = postRouter;
