import React, { Component } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import pagecss from './page.css'
import Post from '../components/post'
import ProfileBlock from '../components/profileBlock';

import MustLogin from '../components/mustLogin';

class search extends Component {
	constructor(props) {
        super(props);
        this.state = 
        {
            query: '',
            selectedType: "posts",
            selectedSort: "recent",
            selectedOrder: "descending",
            gotResults: false,
            searchExact: false,
            results: [],
            firstPostTime: null,
		    currPage: 0,
		    morePosts: false,
        }
        this.dispPostOptions = this.dispPostOptions.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleExactChange = this.handleExactChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getResults = this.getResults.bind(this);

    }



    handleExactChange(event) {
        this.setState({searchExact: !this.state.searchExact});
    }
    handleQueryChange(event) {
        this.setState({query: event.target.value});
    }

    handleTypeChange(event) {
        this.setState({results: [], selectedType: event.target.value, gotResults: false});
    }
    handleOrderChange(event) {
        this.setState({selectedOrder: event.target.value});
    }
    handleSortChange(event) {
        this.setState({selectedSort: event.target.value});
    }
    async handleSubmit(event) {
        await this.setState({query: this.state.query.trim()})
        if(this.state.query ==="") {
            alert("Please enter a valid search query!")
            return;
        }
       this.setState({results: [], gotResults: false, currPage: 0, firstPostTime: null, morePosts: true});
       this.getResults();
    }

    displayMorePostsBtn = () => {
		if (this.state.morePosts) {
			return <button className="post" style={{textAlign: "center", verticalAlign: "center", height: "50px"}} onClick={this.getResults}>
					Load more posts
				   </button>
		}
		else return null;
	}

    displayResults() {
		//if there are no posts
		 if (!this.state.results.length && this.state.gotResults) {
            return(<h2 style={{textAlign: "center"}}>This query did not match any  {this.state.selectedType}  </h2>)
        } 
        else if(this.state.selectedType === "posts") {
            return this.state.results.map((post, index) => (
                <div>
                    <Post post={post}/>
                    <br />
                </div>
            ));
            
        }
        else {
            return this.state.results.map((user, index) => (
                <div>
                    <ProfileBlock user={user} align={"center"}/>
                    <br />
                </div>
            ));
        }
	}

	//retrieves our posts
	getResults() {
		axios.post('/api/searchAPI/search', {
            type: this.state.selectedType,
            query: this.state.query,
            sort: this.state.selectedSort,
            order: this.state.selectedOrder,
            exact: this.state.searchExact,
            firstPostTime: this.state.firstPostTime,
			page: this.state.currPage
        }).then((response) => {
			const data = response.data;

            if(this.state.selectedType === "posts") {
                this.setState({results: this.state.results.concat(data.posts), gotResults: true, morePosts: data.more});
                if(this.state.results.length > 1) {
                    this.setState({firstPostTime: this.state.results[0].time})
                }
                this.setState({currPage: this.state.currPage+1});
            }
            else
                this.setState({results: data, gotResults: true});

            this.setState({results: data, gotResults: true});

            
		})
		.catch(() => {
		  	console.log('Error retrieving data!');
		});
	}

	

    dispPostOptions() {
         if(this.state.selectedType === "posts")
            return (
                    <div>
                    <select className="searchOrder" onChange={this.handleSortChange}>
                        <option value="recent" selected={this.state.selectedSort === "recent"}>Most Recent</option>
                        <option value="popular" selected={this.state.selectedSort === "popular"}>Most Popular</option>
                    </select>
                    <label>
                        <input type="radio" name="order" id="asc" value="ascending" checked={this.state.selectedOrder === "ascending"} onChange={this.handleOrderChange}/>
                        Ascending
                    </label>
                    <label>
                        <input type="radio" name="order" id="dec" value="descending" checked={this.state.selectedOrder === "descending"} onChange={this.handleOrderChange}/>
                        Decending
                    </label>
                    </div>
            );
        else return null;
    }
	
	//rendering
	render() {
		return (  
			<div>
				<MustLogin />
				<Navigation />
                <div className="default-div">
                    <input type="text" className='searchbox' value={this.state.query} placeholder="Search..." onChange={this.handleQueryChange} required/>
                    <label>
                        <input type="radio" name="type" id="post" value="posts" checked={this.state.selectedType === "posts"} onChange={this.handleTypeChange}/>
                        Posts
                    </label>
                    <label>
                        <input type="radio" name="type" id="user" value="users" checked={this.state.selectedType === "users"} onChange={this.handleTypeChange}/>
                        Users
                    </label>
                    <label>
                    <input type="checkbox" id="exact" name="exact" value="exact" checked={this.state.searchExact} onChange={this.handleExactChange}></input>
                    Exact matches only
                    </label>
                    <br/>
                    {this.dispPostOptions()}
                    <br />
                    <input type="submit" value="Search" onClick={this.handleSubmit} />
                </div>
                < br/>
				{this.displayResults()}
                {this.displayMorePostsBtn()}
			</div> 
		);
	}
}

export default search;