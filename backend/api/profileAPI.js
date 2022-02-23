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
module.exports = router;
