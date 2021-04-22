const Profile = require("../models/Profile");
const express = require("express");
const bcrypt = require('bcrypt');
const sessionRouter = express.Router()

//Login
sessionRouter.post('/login', async(req,res) => {
    const {userName, password} = req.body;
    const profile = await Profile.findOne({ userName: userName});
    
    if(!profile || !await bcrypt.compare(password, profile.password)){
        res.status(401).json('Incorrect password or username');
        return
    } 

    req.session.id = profile.id;
    req.session.userName = profile.userName;
    req.session.role = profile.role;
    res.status(200).json(`You are logged in as ${req.body.role}`);
})

//Logout 
sessionRouter.delete('/logout', async(req,res) => {
    if(!req.session.id){
        res.status(400).json('already logged out')
        return
    }
    req.session = null;  
    res.status(200).json('logout succ')
})


module.exports = sessionRouter;