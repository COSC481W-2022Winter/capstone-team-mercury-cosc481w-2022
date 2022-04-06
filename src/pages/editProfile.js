import React, { Component } from "react";
import axios from "axios";
import { ReactSession } from "react-client-session";
import Pagecss from "./page.css";

import MustLogin from "../components/mustLogin";
import Navigation from "../components/Navigation";
import { Navigate } from "react-router-dom";
var FormData = require("form-data");
class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ReactSession.get("username"),
      bio: "",
      name: "",
      website: "",
      redir: false,
      avatarurl: "",
      avataradr: "",
      banneradr: "",
      bannerurl: "",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.handleWebsiteChange = this.handleWebsiteChange.bind(this);
    this.handleavatarChange = this.handleavatarChange.bind(this);
    this.handlebannerChange = this.handlebannerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleBioChange(event) {
    this.setState({ bio: event.target.value });
  }
  handleWebsiteChange(event) {
    var weblink = event.target.value;
    this.setState({ website: weblink });
  }

  handleavatarChange(event) {
    if(event.target.files[0].size > 2000000) {
      event.target.value = null;
      alert("This profile picture exceeds 2MB! Please use a smaller image.");
      return;
    }
    this.setState({ avatarurl: URL.createObjectURL(event.target.files[0]) });
    this.setState({ avataradr: event.target.files[0] });
  }

  handlebannerChange(event) {
    if(event.target.files[0].size > 2000000) {
      event.target.value = null;
      alert("This banner image exceeds 2MB! Please use a smaller image.");
      return;
    }
    this.setState({ bannerurl: URL.createObjectURL(event.target.files[0]) });
    this.setState({ banneradr: event.target.files[0] });
  }

  handleSubmit(event) {
    axios
      .post("/api/profileAPI/editProfile", {
        username: this.state.username,
        bio: this.state.bio,
        name: this.state.name,
        website: this.state.website,
      })
      .then((response) => {})
      .catch(() => {
        console.log("An error occoured");
      });
    if (this.state.avataradr != "") {
      this.avatar();
    }
    if (this.state.banneradr != "") {
      this.banner();
    }
    alert("Your changes have been saved");
    this.setState({redir: true});
  }

  avatar(params) {
    var bodyFormData = new FormData();
    bodyFormData.append("username", this.state.username);
    bodyFormData.append("image", this.state.avataradr);
    console.log(this.state.avataradr);

    axios({
      method: "post",
      url: "/api/profileAPI/updateProfilePic",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  banner(params) {
    var bodyFormData = new FormData();
    bodyFormData.append("username", this.state.username);
    bodyFormData.append("image", this.state.banneradr);
    console.log(this.state.banneradr);

    axios({
      method: "post",
      url: "/api/profileAPI/updatebanner",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  componentDidMount() {
    axios
      .post("/api/profileAPI/getUserDetails", {
        username: this.state.username,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data[0].username);
        this.setState({
          bio: response.data[0].bio,
          name: response.data[0].name,
          website: response.data[0].website,
          avatarurl: response.data[0].avatarurl,
          bannerurl: response.data[0].bannerurl,
        });
      })
      .catch(() => {
        console.log("An error occoured");
      });
  }

  //rendering
  render() {
    if (this.state.redir)
      return <Navigate to={"../user/" + this.state.username} />;
    else
      return (
        <div>
          <MustLogin />
          <Navigation />;
          <div class="userRelatedPosts">
            <label>
              Banner image &nbsp;
              <input
                type="file"
                accept="image/*"
                onChange={this.handlebannerChange}
              />
            </label>
            <br />
            <label>
              profile picture &nbsp;
              <input
                type="file"
                accept="image/*"
                onChange={this.handleavatarChange}
              />
            </label>
            <br />

            <label>
              name: &nbsp;
              <input
                type="text"
                class="inform"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </label>
            <br />
            <label>
              bio: &nbsp;
              <textarea
                rows="10"
                cols="50"
                placeholder="Tell us about yourself..."
                class="inform"
                value={this.state.bio}
                onChange={this.handleBioChange}
              />
            </label>
            <br />
            <label>
              website: &nbsp;
              <input
                type="text"
                class="inform"
                value={this.state.website}
                onChange={this.handleWebsiteChange}
              />
            </label>
            <br />
            <input
              type="submit"
              value="Save Changes"
              onClick={this.handleSubmit}
            />
          </div>
          <div class="profile">
            <h2 class="editPreview">Preview</h2>
            <div class="card">
              <div class="ds-top">
                <img src={this.state.bannerurl} alt="Bannner"></img>
              </div>
              <div class="avatar-holder">
                <img src={this.state.avatarurl} alt="Profile Picture"></img>
              </div>
            </div>
            <h2>{this.state.username}</h2>
            <h3>{this.state.name}</h3>
            <p>{this.state.bio}</p>
            {this.state.website != undefined || this.state.website != "" ? (
              <p>
                <a href={this.state.website} target="_blank">
                  Website
                </a>
              </p>
            ) : null}
          </div>
        </div>
      );
  }
}
export default profile;
