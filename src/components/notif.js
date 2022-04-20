import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Pagecss from "../pages/page.css";
import axios from "axios";

class notif extends Component {
  constructor(props) {
    super();
    this.state = {
      notif: props.notif,
      notifProfilePic: "",
      now: Date.now()
    };
  }

   timeSinceNow = () => {

    var seconds = Math.floor((this.state.now - Date.parse(this.state.notif.time)) / 1000);
  
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
        username: this.state.notif.fromUser,
      })
      .then((response) => {
        this.setState({
          notifProfilePic: response.data[0].avatarurl
        });
      })
      .catch(() => {
        console.log("An error occoured");
      });
  }

  displayNotifText = () => {
    if(this.state.notif.notifType === "admin") {
        return (<>{this.state.notif.context}</>);
    }
    if(this.state.notif.notifType === "like") {
        return (<><NavLink to={"/user/" +this.state.notif.fromUser}>{this.state.notif.fromUser}</NavLink>  liked your <NavLink to={"/post/" +this.state.notif.context}> post</NavLink>! </>);
    }
    else if(this.state.notif.notifType === "comment") {
        return (<><NavLink to={"/user/" +this.state.notif.fromUser}>{this.state.notif.fromUser}</NavLink>  commented on your <NavLink to={"/post/" +this.state.notif.context}> post</NavLink>! </>);
    }
    else {
        return (<><NavLink to={"/user/" +this.state.notif.fromUser}>{this.state.notif.fromUser}</NavLink> followed you!</>);
    }

  }

  //maps each post
  displayNotif = () => {
    return (
      <>
          <NavLink to={"/user/" + this.state.notif.fromUser}><img src={this.state.notifProfilePic} className="notifPFP"/></NavLink>
          {this.displayNotifText()}
          <small style={{float: "right"}}>{this.timeSinceNow()}</small>
      </>
    );
  };

  render() {
    return this.displayNotif();
  }
}
export default notif;
