
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import sha from 'js-sha512';
import Navbar from '../components/Navigation';
import pagecss from './page.css'
import { Navigate } from "react-router-dom";
 
//The idea is to give the react component control over the form
class login extends React.Component {
   constructor(props) {
     super(props);
     this.state = {uname: '', pass: '', redir: false};
 
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
     //insert API Call here
     axios.post('/api/loginAPI/checkUser',  {
      username: this.state.uname,
      password: hashedPassword
  }).then((response) => {
              const data = response.data;
              if(data) {
                ReactSession.set("username", this.state.uname);
                this.setState({redir: true});
              }
              else
                alert("Username and password do not match! Please try again.");
  }).catch(() => {
                console.log('An error occoured');
          });
     event.preventDefault();
   }
 
   render() {
     if(this.state.redir) {
      return(<Navigate  to="../feed" />);
     }
     else {
      return (
        <div>
          <Navbar/>
          <h2 style={{textAlign:"center"}}>Welcome back to CutestPaw!</h2>
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
            </div>
          </div>
      );
     }

     }
   }
export default login;

