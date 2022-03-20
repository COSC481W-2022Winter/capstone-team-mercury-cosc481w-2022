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


//API like button 

router.put('/like/:id', auth, async(req, res) =>{
    try{ 
        const post = await Post.findById(req.params.id); 
        //check if the post has not already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length>0){
            return res.json(400).json({msg: 'Post already liked'}); //message saying the post the post has already been liked by a certain user
        }
        

        post.likes.unshift({user: req.user.id});

        await post.save(); //saves the like button 
        res.json(post.likes); // check the length

    } catch(err){
        console.error(err.message); 
        res.status(500).send('Server Error'); 
    }
} )

module.exports = router;