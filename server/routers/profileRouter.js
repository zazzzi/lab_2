const Profile = require("../models/Profile");
const express = require("express");
const Post = require("../models/Post");
const bcrypt = require('bcrypt');
const profileRouter = express.Router();

//get all profiles
profileRouter.get("/profiles", async (req, res) => {
  const profile = await Profile.find();
  res.send(profile);
});

//post new user/profile
profileRouter.post("/profiles", async (req, res) => {

  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  const profile = new Profile({
    userName: req.body.userName,
    password: hashedPassword,
    role: req.body.role,
    name: req.body.name,
  });
  
  await profile.save();
  res.send(profile);
});

//get specific user from ID
profileRouter.get("/profiles/:id", async (req, res) => {
  const profile = await Profile.findOne({ _id: req.params.id });
  res.send(profile);
});

//delete user from id
profileRouter.delete("/profiles/:id", async (req, res) => {
  const profile = await Profile.findOneAndDelete({ _id: req.params.id });
  res.send(profile);
});

//update user from id (non admin command)
profileRouter.put("/profiles/:id", async (req, res) => {
  const profile = await Post.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        password: req.body.password,
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("OH NO SOMETHING WENT WRONG");
      }
      console.log(doc);
    }
  );
  res.send(profile);
});

module.exports = profileRouter;
