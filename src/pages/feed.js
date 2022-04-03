import React, { Component } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import { NavLink } from 'react-router-dom';
import pagecss from './page.css'

import MustLogin from '../components/mustLogin';
import Comments from '../components/Comments';
import Likes from '../components/Likes';
import PlaceholderPost from '../components/placeholderPost/placeholderPost';
import Post from '../components/post';
import '../components/placeholderPost/placeholderpost.css';
import { Carousel } from 'react-responsive-carousel';
import '../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';

class feed extends Component {
	
	state = 
	{
		posts:[]
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
			<Post post={post}/>
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