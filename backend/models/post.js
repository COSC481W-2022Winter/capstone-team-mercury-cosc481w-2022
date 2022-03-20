const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postedBy: {
        type: String,
        required: true
    },
	content: String,
	attachments: [{link: String}],
  commentts: [{commenter: String, comment: String}],
  likeCt: number,
  likers: [{user: String}],

	time:{ type: Date, default: Date.now },
}, {id: true});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;