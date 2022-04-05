import React, { Component } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import { NavLink } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import pagecss from './page.css'

import MustLogin from '../components/mustLogin';
import Comments from '../components/Comments';
import Likes from '../components/Likes';
import PlaceholderPost from '../components/placeholderPost/placeholderPost';
import NoPostsPlaceholder from '../components/placeholderPost/noPostsPlaceholder';
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
		if(ReactSession.get('username') != "")
			this.getPosts();
	}

	//retrieves our posts from people that are currently followed
	getPosts = () => {
		axios.post('/api/contentfeedAPI/getFollowingPosts', {
			username: ReactSession.get('username')
		}) //api route goes here
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
				{this.state.posts.length ==0? <NoPostsPlaceholder /> : <PlaceholderPost />}
			</div> 
		);
	}
}

export default feed;
