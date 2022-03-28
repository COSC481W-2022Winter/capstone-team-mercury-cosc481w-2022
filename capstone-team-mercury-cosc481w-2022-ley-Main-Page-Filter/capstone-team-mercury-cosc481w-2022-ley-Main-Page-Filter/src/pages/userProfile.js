import React, { Component } from 'react';
import axios from 'axios';
import { ReactSession } from 'react-client-session';
import pagecss from './page.css';
import Logout from '../components/logout';
import Navigation from '../components/Navigation';
import { Navigate, NavLink } from 'react-router-dom';


class profile extends Component {
 
        state = 
        {
            username: this.props.username,
            bio: '',
            name: '',
            website: '',
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

        axios.post('/api/profileAPI/getUserDetails',  {
            username: this.state.username
        }).then((response) => {
            console.log(response)
            console.log(response.data[0].website);
            this.setState({bio: response.data[0].bio,name: response.data[0].name, website: response.data[0].website});
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
                        <h3>{this.state.name}</h3>
                        <p>{this.state.bio}</p>
                        {this.state.website !=undefined || this.state.website !=""? (<p><a href={this.state.website}>Website</a></p>) : null}
                        {(ReactSession.get("username") == this.state.username)? (<div><NavLink to="../../editProfile"><input type="submit" value="Edit Profile" /></NavLink> <Logout /> </div>): null}
                    </div> 
                </div>
		);
	}
}
export default profile;