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
	var poster = req.body.username + "";
    var text = req.body.content + "";
    var attachments = req.body.attachments;
    var postData = { postedBy: poster };
    console.log("Entering a new post by " + poster);
    if (text) {
        postData.content = text;
        console.log(text);
    }
    if (attachments) {
        postData.attachments = attachments;
        console.log(attachments);
    }

    //add post to the database
    const post = new Post(postData);
    post.save().then((result) => {
        console.log(result);
        console.log("Success!");
    })
    .catch((err) => {
        console.log(err);
    });
});
module.exports = router;