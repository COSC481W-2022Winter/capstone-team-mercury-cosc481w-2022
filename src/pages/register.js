import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import sha from 'js-sha512';
import Navbar from '../components/Navigation';
import { Navigate } from "react-router-dom";
import pagecss from './page.css'
 
//The idea is to give the react component control over the form
class register extends React.Component {
   constructor(props) {
     super(props);
     this.state = {uname: '', pass: '', confPass: '', redir: false};
 
     this.handleUsernameChange = this.handleUsernameChange.bind(this);
     this.handlePassChange = this.handlePassChange.bind(this);
     this.handleConfPassChange = this.handleConfPassChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }
 
   //runs and updates the state whenever the form's value changes
   handleUsernameChange(event) {
     this.setState({uname: event.target.value});
   }
   handlePassChange(event) {
    this.setState({pass: event.target.value});
  }
  handleConfPassChange(event) {
    this.setState({confPass: event.target.value});
  }
 
   handleSubmit(event) {
     if(this.state.uname =='' || this.state.pass == '' || this.state.confPass == '') {
       alert("Missing username or password! Please try again.");
       return;
     }
     if(this.state.pass.length < 8 || (this.state.pass == this.state.pass.toUpperCase()) || (this.state.pass == this.state.pass.toLowerCase())) {
        alert('Password too weak! Please use a stronger password.');
        return;
     }
     if(this.state.pass != this.state.confPass) {
      alert('Passwords do not match! Please try again.');
      return;
   }

    const hashedPassword = sha.sha512(this.state.pass);
    axios.post('/api/userAPI/checkUser',  {
        username: this.state.uname,
        password: hashedPassword
    }).then((response) => {
                const exists = response.data;
                if(exists) {
                    alert("This username is already taken, please pick another one.");
                    return;
                }
                else {
                    axios.post('/api/userAPI/newUser',  {
                        username: this.state.uname,
                        password: hashedPassword
                    }).then((response) => {
                    })
                            .catch(() => {
                                    console.log('An error occoured');
                            });
                    this.setState({redir: true});
                }
    })
            .catch(() => {
                  console.log('An error occoured');
            });
    }
   render() {
     if(this.state.redir)
        return (<div> New user:&nbsp;{this.state.uname}&nbsp;confirmed. You may now <NavLink to="/">Login </NavLink></div>);
    else {
     return (
       <div>
         <Navbar/>
        <div className='login'>
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
            <label>
              Confirm Password: &nbsp;
              <input type="password" className='inform' value={this.state.confPass} onChange={this.handleConfPassChange} />
            </label>
            <br />
            <input type="submit" value="Sign Up" onClick={this.handleSubmit} />
            <br />
            <p> Already have an account? &nbsp;<NavLink to="../">Login Here!</NavLink></p>
          </div>
          <div className='side'>
            <h2>Welcome to the world of CutestPaw!</h2>
          </div>
        </div>
    
     )};

     }
   }
export default register;