import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import pagecss from '../pages/page.css'
import Comments from './Comments';
import Tags from './Tags';
import Likes from './Likes';
import { Carousel } from 'react-responsive-carousel';
import '../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
class post extends Component {
	constructor(props) {
        super();
        this.state = {
          post: props.post
        };
      }

    carouselImages = (attachments) => {
        return attachments.map((attachment) => {
            return (<div> 
                <img src={attachment} alt="Image Placeholder" width="auto" height="auto"/>
            </div>);
        })
    }

    displayImages = (attachments) => {
        if (attachments.length > 1) {
            return (<Carousel showArrows={true} width={500} height={300}>
                { this.carouselImages(attachments) } 
            </Carousel>);
        } else if (attachments.length == 1) {
            return (<img src={attachments[0]} alt="Image Placeholder" width="500" height="300"/>);
        }
        return;
    }

    //maps each post
    displayPost = (post) => {
        return (
            <div className = "post" style={{margin: "auto"}}>
                <h4> <NavLink to={'/user/' + post.postedBy}>{post.postedBy}</NavLink></h4> 
                <p><small>{post.time}</small></p>
                <p>{post.content}</p>
                {this.displayImages(post.attachments)}
                <div><b>Tags: </b><Tags tagList={post.tags} /></div> 
                <br />
                <Likes postID={""+post._id} />
                <Comments postID={""+post._id} />
            </div>
        );
    }

    render() {
        return this.displayPost(this.state.post);
    }
}
export default post;