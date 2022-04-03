//jshint esversion: 6

const express = require("express");
const app = express();

var router = express.Router();
var bodyParser = require('body-parser');
const Post = require('../models/post');

router.use(bodyParser.urlencoded({ extended: true }));
console.log("content Feed invoked");

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

module.exports = router;