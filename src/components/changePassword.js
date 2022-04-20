import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import sha from 'js-sha512';
import Navbar from '../components/Navigation';
import { Navigate } from "react-router-dom";
import { ReactSession } from 'react-client-session';
 

class changePassword extends React.Component {
   constructor(props) {
     super(props);
     this.state = {oldPass: '', newPass: '', newConfPass: ''};
 
     this.handleOldPassChange = this.handleOldPassChange.bind(this);
     this.handleNewPassChange = this.handleNewPassChange.bind(this);
     this.handleNewConfPassChange = this.handleNewConfPassChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }
 
   //runs and updates the state whenever the form's value changes
   handleOldPassChange(event) {
     this.setState({oldPass: event.target.value});
   }
   handleNewPassChange(event) {
    this.setState({newPass: event.target.value});
  }
  handleNewConfPassChange(event) {
    this.setState({newConfPass: event.target.value});
  }
 
   handleSubmit(event) {
     if(this.state.oldPass ==='' || this.state.newPass === '' || this.state.newConfPass === '') {
       alert("Missing required field(s) Please try again.");
       return;
     }

     if(this.state.newPass.length < 8 || (this.state.newPass === this.state.newPass.toUpperCase()) || (this.state.newPass === this.state.newPass.toLowerCase())) {
        alert('New Password too weak! Please use a stronger password.');
        return;
     }

     if(this.state.newPass !== this.state.newConfPass) {
      alert('New Passwords do not match! Please try again.');
      return;
     }

     if(this.state.newPass === this.state.oldPass) {
      alert('The old and new passwords you provided are the same!');
      return;
     }


    const hashedOldPassword = sha.sha512(this.state.oldPass);
    const hashedNewPassword = sha.sha512(this.state.newPass);

    axios.post('/api/loginAPI/checkUser',  {
      username: ReactSession.get("username"),
      password: hashedOldPassword
  }).then((response) => {
              console.log(response);
              const success = response.data;
              if(!success) {
                alert("Incorrect Password");
                return;
              }
                else {
                  axios.post('/api/userAPI/changePassword',  {
                    username: ReactSession.get("username"),
                    oldPassword: hashedOldPassword,
                    newPassword: hashedNewPassword
                }).then((response) => {
                            const success = response.data;
                            if(success) {
                              alert("Successfully changed your password");
                                this.setState({oldPass: "", newPass: "", newConfPass: ""})
                            }
                            else {
                              alert("Incorrect Password");
                            }
                            }).catch(() => {
                              console.log('An error occoured');
                        });
              }
              }).catch(() => {
                console.log('An error occoured');
          });
    }

   render() {
     return (
      <div style={{marginLeft: "2%"}}>
          <h3>Change Password</h3>
            <label>
            Old Password: &nbsp;
              <input type="password" className='inform' value={this.state.oldPass} onChange={this.handleOldPassChange} />
            </label>
            <br />
            <label>
              New Password: &nbsp;
              <input type="password" className='inform' value={this.state.newPass} onChange={this.handleNewPassChange} />
            </label>
            &nbsp;&nbsp;&nbsp;
            <label>
              Confirm New Password: &nbsp;
              <input type="password" className='inform' value={this.state.newConfPass} onChange={this.handleNewConfPassChange} />
            </label>
            <br />
            <input type="submit" value="Change Password" onClick={this.handleSubmit} />
        </div>
    
     )};

     }
   
export default changePassword;