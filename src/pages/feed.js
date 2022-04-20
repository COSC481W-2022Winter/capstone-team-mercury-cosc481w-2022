import React, { Component } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import { NavLink } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import pagecss from './page.css'

import MustLogin from '../components/mustLogin';
import PlaceholderPost from '../components/placeholderPost/placeholderPost';
import NoPostsPlaceholder from '../components/placeholderPost/noPostsPlaceholder';
import Post from '../components/post';
import '../components/placeholderPost/placeholderpost.css';
import '../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';

class feed extends Component {
	
	state = 
	{
		posts:[],
		firstPostTime: null,
		currPage: 0,
		morePosts: true,
	}

	//retrieves posts whenever component mounts
	componentDidMount = () => {
		if(ReactSession.get('username') != "")
			this.getPosts();
	}

	//retrieves our posts from people that are currently followed
	getPosts = () => {
		axios.post('/api/contentfeedAPI/getFollowingPosts', {
			username: ReactSession.get('username'),
			firstPostTime: this.state.firstPostTime,
			page: this.state.currPage
		}) //api route goes here
		.then((response) => {
			const data = response.data;
		  	this.setState({ posts: this.state.posts.concat(data.posts), morePosts: data.more });
			if(this.state.posts.length > 1) {
				this.setState({firstPostTime: this.state.posts[0].time})
			}
			this.setState({currPage: this.state.currPage+1});
		})
		.catch(() => {
		  	console.log('Error retrieving data!');
		});
	}



	displayMorePostsBtn = () => {
		if (this.state.morePosts) {
			return <button className="post" style={{textAlign: "center", verticalAlign: "center", height: "50px"}} onClick={this.getPosts}>
					Load more posts
				   </button>
		}
		else return null;
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
			<div>
				<MustLogin />
				<Navigation />
				{this.displayPosts(this.state.posts)}
				{this.state.posts.length ==0? <NoPostsPlaceholder /> : this.state.morePosts? this.displayMorePostsBtn() : <PlaceholderPost />}
			</div> 
		);
	}
}

export default feed;