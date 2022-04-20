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
		axios.post('/api/userAPI/mostRecentPostsByUser', {
			username: ReactSession.get('username')
		}) //api route goes here
		.then((response) => {
			const data = response.data;
		  	this.setState({ posts: data.posts });
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
				<h3 style={{textAlign: "center"}}>User's Posts</h3>
				{this.displayPosts(this.state.posts)}
				{this.state.posts.length ==0? <h3 style={{textAlign: "center"}}>This user hasn't posted any posts</h3> : null}
			</div> 
		);
	}
}

export default feed;
