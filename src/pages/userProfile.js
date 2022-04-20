import React, { Component } from 'react';
import axios from 'axios';
import { ReactSession } from 'react-client-session';
import pagecss from './page.css';
import ProfileBlock from '../components/profileBlock';
import Navigation from '../components/Navigation';
import UserPosts from '../components/profilePosts';
import UserLikes from '../components/profileLikes';
import { Navigate, NavLink } from 'react-router-dom';


class profile extends Component {
 
        state = 
        {
            username: this.props.username,
            user: null,
            posts: [],
            likes: [],
            redir: false,
            loaded: false
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

        axios.post('/api/profileAPI/getUserDetails',  {
            username: this.state.username
        }).then((response) => {
            this.setState({user: response.data[0], loaded: true});
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
            if(this.state.loaded) {
                return (  
                    
                    <div>
                        
                        <Navigation />
                        {this.state.user!=null ?<ProfileBlock user={this.state.user} align={"right"}/> : null}
                        {this.state.user.likesVisible?  <UserLikes username={this.state.username}/> : <div className='userRelatedPosts'><h3 style={{textAlign: "center"}}>This user's likes are hidden.</h3></div>}
                        
                        
                        <UserPosts username={this.state.username}/>
                        
                    </div>
                );
            }
            else return null;
	}
}
export default profile;
