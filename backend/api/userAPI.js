var express = require("express");
const app = express();

var router = express.Router();
var bodyParser = require('body-parser');


const User = require('../models/user');

router.use(bodyParser.urlencoded({ extended: true }));


//Callback to check if a user exists
//results in "true" if a user with the same username is found
//results in "false" if this is not the case
router.post("/checkUser", function(req, res) {
    const user = req.body.username;
    console.log("Checking for user w/ username: " +user);
    
    User.countDocuments({username: user}, function (err, count){ 
        if(count>0){
            console.log("They exist");
            res.send("true");
        }
        else {
            console.log("They don't exist");
            res.send(false);
        }
    }); 
});


//new user callback
//puts a new user into the database
router.post("/newUser", function(req, res) {
    //get user data
	var name = req.body.username+"";
    var pass = req.body.password+"";
	console.log("Entering a new user: " +req.body.username);

    //add user to the database
    const user = new User({
        username: name,
        password: pass
    });
    user.save().then((result) => {
        console.log(result);
        console.log("Success!");
    })
    .catch((err) => {
        console.log(err);
    });
});
module.exports = router;