import React, { Component } from 'react';
import axios from 'axios';
import { ReactSession } from 'react-client-session';
import profilecss from './profile.css';
import Logout from '../components/logout';

class profile extends Component {
	
	state = 
	{
		username: '',
		bio: '',
		posts: [],
        likes: []
	}

    componentDidMount() {
        //the api call for this would be useless currently
        this.setState({username: ReactSession.get('username')});

        axios.post('/api/profileAPI/getBio',  {
            username: ReactSession.get("username")
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
		return (  
                <div>
                    <div className='userRelatedPosts'>
                        <h2>Likes go here</h2>
                    </div>
                    <div className='userRelatedPosts'>
                        <h2>Posts go here</h2>
                    </div>
                    <div className='profile'>
                        <h2>{this.state.username}</h2>
                        <p>{this.state.bio}</p>
                        <Logout />
                    </div> 
                </div>
		);
	}
}

export default profile;