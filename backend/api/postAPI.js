var express = require("express");
var ObjectId = require('mongodb').ObjectId; 
const app = express();

var router = express.Router();
var bodyParser = require('body-parser');


const Post = require('../models/post');
const User = require('../models/user');

router.use(bodyParser.urlencoded({ extended: true }));



//new post callback
//puts a new post into the database
router.post("/newPost", function(req, res) {
    //get post data
	var poster = req.body.username + "";
    var text = req.body.content + "";
    var attachments = req.body.attachments;
    var tags = req.body.tags || [];
    var postData = { postedBy: poster, tags: tags };
    if (text) {
        postData.content = text;
    }
    if (attachments) {
        postData.attachments = attachments;
    }

    //add post to the database
    const post = new Post(postData);
    post.save().then((result) => {
    })
    .catch((err) => {
        console.log(err);
    });
});


// Pull all comments for a specific
// post from the database

router.post("/getAllComments", function(req,res){
    const postID = req.body.postID;

    Post.findOne({_id:  postID }).then(post => {
            res.send(post.comments);
    }); 

});



// Attach a new comment to a post

router.post("/writeNewComment", function(req,res){
    var comment = {
        commenter: req.body.commenter,
        comment: req.body.comment
    };
    Post.findOneAndUpdate(
        { _id: req.body.postID }, 
        { $push: { comments: comment } },
    ).then(post => {
    });

});


//API like button 
router.post('/getLikes', function(req, res){
    
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
    
    Post.findById( {_id: req.body.postID }).then(post => {
        res.send(post.likers.includes(req.body.username))
    });
});

router.post('/like', async(req, res) =>{
    
    Post.findById( {_id: req.body.postID }).then(post => {
        if(post.likers.includes(req.body.username))
            res.send(true)
    });


    Post.findOneAndUpdate(
        { _id: req.body.postID }, 
        { $push: {likers: req.body.username}}
    ).then(post => {
    });

    Post.findOneAndUpdate(
        { _id: req.body.postID }, 
        { $inc: {likeCt: 1}  }
    ).then(post => {
    });


});

router.post("/getPost", function (req, res) {
    const postId = req.body.postId;

    Post.findById(
        { _id: postId }
    ).then(post => {
        User.findOne({ username: post.postedBy }).then((user) => {
            res.send({
                user: user,
                post: post
            });
        })
    });
});

module.exports = router;