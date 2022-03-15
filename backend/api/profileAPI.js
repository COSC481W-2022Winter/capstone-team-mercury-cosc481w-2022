var express = require("express");
const app = express();

var router = express.Router();
var bodyParser = require('body-parser');


const User = require('../models/user');

router.use(bodyParser.urlencoded({ extended: true }));



//Get the username to return to the frontend

router.post("/getUsername", function(req, res) {
    const user = req.body.username;
    console.log("Checking for user w/ username: " +user);
    
    User.find({username: user}).then((data) => {
        console.log(data)
    res.send(data.username);
})
});

// Get the bio for the user (Placeholder for now)
router.post("/getBio", function(req, res) {
    const user = req.body.username;
    console.log("Checking for user w/ username: " +user);
    
    User.find({username: user}, function (err){ 
        res.send("Placeholder Bio");
        });
});


// Update/Change the user's bio

router.post("/changeBio",function(req,res){
    const user = req.body.username;
    console.log("Checking user validity for: "+username);

    User.find({username: user}, function(err)
    {
        res.sendFile("newBio.txt");
        });
    
})

// Get the user's name

router.post("/getName", function(req,res)
{
    const user = req.body.name;
    console.log("Checking for user w/ name: " +user);
    
    User.find({name: user}).then((data) => {
        console.log(data)
    res.send(data.name);
});



// Get the user's website link to their profile page

router.post("/getWebLink", function(req,res){
    const user = req.body.website;
    console.log("Checking for website link..." + user);

    User.find({name: user}) {
        res.send(data.photo);
    });
});


// Get user's profile picture for display
router.post("/getProfilePic", function(req,res){
    const user = req.body.us;
    console.log("Verifying valid username: " + user);

    User.find({website:user}, function(err){
        res.send(data.newPhoto);
    });
});



// Change the user's profile picture
router.post("/changeProfilePic", function(req,res){
    const user = req.body.website;
    console.log("Checking for website link..." + user);

    User.find({website:user}, function(err){
        res.send(data.newphoto);
    });
});


module.exports = router;
