import React, { Component } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import { NavLink } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

import Post from './post';

class feed extends Component {
	constructor(props) {
        super();
        
        this.state = {
          username: props.username,
		  postIds: [],
          posts: []
        };
      }

	//retrieves posts whenever component mounts
	componentDidMount = () => {
		if( this.state.username != "")
			this.getPosts();
	}

	//retrieves our posts from people that are currently followed
	getPosts = () => {
		axios.post('/api/userAPI/mostRecentLikePosts', {
			username: this.state.username
		}) //api route goes here
		.then((response) => {
			const data = response.data;
		  	this.setState({ posts: data.posts.reverse()});
		})
		.catch((err) => {
		  	console.log(err);
		});
	}
	
	//maps each post
	displayPosts = (posts) => {
		//if there are no posts
		if (!posts.length) return null;
		return posts.map((post, index) => (
			<>
				<Post post={post}><NavLink to={"/post/" + post._id} className="post-link"/></Post>
				<br/>
			</>
		));
	}
	
	//rendering
	render() {
		return (  
			<div className="userRelatedPosts">
				{this.state.posts.length !==0?<h3 style={{textAlign: "center"}}>Liked Posts</h3> : null}
				{this.displayPosts(this.state.posts)}
				{this.state.posts.length ==0? <h3 style={{textAlign: "center"}}>This user hasn't liked any posts</h3> : null}
			</div> 
		);
	}
}

export default feed;
