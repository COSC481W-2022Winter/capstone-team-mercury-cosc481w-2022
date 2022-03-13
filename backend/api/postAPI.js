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
	var attachment1 = req.body.attachments;
    var attachment2 = null; //replace with the names you're sending
    var attachment3 = null;
	console.log("Entering a new post by " +poster);
	console.log(text);
    console.log(attachment1);

    //add post to the database
    const post = new Post({
		postedBy: poster,
        content: text,
        attachments: [attachment1, attachment2, attachment3]
    });
    post.save().then((result) => {
        console.log(result);
        console.log("Success!");
    })
    .catch((err) => {
        console.log(err);
    });
});
module.exports = router;