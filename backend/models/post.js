const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postedBy: {
        type: String,
        required: true
    },
	content: String,
	attachments: [{type: String}],
  tags: [{type: String}],
  comments: [{commenter: String, comment: String}],
  likeCt: {type: Number},
  likers: [{type: String}],

	time:{ type: Date, default: Date.now },
}, {id: true});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;