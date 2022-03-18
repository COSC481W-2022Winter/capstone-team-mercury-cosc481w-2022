var express = require("express");
const app = express();

var router = express.Router();
var bodyParser = require('body-parser');


const Post = require('../models/post');

router.use(bodyParser.urlencoded({ extended: true }));


//new post callback
//puts a new post into the database
router.post("/newPost", function(req, res) {
    //get post data
	var poster = req.body.username+"";
    var text = req.body.content+"";
	var attachments = ""; //TBA
    var comments = [""];
	console.log("Entering a new post by " +poster);
	console.log(text);

    //add post to the database
    const post = new Post({
		postedBy: poster,
        content: text,
        comments: []
        //attachments: [] TBA
    });
    post.save().then((result) => {
        console.log(result);
        console.log("Success!");
    })
    .catch((err) => {
        console.log(err);
    });
});

// Pull all comments for a specific
// post from the database

router.post("/getAllComments", function(req,res){

    console.log("Getting all comments for post: "+post);

    res.send(comments);

    console.log(comment);
});




// Attach a new comment to a post

router.post("/writeNewComment", function(req,res){

	var commenter = req.body.username+"";
    var comment = req.body.content+"";

    post.save().then((result) => {
        console.log(result);
        console.log("Success!");
    })
    .catch((err) => {
        console.log(err);
    });

});

module.exports = router;