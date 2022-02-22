import React, { Component } from 'react';
import axios from 'axios';
 
import PlaceholderPost from '../components/placeholderPost/placeholderPost';
import '../components/placeholderPost/placeholderpost.css'

class feed extends Component {
	
	state = 
	{
		title: '',
		body: '',
		posts: []
	}

	//retrieves posts whenever component mounts
	componentDidMount = () => {
		this.getPosts();
	}

	//retrieves our posts
	getPosts = () => {
		axios.post('/api/contentfeedAPI/getAllPosts', {}) //api route goes here
		.then((response) => {
			const data = response.data;
		  	this.setState({ posts: data });
		  	console.log('Data has been received!' + data);
		})
		.catch(() => {
		  	console.log('Error retrieving data!');
		});
	}
	
	//maps each post
	displayPosts = (posts) => {
		//if there are no posts
		if (!posts.length) return null;
		return posts.map((post, index) => (
				<div className = "post" key = {index}>
					<h4>{post.postedBy}</h4>
					<p><small>{post.time}</small></p>
					<p>{post.content}</p>
				</div>
			));
		}
	
	//rendering
	render() {
		return (  
				<div>
					{this.displayPosts(this.state.posts)}
					<PlaceholderPost />
				</div> 
		);
	}
}

export default feed;