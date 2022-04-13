import React, { Component, useImperativeHandle } from 'react';
import axios from 'axios';
import sha from 'js-sha512';
import pagecss from '../pages/page.css'
import { ReactSession } from 'react-client-session';
import unliked from '../img/unliked.png';
import liked from '../img/liked.png';
import yesno from "yesno-dialog";
import { Navigate } from "react-router-dom";
class HeartButton extends React.Component {
  constructor(props) {
    super();
    this.state = {
      redir: false,
      pass: ""
    };
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePassChange(event) {
    this.setState({pass: event.target.value});
  }


  componentDidMount = () => {
    
  }


  



 

   async handleSubmit(event) {
    if(this.state.pass == '') {
      alert("Missing username or password! Please try again.")
      return;
    }
   const hashedPassword = sha.sha512(this.state.pass);

    await axios.post('/api/loginAPI/checkUser',  {
     username: ReactSession.get("username"),
     password: hashedPassword
    }).then((response) => {
             const data = response.data;
             if(!data) {
               alert("Incorrect Password")
               return;
             }
             else {
                  if (window.confirm("Warning: This will permanently delete your Cutest Paw account, including your posts, likes, and comments. Are you sure you would like to continue?") === true) {
                  
                    axios.post('/api/userAPI/deleteUser', {
                      username: ReactSession.get("username")
                    })
                    .then((response) => {
                      alert("Your account has been successfully deleted");
                      ReactSession.set("username", "");
                      this.setState({redir: true});
                    })
                    .catch(() => {
                          console.log('Error retrieving data!');
                    });  
                  }
            }

    }).catch(() => {
               console.log('An error occoured');
         }
    );
  }

  render() {
    const likes = this.state.likes;
    if (this.state.redir) {
        return (
            <Navigate to="../" />
        );
    }
    else {
        return (
            <>
              <h3>Delete my Account</h3>
              <p>Permanently delete your account, including your posts, likes, comments, and all other information</p>
              <p>WARNING: This action can not be undone!</p>
                Confirm your password: <input type="password"  className='inform' value={this.state.pass} onChange={this.handlePassChange} />
                <input type="submit" value="Delete Account" id='deleteButton' onClick={this.handleSubmit} />
            </>
        );
    }
  }
}



export default HeartButton;