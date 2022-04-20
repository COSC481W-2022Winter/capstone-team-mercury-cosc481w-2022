import React, { Component, useImperativeHandle } from 'react';
import axios from 'axios';
import sha from 'js-sha512';
import pagecss from '../pages/page.css'
import { ReactSession } from 'react-client-session';
class deletePosts extends React.Component {
  constructor(props) {
    super();
    this.state = {
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
                  if (window.confirm("Warning: This will permanently delete all posts associated with your Cutest Paw account. Are you sure you would like to continue?") === true) {
                  
                    axios.post('/api/userAPI/deletePosts', {
                      username: ReactSession.get("username")
                    })
                    .then((response) => {
                      alert("Your posts have been successfully deleted");
                      this.setState({pass: ""})
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
  
      return (
        <div style={{marginLeft: "2%"}}>
            <h3>Delete my Posts</h3>
            <p>Permanently delete all of your posts</p>
            <p>WARNING: This action can not be undone!</p>
              Confirm your password: <input type="password"  className='inform' value={this.state.pass} onChange={this.handlePassChange} />
              <input type="submit" value="Delete Posts" id='deleteButton' onClick={this.handleSubmit} />
          </div>
      );
  }
}



export default deletePosts;