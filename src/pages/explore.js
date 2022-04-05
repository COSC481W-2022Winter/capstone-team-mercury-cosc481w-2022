
import React from 'react';
import Navbar from '../components/Navigation';
import TagAdder from '../components/TagAdder';
//import { ReactSession } from 'react-client-session';
import axios from 'axios';
import pagecss from './page.css'

import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils';
 
//The idea is to give the react component control over the form
class explore extends React.Component {
   constructor(props) {
     super(props);
     this.state = {results: [], gotResults: false};
     this.displayResults = this.displayResults.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }

 
   handleSubmit(event) {
    var tags = [];
    var tagList = document.querySelector(".tag-list");
    for (var i = 0; i < tagList.options.length; i++) {
      if (tagList.options[i].selected) {
        tags.push(tagList.options[i].value);
      }
    }
    if(tags.length ===0 ) {
        alert("Please enter a tag to search for");
        return;
    } 

    this.setState({results: [], gotResults: false});
    axios.post('/api/searchAPI/getPostsWithTag', {
        tag: tags
         }).then((response) => {
         const data = response.data;
            for(var i=0;i< data.length; i++) {
                if(data[i].attachments.length > 0) {
                    this.setState({results: [...this.state.results, ...data[i].attachments]});
                }
            }
            this.setState({gotResults: true});
            console.log(this.state.results);
     })
     .catch((err) => {
             console.log(err);
     });
   }
 
   displayResults() {
    if (!this.state.results.length && this.state.gotResults) {
        return(<h2 style={{textAlign: "center"}}>There weren't any images with those tags </h2>)
    }
    else {
        return  this.state.results.map((img, index) => (
            <>
                <img src={img} className="exploreImage"/>&nbsp;
            </>
        ));


    }

   }

   render() {

      return (
        <div>
          <Navbar />
          <div className='post'>
            <TagAdder />
            <input type="submit" value="Search" onClick={this.handleSubmit}/>
          </div>
          <br/>
            <div className='exploreImageWrapper'>
                {this.displayResults()}
            </div>
          </div>
      );
     }

}
export default explore;

