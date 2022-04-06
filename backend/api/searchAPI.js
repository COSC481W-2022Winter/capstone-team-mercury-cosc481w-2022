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
    
    switch (type) {
        case "posts":

            switch (sort) {
                case "recent":
                    Post.find({$or:[{postedBy: query },{content: query }, {tags: query}]}).sort({"$natural":order}).then((data) => {
                        res.json(data);
                    });
                break;
            
                case "popular":
                    Post.find({$or:[{postedBy: query },{content: query } , {tags: query}]}).sort({likeCt:order}).then((data) => {
                        res.json(data);
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