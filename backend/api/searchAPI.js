const express = require("express");
const app = express();

var router = express.Router();
var bodyParser = require('body-parser');
const post = require('../models/post');
const User = require('../models/user');

//API for tags
axios.post('/api/searchAPI/getPostsWithTag', {
    tag: this.state.tag
     }).then((response) => {
     const data = response.data;
         this.setState({results: data});
 })
 .catch(() => {
         console.log('Error retrieving data!');
 });

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/search", function(req, res) {	
    const query = req.body.exact? req.body.query : { "$regex": req.body.query, "$options": "i" };
    const type = req.body.type;
    const sort = req.body.sort;
    const order = req.body.order==="ascending"? 1 : -1;
    const tag = req.body.tag;
  
    
    switch (type) {
        case "posts":

            switch (sort) {
                case "recent":
                    Post.find({$or:[{postedBy: query },{content: query }, {tags: query}]}).sort({"$natural":order}).limit(25).then((data) => {
                        res.json(data);
                    });
                break;
            
                case "popular":
                    Post.find({$or:[{postedBy: query },{content: query } , {tags: query}]}).sort({likeCt:order}).limit(25).then((data) => {
                        res.json(data);
                    });
                break;

                case "tag": 
                    Post.find({tags: tag}).sort({"$natural":-1}).then((data) => {
                        res.json(data);
                    });
                break; 
            }
        break;
        case "users":
            User.find({$or:[{username: query },{name: query }]}).sort({"$natural":-1}).limit(25).then((data) => {
                res.json(data);
            });

        break;
        
    }

});

module.exports = router;