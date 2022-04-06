var express = require("express");
const app = express();

var router = express.Router();
var bodyParser = require("body-parser");

const User = require("../models/user");

router.use(bodyParser.urlencoded({ extended: true }));

//Callback to check if a user exists
//results in "true" if a user with the same username is found
//results in "false" if this is not the case
router.post("/checkUser", function (req, res) {
  const user = req.body.username;

  User.countDocuments({ username: user }, function (err, count) {
    if (count > 0) {
      res.send("true");
    } else {
      res.send(false);
    }
  });
});

//new user callback
//puts a new user into the database
router.post("/newUser", function (req, res) {
  //get user data
  var name = req.body.username + "";
  var pass = req.body.password + "";

  //add user to the database
  const user = new User({
    username: name,
    password: pass,
    //default images from internet
    avatarurl:
      "https://res.cloudinary.com/cutestpaw/image/upload/v1649207638/default_pfp_zfyun0.jpg",
    bannerurl:
      "https://res.cloudinary.com/cutestpaw/image/upload/v1649207638/default_banner_oqhrcu.jpg",
  });
  user
    .save()
    .then((result) => {
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
