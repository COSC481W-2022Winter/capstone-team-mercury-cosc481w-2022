var express = require("express");
const app = express();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

var router = express.Router();
var bodyParser = require('body-parser');


const User = require('../models/user');

router.use(bodyParser.urlencoded({ extended: true }));

//Get the username to return to the frontend

router.post("/getUsername", function(req, res) {
    const user = req.body.username;
    
    User.find({username: user}).then((data) => {
    res.send(data.username);
})
});

// Get the bio for the user (Placeholder for now)
router.post("/getUserDetails", function(req, res) {
    const user = req.body.username;
    
    User.find({username: user}) .then((data) => {
        res.json(data);
    })
});


// Update/Change the user's bio

router.post("/editProfile",function(req,res){
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

router.post("/getprofilepic", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    res.json(user.avatarurl);
  } catch (err) {
    console.log(err);
  }
});
router.post("/getbanner", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    res.json(user.bannerurl);
  } catch (err) {
    console.log(err);
  }
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
        if(user.following.includes(userToCheckFollow+"")) {
            res.send("true")
        }
        else 
            res.send(false);
    });
});

router.post("/updateProfilePic", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const user1 = await User.findOne({ username: req.body.username });
    if (user1.avatarid != null) {
      await cloudinary.uploader.destroy(user1.avatarid);
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    User.findOneAndUpdate(
      { username: req.body.username },
      {
        $set: {
          avatarurl: result.secure_url,
          avatarid: result.public_id,
        },
      }
    ).exec();
    const user = await User.findOne({ username: req.body.username });
    res.json(user.avatarurl);
  } catch (err) {
  }
});

router.post("/updatebanner", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const user1 = await User.findOne({ username: req.body.username });
  
    if (user1.bannerid != null) {
      await cloudinary.uploader.destroy(user1.bannerid);
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    User.findOneAndUpdate(
      { username: req.body.username },
      {
        $set: {
          bannerurl: result.secure_url,
          bannerid: result.public_id,
        },
      }
    ).exec();
    const user = await User.findOne({ username: req.body.username });
    res.json(user.bannerurl);
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
