/* login.js file ......
........*/


import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import sha from 'js-sha512';
import logincss from './/login.css'
 
//The idea is to give the react component control over the form
class login extends React.Component {
   constructor(props) {
     super(props);
     this.state = {uname: '', pass: ''};
 
     this.handleUsernameChange = this.handleUsernameChange.bind(this);
     this.handlePassChange = this.handlePassChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }
 
   //runs and updates the state whenever the form's value changes
   handleUsernameChange(event) {
     this.setState({uname: event.target.value});
   }
   handlePassChange(event) {
    this.setState({pass: event.target.value});
  }
 
   handleSubmit(event) {
     if(this.state.uname =='' || this.state.pass == '') {
       alert("Missing username or password! Please try again.")
       return;
     }
    const hashedPassword = sha.sha512(this.state.pass);
    alert(hashedPassword);
     //insert API Call here
     axios.post('/api',  {
      username: this.state.uname,
      password: hashedPassword
  }).then((response) => {
              const data = response.data;
              if(data) {
                ReactSession.set("username", this.state.uname);
                //redirect to content feed
              }
              else
                alert("Username and password do not match! Please try again.");
  }).catch(() => {
                console.log('An error occoured');
          });
     event.preventDefault();
   }
 
   render() {
     return (
       <div>
        <div className='login'>
          <form onSubmit={this.handleSubmit}>
            <label>
            Username: &nbsp;
              <input type="text" className='inform' value={this.state.user} onChange={this.handleUsernameChange} />
            </label>
            <br />
            <label>
              Password: &nbsp;
              <input type="password" className='inform' value={this.state.pass} onChange={this.handlePassChange} />
            </label>
            <br />
            <input type="submit" value="Login" />
            <br />
            <p> Don't have an account? &nbsp;<NavLink to="/signup">Sign up Here!</NavLink></p>
          </form>
          </div>
          <div className='side'>
            <h2>Welcome to CutestPaw!</h2>
          </div>
        </div>
     );

     }
   }
export default login;

