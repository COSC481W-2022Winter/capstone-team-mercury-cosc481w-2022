import React, { Component } from "react";
import { ReactSession } from "react-client-session";
import pagecss from "../pages/page.css";
import FollowButton from './followButton';
import Logout from "./logout";
import { NavLink } from "react-router-dom";

class profileBLock extends Component {
  constructor(props) {
    super();
    this.state = {
      user: props.user,
      align: props.align,
    };
  }

  render() {
    return (
      <div
        class="profile"
        style={
          this.state.align === "center"
            ? { margin: "auto" }
            : { float: this.state.align }
        }>
        <div class="card">
          <div class="ds-top">
            <img src={this.state.user.bannerurl} alt="Banner"></img>
          </div>
          <div class="avatar-holder">
            <img src={this.state.user.avatarurl} alt="Profile Picture"></img>
          </div>
        </div>
        <div class="profiledata">
          <h2>{this.state.user.username}</h2>
          <h3>{this.state.user.name}</h3>
          <p>{this.state.user.bio}</p>
          {this.state.user.website != undefined ||
          this.state.user.website != "" ? (
            <p>
              <a href={this.state.user.website}>Website</a>
            </p>
          ) : null}
          {ReactSession.get("username") == this.state.user.username ? (
            <div>
              <NavLink to="../../editProfile">
                <input type="submit" value="Edit Profile" />
              </NavLink>{" "}
              {/* <Logout />{" "} */}
        </div> 
         ) : null}
         {!(((ReactSession.get("username") == this.state.user.username) || ReactSession.get("username") == "")) && <FollowButton username={this.state.user.username}/>}
         </div> 
         </div> 
    );}
}
export default profileBLock;
