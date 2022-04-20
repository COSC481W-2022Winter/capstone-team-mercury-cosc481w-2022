const express = require("express");
const app = express();

var router = express.Router();
var bodyParser = require('body-parser');
const Post = require('../models/post');
const User = require('../models/user');
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/getPostsWithTag", function(req, res) {    
    const tag = req.body.tag;
    const recent = req.body.sort === 'recent'? true : false;

    if(recent) {
        Post.find({tags: {$in: tag}}).sort({"$natural":-1}).then((data) => {
            res.json(data);
        });
    }
    else {
        Post.find({tags: {$in: tag}}).sort({likeCt:-1}).then((data) => {
            res.json(data);
        });
    }
 });


router.post("/search", function(req, res) {	
    const query = req.body.exact? req.body.query : { "$regex": req.body.query, "$options": "i" };
    const type = req.body.type;
    const sort = req.body.sort;
    const order = req.body.order==="ascending"? 1 : -1;
    let start = req.body.firstPostTime;
    if(start == null)
        start = new Date().toISOString();
        console.log(start);
    let skipCt = req.body.page * 25;
    
    switch (type) {
        case "posts":

            switch (sort) {

                case "recent":
                    Post.find({$and: [{time: {$lt: start}}, {$or:[{postedBy: query },{content: query }, {tags: query}]}]}).sort({"$natural":order}).skip(skipCt).limit(26).then((postData) => {
                        if(postData.length > 25) {
                            postData.pop();
                            res.json({posts: postData, more: true});
                        }
                        else
                            res.json({posts: postData, more: false});
                
                    });
                break;
            
                case "popular":
                    Post.find({$and: [{time: {$lt: start}}, {$or:[{postedBy: query },{content: query }, {tags: query}]}]}).sort({likeCt:order}).skip(skipCt).limit(26).then((postData) => {
                        if(postData.length > 25) {
                            postData.pop();
                            res.json({posts: postData, more: true});
                        }
                        else
                            res.json({posts: postData, more: false});
                    });
                break;
            }
        break;
        case "users":
            User.find({$or:[{username: query },{name: query }]}).sort({"$natural":-1}).then((data) => {
                res.json(data);
            });

        break;
    }

});

module.exports = router;
