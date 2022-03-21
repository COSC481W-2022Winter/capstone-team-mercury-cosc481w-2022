import React, { Component, useImperativeHandle } from 'react';
import axios from 'axios';
import { ReactSession } from 'react-client-session';
import unliked from '../img/unliked.png';
import liked from '../img/liked.png';
class HeartButton extends React.Component {
  constructor(props) {
    super();
    this.state = {
      postID: props.postID,
      liked: false,
      likes: -1
    };
  }

  componentDidMount = () => {
    axios.post('/api/postAPI/getLikes', {
      postID: this.state.postID
    })
    .then((response) => {
        const data = response.data;
          this.setState({likes: data});
          }
    )
    .catch(() => {
          console.log('Error retrieving data!');
    }); 
    
    axios.post('/api/postAPI/didUserLike', {
      postID: this.state.postID,
      username: ReactSession.get("username")
    })
    .then((response) => {
        const data = response.data;
          this.setState({liked: data});
          }
    )
    .catch(() => {
          console.log('Error retrieving data!');
    });
  }



  addLike = () => {
    axios.post('/api/postAPI/like', {
      postID: this.state.postID,
      username: ReactSession.get("username")
    })
    .then((response) => {
      
          }
    )
    .catch(() => {
          console.log('Error retrieving data!');
    });

    let newCount = this.state.likes + 1;
     this.setState({
     likes: newCount,
     liked: true
     });
  };

  render() {
    const likes = this.state.likes;
    if (!this.state.liked) {
      return (
        <div>
          <button
            className="button"
            onClick={this.addLike}
          >
             <img src={unliked}/>
            Like
          </button>&nbsp;
          {likes} &nbsp;Likes
        </div>
      );
    }
    else {
      return (
        <div>
          <button onClick={this.addLike} disabled>
          <img src={liked}/>
            Liked
          </button>&nbsp;
           {likes} &nbsp;Likes
        </div>
      );
    }
  }
}

export default HeartButton;