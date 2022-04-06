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
router.post("/getUserDetails", function(req, res) {
    const user = req.body.username;
    console.log("getting data for user w/ username: " +user);
    
    User.find({username: user}) .then((data) => {
        res.json(data);
    })
});


// Update/Change the user's bio

router.post("/editProfile",function(req,res){
    console.log("Updating "+req.body.username +"'s profile");
    var profileChanges = {
        name: req.body.name,
        bio: req.body.bio,
        website: req.body.website
    };
    User.findOneAndUpdate(
        { username: req.body.username }, 
        { $set: profileChanges },
    ).then(post => {
    });
    
})


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


router.post("/follow", function(req, res) {
    const thisUser = req.body.thisUser;
    const userToFollow = req.body.username;

    User.findOne({username: thisUser}).then((user) => {
        if(user.following.includes(userToFollow)) {
            User.findOneAndUpdate(
                { username: userToFollow }, 
                { $pull: {followers: thisUser}}
            ).then(result => {});
            
            User.findOneAndUpdate(
                { username: thisUser }, 
                { $pull: {following: userToFollow}}
            ).then(result => {});

        }


        else {
            User.findOneAndUpdate(
                { username: userToFollow }, 
                { $push: {followers: thisUser}}
            ).then(result => {});
            
            User.findOneAndUpdate(
                { username: thisUser }, 
                { $push: {following: userToFollow}}
            ).then(result => {});
        }

    });
    res.json(true);
});


router.post("/doesUserFollow", function(req, res) {
    const thisUser = req.body.thisUser;
    const userToCheckFollow = req.body.username;
    
    User.findOne({username: thisUser}).then((user) => {
        console.log(user.following);
        console.log(userToCheckFollow);
        if(user.following.includes(userToCheckFollow+"")) {
            res.send("true")
        }
        else 
            res.send(false);
    });
});


module.exports = router;
