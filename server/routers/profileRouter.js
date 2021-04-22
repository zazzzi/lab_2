const Profile = require("../models/Profile");
const profileModel = require("../models/Profile");
const express = require("express");
const postModel = require("../models/Post");
const bcrypt = require('bcrypt')
const profileRouter = express.Router();



//get all profiles
profileRouter.get("/profiles", async (req, res) => {
  const profile = await profileModel.find();
  res.send(profile);
});

//post new user/profile USER/ADMIN
profileRouter.post("/profiles", async (req, res) => {
  //if user is logged in they do not have the option to post a new user/profile
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

//get specific user from ID USER/ADMIN
profileRouter.get("/profiles/:id", async (req, res) => {
  const profile = await profileModel.findOne({ _id: req.params.id });
  res.send(profile);
});

//delete user from id USER/ADMIN
profileRouter.delete("/profiles/:id", secureWithRole("plebian"), async (req, res) => {
  const profileToDelete = await profileModel.findOne({ _id: req.params.id });
  if(profileToDelete.author === req.session.userName || req.session.role === "admin"){
    const profile = await profileModel.findOneAndDelete({ _id: req.params.id });
    res.send(profile);
  } else { 
    res.status(401).json('You do not have the necessary priviliges')
  }
});

//update user from id (non admin command)
profileRouter.put("/profiles/:id", async (req, res) => {
  const profile = await postModel.findOneAndUpdate(
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

//Middleware functions
function secure(req,res,next){
  if(req.session.userName){
      next()
  } else {
      res.status(401).json('login first pls')
  }
}

function secureWithRole(user) {
  return [secure, (req,res,next) => {
      if(req.session.role === user || req.session.role === "admin"){
          next()
      } else {
          res.status(403).json('Check your priviliges!')
      }
  }]
}

module.exports = profileRouter;
