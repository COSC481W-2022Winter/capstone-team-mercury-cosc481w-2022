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

class search extends Component {
	
	state = 
	{
        query: '',
        searchPost: true,
        searchRecent: true,
        order: true,
        ready: false,
		posts: []
	}



    handleQueryChange(event) {
        this.setState({query: event.target.value});
    }

    handleTypeChange(event) {
        this.setState({searchPost: event.target.value});
    }
    handleOrderChange(event) {
        this.setState({order: event.target.value});
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

	

    dispPostOptions() {
        if(this.state.searchPost)
            return (
                    <select className="searchOrder">
                        <option value="0">Most Recent</option>
                        <option value="1">Most Popular</option>
                    </select>

            );
        else return null;
    }
	
	//rendering
	render() {
		return (  
			<div>
				<MustLogin />
				<Navigation />
                <div className="post">
                    <input type="text" className='searchbox' value={this.state.user} placeholder="Search..." onChange={this.handleQueryChange.bind(this)}/>
                    <input type="radio" name="type" id="post" value="true" checked={true} onChange={this.handleTypeChange.bind(this)}/>
                    <label for="post">Posts</label>
                    <input type="radio" name="type" id="user" value="false" onChange={this.handleTypeChange.bind(this)}/>
                    <label for="user">Users</label>
                    <br/>
                    {this.state.searchPost? this.dispPostOptions() :null }
                    <input type="radio" name="order" id="asc" value="true" onChange={this.handleOrderChange.bind(this)}/>
                    <label for="asc">Ascending</label>
                    <input type="radio" name="order" id="dec" value="false" checked={true} onChange={this.handleOrderChange.bind(this)}/>
                    <label for="dec">Decending</label>
                </div>
				{this.state.ready? this.displayPosts(this.state.posts) : null}
                {this.state.ready? <PlaceholderPost /> : null}
			</div> 
		);
	}
}

export default search;