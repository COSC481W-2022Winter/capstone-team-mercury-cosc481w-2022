import React, { Component } from 'react';
import axios from 'axios';
import { ReactSession } from 'react-client-session';
import pagecss from './page.css';
import ProfileBlock from '../components/profileBlock';
import Navigation from '../components/Navigation';
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
            console.log(response.data[0]);
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

                        <div className='userRelatedPosts'>
                            {this.state.user.likesVisible?  <h2>Likes go here</h2> : <h2>This user's likes are hidden.</h2>}
                        
                        </div>
                        <div className='userRelatedPosts'>
                            <h2>Posts go here</h2>
                        </div>
                        
                    </div>
                );
            }
            else return null;
	}
}
export default profile;
