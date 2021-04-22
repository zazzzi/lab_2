const profileModel = require("../models/Profile");
const express = require("express");
const postModel = require("../models/Post");

const profileRouter = express.Router();

//get all profiles
profileRouter.get("/profiles", async (req, res) => {
  const profile = await profileModel.find();
  res.send(profile);
});

//post new user/profile
profileRouter.post("/profiles", async (req, res) => {
  const profile = await profileModel.create(req.body);
  res.status(201).json(profile);
});

//get specific user from ID
profileRouter.get("/profiles/:id", async (req, res) => {
  const profile = await profileModel.findOne({ _id: req.params.id });
  res.send(profile);
});

//delete user from id
profileRouter.delete("/profiles/:id", async (req, res) => {
  const profile = await profileModel.findOneAndDelete({ _id: req.params.id });
  res.send(profile);
});

//update user from id (non admin command)
profileRouter.put("/profiles/:id", async (req, res) => {
  
  
  
  
  const profile = await profileModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        password: req.body.password,
      },
    },
    { new: true },
    (err) => {
      if (err) {
        console.log("OH NO SOMETHING WENT WRONG");
      }
    }
  );
  res.send(profile);
});

module.exports = profileRouter;
