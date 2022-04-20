import React, { Component, useImperativeHandle } from 'react';
import axios from 'axios';
import { ReactSession } from 'react-client-session';
class likesVisibleButton extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: ReactSession.get("username"),
      visible: true
    };
  }

  componentDidMount = () => {
    axios.post('/api/userAPI/areLikesVisible', { ///call api for following
      username: this.state.username
    })
    .then((response) => {
        const data = response.data;
          this.setState({visible: data});
          }
    )
    .catch(() => {
          console.log('Error retrieving data!');
    }); 

  }

   toggleVisible = () => {
    axios.post('/api/userAPI/toggleLikeVisibility', { //follow/unfollow
      username: this.state.username
    })
    .then((response) => {
      this.setState({visible: !this.state.visible})
          }
    )
    .catch(() => {
          console.log('Error retrieving data!');
    });
  };

  render() {
    if (this.state.visible) {
      return (
        <div>
              <h3>Toggle likes visibility</h3>
              <p>Toggle if your liked posts are shown on your profile</p>
              <p>Your Likes are currently visible</p>
          <button className="button" onClick={this.toggleVisible}>
           Hide
          </button>
        </div>
      );
    }
    else {
      return (
        <div>
            <h3>Toggle likes visibility</h3>
              <p>Toggle if your liked posts are shown on your profile</p>
              <p>Your likes are currently not visible</p>
          <button onClick={this.toggleVisible}>
            Show
          </button>
        </div>
      );
    }
  }
}

export default likesVisibleButton;
