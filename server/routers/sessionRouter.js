const Profile = require("../models/Profile");
const express = require("express");
const cookieSession = require('cookie-session');
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
    res.send(profile); 
    res.status(204).json(null)
})



//Logout 
/* sessionRouter.delete('/logout', async(req,res) => {
    
}) */

//Get all Users Admin
/* app.get('/api/users', secureWithRole('admin'), (req,res) => {
    res.json(users);
}) */

//Middleware functions
/* function secure(req,res,next){
    if(req.session.username){
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
} */

module.exports = sessionRouter;