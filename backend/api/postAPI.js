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
	console.log("Entering a new post by " +poster);
	console.log(text);

    //add post to the database
    const post = new Post({
		postedBy: poster,
        content: text
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

router.put('/like/:id', auth, async(req, res) =>{
    try{ 
        const post = await Post.findById(req.params.id); 

        if(post.likes.filter(like => like.user.toString() === req.user.id).length>0){
            return res.json(400).json({msg: 'Post already liked'}); 
        }

        post.likes.unshift({user: req.user.id});

        await post.save(); 
        res.json(post.likes); 

    } catch(err){
        console.error(err.message); 
        res.status(500).send('Server Error'); 
    }
} )
module.exports = router;