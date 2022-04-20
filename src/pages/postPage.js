import React, { Component } from 'react';
import axios from 'axios';
import ProfileBlock from '../components/profileBlock';
import Navigation from '../components/Navigation';
import { Navigate } from 'react-router-dom';
import Post from '../components/postPostPage';

class profile extends Component {
    state = {
        postId: this.props.postId,
        user: null,
        post: null,
        redir: false
    }

    componentDidMount() {
        // Using postId get post data and user data set the state for post and user
        axios.post('/api/postAPI/getPost',  {
            postId: this.state.postId
        }).then((response) => {
            if(!response.data) {
                alert("This post does not exist!");
                this.setState({ redir: true });
            } else {
                this.setState({ user: response.data.user });
                this.setState({ post: response.data.post });
            }
        })
        .catch(() => {
            console.log('An error occoured');
        });
    }
	
	// rendering
	render() {
        if (this.state.redir) {
            return (<Navigate  to="../../feed" />);
        } else { 
            return (  
                <>
                    <Navigation />
                    {this.state.user != null ? <ProfileBlock user={this.state.user} align={"right"}/> : null}
                    {this.state.post != null ? <Post post={this.state.post}/> : null}
                </>
		    );
        }
	}
}
export default profile;