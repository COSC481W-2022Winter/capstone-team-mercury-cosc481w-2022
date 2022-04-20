import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Pagecss from "../pages/page.css";
import axios from "axios";
import Comments from "./Comments";
import Tags from "./Tags";
import Likes from "./Likes";
import { Carousel } from "react-responsive-carousel";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
class post extends Component {
  constructor(props) {
    super();
    this.state = {
      post: props.post,
      posterProfilePic: "",
      now: Date.now()
    };
  }

  timeSinceNow = () => {

    var seconds = Math.floor((this.state.now - Date.parse(this.state.post.time)) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return (Math.floor(interval) + " year" + (interval >=2 ? "s": "") +" ago");
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return (Math.floor(interval) + " month" + (interval >=2 ? "s": "") +" ago");
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return (Math.floor(interval) + " day" +(interval >=2 ? "s": "") +" ago");
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return (Math.floor(interval) + " hour" + (interval >=2 ? "s": "") +" ago");
    }
    interval = seconds / 60;
    if (interval > 1) {
      return (Math.floor(interval) + " minute" + (interval >=2 ? "s": "") +" ago");
    }
    return "just now";
  }

  componentDidMount() {
    axios
      .post("/api/profileAPI/getUserDetails", {
        username: this.state.post.postedBy,
      })
      .then((response) => {
        this.setState({
          posterProfilePic: response.data[0].avatarurl
        });
      })
      .catch(() => {
        console.log("An error occoured");
      });
  }

  handleClick  = (e) => {
    var container = e.target;
    var disallow = ["IMG", "UL", "LI", "BUTTON", "INPUT", "SELECT", "TEXTAREA"];

    if (disallow.indexOf(container.nodeName) !== -1) {
      // e.stopPropagation();
      // e.stopImmediatePropagation();
      e.preventDefault();
    }
  }

  carouselImages = (attachments) => {
    return attachments.map((attachment) => {
      return (
        <div>
          <img
            src={attachment}
            alt="Image Placeholder"
            width="auto"
            height="auto"
          />
        </div>
      );
    });
  };

  displayImages = (attachments) => {
    if (attachments.length > 1) {
      return (
          <Carousel onClickCapture={this.handleClick} showArrows={true} width={500} height={300}>
            {this.carouselImages(attachments)}
          </Carousel>
      );
    } else if (attachments.length == 1) {
      return (
        <img
          src={attachments[0]}
          alt="Image Placeholder"
          width="500"
          height="300"
        />
      );
    }
    return;
  };

  //maps each post
  displayPost = (post) => {
    return (      
      <div>
      <div className="post" style={{ margin: "auto" }}>
        <NavLink className="post-link" onClickCapture={this.handleClick} to={"/post/" + post._id}>
          <div style={{padding: "20px"}}>
            <h4 className="margin-zero">
              {" "}
              <img src={this.state.posterProfilePic} alt="Pfp" className="pfpOnPosts"/><NavLink to={"/user/" + post.postedBy}>{post.postedBy}</NavLink>
            </h4>
            <p style={{float: "right"}}>Posted {this.timeSinceNow()}</p>
            <p>{post.content}</p>
            {this.displayImages(post.attachments)}
            <div>
              <b>Tags: </b>
              <Tags tagList={post.tags} />
            </div>
            <br />
            <Likes postID={"" + post._id} />
            <Comments postID={"" + post._id} />
          </div>
        </NavLink>
      </div>
      </div>
    );
  };

  render() {
    return this.displayPost(this.state.post);
  }
}
export default post;
