import React, { Component, useImperativeHandle } from 'react';
import axios from 'axios';
import { ReactSession } from 'react-client-session';
class FollowButton extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: props.username,
      followed: false,
    };
  }

  componentDidMount = () => {
    axios.post('/api/profileAPI/doesUserFollow', { ///call api for following
      username: this.state.username,
      thisUser: ReactSession.get("username"),
    })
    .then((response) => {
        const data = response.data;
          this.setState({followed: data});
          }
    )
    .catch(() => {
          console.log('Error retrieving data!');
    }); 

  }

   follow = () => {
    axios.post('/api/profileAPI/follow', { //follow/unfollow
      thisUser: ReactSession.get("username"),
      username: this.state.username
    })
    .then((response) => {
      this.setState({followed: !this.state.followed})
          }
    )
    .catch(() => {
          console.log('Error retrieving data!');
    });
  };

  render() {
    if (!this.state.followed) {
      return (
        <div>
          <button className="button" onClick={this.follow}>
            Follow
          </button>
        </div>
      );
    }
    else {
      return (
        <div>
          <button onClick={this.follow}>
            Following
          </button>
        </div>
      );
    }
  }
}

export default FollowButton;
