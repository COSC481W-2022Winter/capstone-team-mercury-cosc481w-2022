//jshint esversion: 6

const express = require("express");
const app = express();

var router = express.Router();
var bodyParser = require('body-parser');
const Post = require('../models/post');
const User = require('../models/user');

router.use(bodyParser.urlencoded({ extended: true }));
/* //old content feed route
router.post("/getAllPosts", function(req, res) {	
    let postString = '';
    
    Post.find().sort({"$natural":-1}).limit(25)
        .then((data) => {
        //console.log("Data: " + data);
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
    });

});

*/
router.post("/getFollowingPosts", function(req,res){
    let user = req.body.username;

    let start = req.body.firstPostTime;
    if(start == null)
        start = new Date().toISOString();
    let skipCt = req.body.page * 25;

    User.findOne({username: user}).then((userData) =>{
        let following = userData.following;
        Post.find({$and: [{time: {$lt: start}},{$or:[{postedBy: following}, {postedBy: user}]} ]} ).sort({"$natural":-1}).skip(skipCt).limit(26)
            .then((postData) =>{
                if(postData.length > 25) {
                    postData.pop();
                    res.json({posts: postData, more: true});
                }
                else
                    res.json({posts: postData, more: false});


    User.findOne({username: user}).then((userData) =>{
        let following = userData.following;
        Post.find({$or:[{postedBy: following}, {postedBy: user}]}).sort({"$natural":-1}).limit(50)
            .then((postData) =>{
                res.json(postData);

            })
    });
});

module.exports = router;