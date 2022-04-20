var express = require("express");
const app = express();

var router = express.Router();
var bodyParser = require("body-parser");

const User = require("../models/user");
const Post = require("../models/post");
const Notif = require("../models/notification");

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


router.post("/areLikesVisible", function (req, res) {
  const user = req.body.username;

  User.findOne({ username: user }) .then((user) => {
        res.send(user.likesVisible);
  });
});

router.post("/toggleLikeVisibility", function (req, res) {
  const user = req.body.username;

  User.findOne({ username: user }) .then((user) => {
        user.likesVisible = !user.likesVisible;
        user.save();
  });
  res.send(true);
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

router.post("/deletePosts", function(req,res)
{
  const user = req.body.username;
  Post.deleteMany({postedBy: user}).exec(); //removes all posts by the users
  User.updateMany({},{$pull: {recentLikes: {postedBy: req.body.username}}}).exec();
  Notif.deleteMany({$and: [{toUser: req.body.username}, {$or: [{notifType: "comment"}, {notifType: "like"}] }] }).exec();
});


router.post("/deleteUser", function (req, res) {
  const user = req.body.username;

  Post.deleteMany({postedBy: user}).exec(); //removes all posts by the user
  Post.updateMany({}, {$pull: {comments: {commenter: user}}}).exec(); //removes comments from user from all posts
  Post.updateMany({likers: user}, {$pull: {likers: user}, $inc: {likeCt: -1} }).exec(); //removes user's likes
  Notif.deleteMany({$or: [{toUser: user}, {fromUser: user}]}).exec(); //removes all notifications a user is a part of
  User.updateMany({}, {$pull: {followers: user}}).exec(); //removes the user from other's follower/following lists
  User.updateMany({}, {$pull: {following: user}}).exec();
  User.updateMany({},{$pull: {recentLikes: {postedBy: req.body.username}}}).exec();
  User.deleteOne({username: user}).exec(); //removes the user themselves
  res.send(true);
});


router.post("/changePassword", function(req, res) {

  User.updateOne({username: req.body.username}, {password: req.body.newPassword}).exec();
  res.json(true);
});

router.post('/mostRecentLikePosts',async(req,res,next)=>{
  const user = await User.findOne({username: req.body.username});

  res.send({
      posts: user.recentLikes.reverse()
  })

});


//25 most Posts Posted by User
router.post('/mostRecentPostsByUser',async(req,res,next)=>{
  const user = req.body.username;
  const userPosts = await Post.find({
      postedBy:user
  }).sort({time:-1}).limit(25);

  res.send({
      posts:userPosts
  })

});
module.exports = router;
