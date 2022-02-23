var express = require("express");
const app = express();
var router = express.Router();
var bodyParser = require('body-parser');
const User = require('../models/user');

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/checkUser", function(req, res) {

    console.log("Checking for user w/ username: " +  req.body.username);
    
    User.findOne({ username:  req.body.username }).then(user => {
        if (!user) {
            res.send(false);
        } else if (user.password ==  req.body.password) {
            res.send(true);
        } else {
            res.send(false);
        }
    }); 
});

module.exports = router;