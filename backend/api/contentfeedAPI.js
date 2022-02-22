//jshint esversion: 6

const express = require("express");
const app = express();

var router = express.Router();
var bodyParser = require('body-parser');
const Post = require('../models/post');

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/getAllPost", function(req, res) {	
    let postString = '';
    
    Post.find()
        .then((data) => {
        console.log("Data: " + data);
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
    });

});