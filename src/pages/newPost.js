import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import sha from 'js-sha512';
import { Navigate } from "react-router-dom";
import logincss from './/login.css'
import CheckLogin from '../components/mustLogin'
import Navigation from '../components/Navigation';
 
//The idea is to give the react component control over the form
class login extends React.Component {
   constructor(props) {
     super(props);
     this.state = {content: '', filename: '', redir: false};
 
     this.handleContentChange = this.handleContentChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.fileInput = React.createRef();
   }
 
   //runs and updates the state whenever the form's value changes
   handleContentChange(event) {
     this.setState({content: event.target.value});
   }
 
   handleSubmit(event) {
    console.log('here');
     if(this.state.content =='') {//&& if no file later
       alert("You can't post an empty post! Please try again.");
       return;
     }
     axios.post('/api/postAPI/newPost',  {
        username: ReactSession.get("username"),
        content: this.state.content,
        attachments: null
    }).then((response) => {
    })
            .catch(() => {
                  console.log('An error occoured');
                  return;
            });
      this.setState({redir: true});


    }
   render() {
     if(this.state.redir)
        return (<Navigate to="../feed" />);
    else {
     return (
       <div>
          <CheckLogin />
          <Navigation />
           <h1 className='header'>New Post</h1>
        <div className='post'>
          <form onSubmit={this.handleSubmit}>
            <label>
            Image: &nbsp;
              <input type="file"  ref={this.fileInput} />
            </label>
            <br />
            <label>
              <textarea rows="25" cols="100" placeholder="Write something to post..." className='inform' value={this.state.content} onChange={this.handleContentChange} />
            </label>
            <br />
            <input type="submit" value="Post" />
          </form>
          </div>
          
        </div>
    
     )};

     }
   }
export default login;