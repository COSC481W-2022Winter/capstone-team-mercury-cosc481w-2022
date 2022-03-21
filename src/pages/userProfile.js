import React, { Component } from 'react';
import axios from 'axios';
import { ReactSession } from 'react-client-session';
//import profilecss from './profile.css';
import Logout from '../components/logout';
import Navigation from '../components/Navigation';
import { Navigate } from 'react-router-dom';


class profile extends Component {
 
        state = 
        {
            username: this.props.username,
            bio: '',
            posts: [],
            likes: [],
            redir: false
        }
    

    componentDidMount() {

        axios.post('/api/userAPI/checkUser',  {
            username: this.state.username
        }).then((response) => {
            if(!response.data) {
                alert("This user does not exist!");
                this.setState({redir: true});
            }
        })
                .catch(() => {
                        console.log('An error occoured');
                });

        axios.post('/api/profileAPI/getBio',  {
            username: this.state.username
        }).then((response) => {
            const data = response.data;
            this.setState({bio: data});
        })
                .catch(() => {
                        console.log('An error occoured');
                });
       }
	
	
	//rendering
	render() {
        if(this.state.redir) 
            return (<Navigate  to="../../feed" />);
        else 
            return (  
                <div>
                    
                    <Navigation />;
                    <div className='userRelatedPosts'>
                        <h2>Likes go here</h2>
                    </div>
                    <div className='userRelatedPosts'>
                        <h2>Posts go here</h2>
                    </div>
                    <div className='profile'>
                        <h2>{this.state.username}</h2>
                        <p>{this.state.bio}</p>
                        {(ReactSession.get("username") == this.state.username)? (<div><p>Edit Profile here</p> <Logout /> </div>): null}
                    </div> 
                </div>
		);
	}
}

export default profile;