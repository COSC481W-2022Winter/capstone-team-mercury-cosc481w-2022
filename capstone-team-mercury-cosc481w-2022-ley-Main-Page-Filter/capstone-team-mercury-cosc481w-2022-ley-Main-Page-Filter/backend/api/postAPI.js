var express = require("express");
var ObjectId = require('mongodb').ObjectId; 
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


// Pull all comments for a specific
// post from the database

router.post("/getAllComments", function(req,res){
    const postID = req.body.postID;
    console.log("Getting all comments for post: "+postID);

    Post.findOne({_id:  postID }).then(post => {
            res.send(post.comments);
    }); 

    //console.log(comment);
});



// Attach a new comment to a post

router.post("/writeNewComment", function(req,res){

    console.log("Adding a new comment on " +req.body.postID)
    console.log(req.body.commenter);
    console.log(req.body.comment);
    var comment = {
        commenter: req.body.commenter,
        comment: req.body.comment
    };
    Post.findOneAndUpdate(
        { _id: req.body.postID }, 
        { $push: { comments: comment } },
    ).then(post => {
        console.log(post.comments)
    });

});


//API like button 
router.post('/getLikes', function(req, res){
    console.log("Getting like information for " +req.body.postID)
    
    Post.findById(
        { _id: req.body.postID }
    ).then(post => {
        let count = post.likeCt;
        if(count == undefined)
            count = 0;
        res.send(count +"");
    });

});

router.post('/didUserLike', async(req, res) =>{
    console.log("Getting like information for " +req.body.postID)
    
    Post.findById( {_id: req.body.postID }).then(post => {
        res.send(post.likers.includes(req.body.username))
    });
});

router.post('/like', async(req, res) =>{
    console.log("Liking " +req.body.postID)
    
    Post.findById( {_id: req.body.postID }).then(post => {
        if(post.likers.includes(req.body.username))
            res.send(true)
    });


    Post.findOneAndUpdate(
        { _id: req.body.postID }, 
        { $push: {likers: req.body.username}}
    ).then(post => {
        console.log("liked!");
    });

    Post.findOneAndUpdate(
        { _id: req.body.postID }, 
        { $inc: {likeCt: 1}  }
    ).then(post => {
        console.log("liked!");
    });


});

module.exports = router;