import React, { Component } from 'react';
import axios from 'axios';
import Logout from '../components/logout';
import Navigation from '../components/Navigation';
import { NavLink } from 'react-router-dom';

import Comments from '../components/Comments';
import Likes from '../components/Likes';
import PlaceholderPost from '../components/placeholderPost/placeholderPost';
import '../components/placeholderPost/placeholderpost.css';
import { Carousel } from 'react-responsive-carousel';
import '../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';

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

	carouselImages = (attachments) => {
		return attachments.map((attachment) => {
			return (<div> 
				<img src={attachment} alt="Image Placeholder" width="auto" height="auto"/>
			</div>);
		})
	}

	displayImages = (attachments) => {
		if (attachments.length > 1) {
			return (<Carousel showArrows={true} width={500} height={300}>
				{ this.carouselImages(attachments) } 
			</Carousel>);
		} else if (attachments.length == 1) {
			return (<img src={attachments[0]} alt="Image Placeholder" width="500" height="300"/>);
		}
		return;
	}
	
	//maps each post
	displayPosts = (posts) => {
		//if there are no posts
		if (!posts.length) return null;
		return posts.map((post, index) => (
			<div className = "post" key = {index}>
				<h4> <NavLink to={'/user/' + post.postedBy}>{post.postedBy}</NavLink></h4> 
				<p><small>{post.time}</small></p>
				<p>{post.content}</p>
				{this.displayImages(post.attachments)}
				<Likes postID={""+post._id} />
				<Comments postID={""+post._id} />
			</div>
		));
	}
	
	//rendering
	render() {
		return (  
			<div>
				<Navigation />
				{this.displayPosts(this.state.posts)}
				<PlaceholderPost />
			</div> 
		);
	}
}

export default feed;