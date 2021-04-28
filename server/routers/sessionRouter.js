const Profile = require("../models/Profile");
const express = require("express");
const bcrypt = require("bcrypt");
const sessionRouter = express.Router();

//Login
sessionRouter.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const profile = await Profile.findOne({ userName: userName });

  if (!profile || !(await bcrypt.compare(password, profile.password))) {
    res.status(401).json("Incorrect password or username");
    return;
  }

  req.session.id = profile.id;
  req.session.userName = profile.userName;
  req.session.role = profile.role;
  req.session.name = profile.name;
  
  res.status(204).json(`You are logged in as ${req.session.userName}`);
});

//Logout
sessionRouter.delete("/logout", async (req, res) => {
  if (!req.session.id) {
    res.status(400).json("already logged out");
    return;
  }
  req.session = null;
  res.status(200).json("logout succ");
});

sessionRouter.get('/authenticated', async ( req, res) => {
  if(req.session){
    res.status(200).json(req.session)
  } else {
    res.status(401).json(null)
  }
})

module.exports = sessionRouter;
