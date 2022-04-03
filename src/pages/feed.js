import React, { Component } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import { NavLink } from 'react-router-dom';
import pagecss from './page.css'

import MustLogin from '../components/mustLogin';
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

	//retrieves our posts from people that are currently followed
	getPosts = () => {
		axios.post('/api/contentfeedAPI/getFollowingPosts', {}) //api route goes here
		.then((response) => {
			const data = response.data;
		  	this.setState({ posts: data });
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
			<div className = "post" style={{margin: "auto"}} key = {index}>
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
				<MustLogin />
				<Navigation />
				{this.displayPosts(this.state.posts)}
				<PlaceholderPost />
			</div> 
		);
	}
}

export default feed;