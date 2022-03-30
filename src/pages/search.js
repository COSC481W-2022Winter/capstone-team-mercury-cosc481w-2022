import React, { Component } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import pagecss from './page.css'
import Post from '../components/post'
import ProfileBlock from '../components/ProfileBlock';

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
            results: []
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
    handleSubmit(event) {
        if(this.state.query ==="") {
            alert("Please enter a search query!")
            return;
        }
       this.setState({results: [], gotResults: false});
       this.getResults();
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
            exact: this.state.searchExact
        }).then((response) => {
			const data = response.data;
		  	console.log(data);
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
                <div className="post">
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
			</div> 
		);
	}
}

export default search;