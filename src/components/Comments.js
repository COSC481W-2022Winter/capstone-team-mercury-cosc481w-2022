import React, { Component } from 'react';
import axios from 'axios';
import { ReactSession } from 'react-client-session';



class CommentBox extends React.Component {
    constructor(props) {
      super();
      
      this.state = {
        postID : props.postID,
        showComments: true,
        comments: []
      };
    }

    render () {
      const comments = this._getComments();
      let commentNodes;
      let buttonText = 'Show Comments';
      
      if (this.state.showComments) {
        buttonText = 'Hide Comments';
        commentNodes = <div className="comment-list">{comments}</div>;
      }
      
      return(
        <div className="comment-box">
          <CommentForm addComment={this.addComment.bind(this)}/>
          <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
            {buttonText}
          </button>
          <h3>Comments</h3>
          <h4 className="comment-count">
            {this._getCommentsTitle(comments.length)}
          </h4>
          {commentNodes}
        </div>  
      );
    } // end render

    addComment(author, body) {
        this.postcomment(author, body)
        axios.post('/api/postAPI/writeNewComment',  {
            postID: this.state.postID,
            commenter: author,
            comment: body
        }).then((response) => {
      
        }).catch(() => {
                      console.log('An error occoured');
                });
    }
    
    componentDidMount = () => {
        axios.post('/api/postAPI/getAllComments', {
          postID: this.state.postID
        })
        .then((response) => {
            const data = response.data;
              for (var i=0; data.length > i; i++){
                this.postcomment(data[i].commenter, data[i].comment)
              }
        })
        .catch(() => {
              console.log('Error retrieving data!');
        });    
    }

    postcomment(author, body) {
      const comment = {
        id: this.state.comments.length + 1,
        author, // change to username
        body // comment of user on post
      };
      this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.       

    }
    
    _handleClick() {
      this.setState({
        showComments: !this.state.showComments
      });
    }
    
    _getComments() {    
      return this.state.comments.map((comment) => { 
        return (
          <Comment 
            author={comment.author} 
            body={comment.body} 
            key={comment.id} />
        ); 
      });
    }
    
    _getCommentsTitle(commentCount) {
      if (commentCount === 0) {
        return 'No comments yet';
      } else if (commentCount === 1) {
        return "1 comment";
      } else {
        return `${commentCount} comments`;
      }
    }
  } // end CommentBox component
  
  class CommentForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {content: ''};
  
      this.handleContentChange = this.handleContentChange.bind(this);
    }

    handleContentChange(event) {
      this.setState({content: event.target.value});
    }

    render() {
      return (
        <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
          <div className="comment-form-fields">
          <textarea placeholder="Comment" rows="4" value={this.state.content} onChange={this.handleContentChange}></textarea>
          </div>
          <div className="comment-form-actions">
            <button type="submit">Post Comment</button>
          </div>
        </form>
      );
    } // end render

    _handleSubmit(event) { 
      event.preventDefault();   // prevents page from reloading on submit
      let author = ReactSession.get("username");
      this.props.addComment(author, this.state.content);
    }
  } // end CommentForm component
  
  class Comment extends React.Component {
    render () {
      return(
        <div className="comment">
          <p className="comment-header">{this.props.author}</p>
          <p className="comment-body">- {this.props.body}</p>
          <div className="comment-footer">
          </div>
        </div>
      );
    }
  }
  
  export default CommentBox;



