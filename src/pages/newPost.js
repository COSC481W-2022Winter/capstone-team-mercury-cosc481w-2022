import React from 'react';
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import pagecss from './page.css'
import Navigation from '../components/Navigation';
import TagAdder from '../components/TagAdder';
import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils';
import MustLogin from '../components/mustLogin';

//The idea is to give the react component control over the form
class login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {content: '', filename: '', redir: false, selectedFiles: [], imgURL: null};

    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uploadAllFiles = this.uploadAllFiles.bind(this);
    this.checkFileSize = this.checkFileSize.bind(this)
  }

  checkFileSize(files) {
    for(var i=0; i < files.length; i++)
      if(files[i].size > 2000000)
        return false;
      return true;
  }

  
  onFileChange = event => {
    
    if (event.target.files.length > 3) {
      // Update the state
      this.setState({ selectedFiles: [] });
      event.target.value = null;
      alert("Too many images selected! Please only upload three at a time.");
    }
    else if(!this.checkFileSize(event.target.files)) {
      this.setState({ selectedFiles: [] });
      event.target.value = null;
      alert("One or more of your images exceeded 2MB! Please upload smaller files.");
    }
    else {       
    
      this.setState({ selectedFiles: event.target.files });
    }
  };

  async uploadAllFiles() {
    var promises = [];

    
    for (var i = 0; i < this.state.selectedFiles.length; i++) {
      var curPromise = this.fileUpload(this.state.selectedFiles[i]);
      promises.push(curPromise);
    }

    alert("Please wait while your post uploads (You will be automatically redirected)");

    return Promise.all(promises);
  }

  fileUpload(file) {
    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", "cutestpaw");
    imageData.append("cloud_name", "cutestpaw");

    return new Promise(function (resolve, reject) {
      fetch("https://api.cloudinary.com/v1_1/cutestpaw/image/upload", {
      method: "post",
      body: imageData
    })
    .then(res => res.json())
    .then(data => {
      var result = data.secure_url;
      resolve(result);
    })
    .catch(err => {
        alert("An error occurred uploading your image: " + err)
        reject(null);
      });
    });
  }

  //runs and updates the state whenever the form's value changes
  handleContentChange(event) {
    this.setState({content: event.target.value});
  }

  async handleSubmit(event) {
    var fileResult = "";
    var tags = [];
    var needsText = (this.state.content == "");
    var needsImage = (this.state.selectedFiles.length == 0);

    if (needsText && needsImage) {
      alert("You can't post an empty post! Please try again.");
      return;
    }

    var tagList = document.querySelector(".tag-list");
    for (var i = 0; i < tagList.options.length; i++) {
      if (tagList.options[i].selected) {
        tags.push(tagList.options[i].value);
      }
    }
    fileResult = await this.uploadAllFiles();
    axios.post('/api/postAPI/newPost', {
      username: ReactSession.get("username"),
      content: this.state.content,
      attachments: fileResult,
      tags: tags
    }).then((response) => {})
    .catch(() => {
      console.log('An error occurred uploading your post');
      return;
    });
    this.setState({redir: true});
  }

  render() {
    if (this.state.redir) {
      return (<Navigate to="../feed" />);
    } else {
      return (
        <div>
          <MustLogin />
          <Navigation />
            <h1 className='header'>New Post</h1>
        <div className="default-div">
            <label>
            Image: &nbsp;
              <input type="file"  onChange={this.onFileChange} multiple accept="image/"/>
            </label>
            <br />
            <label>
              <textarea rows="20" cols="100" placeholder="Write something to post..." className='inform' value={this.state.content} onChange={this.handleContentChange} />
            </label>
            <br />
            <TagAdder />
            <input type="submit" value="Post" onClick={this.handleSubmit} />
          
          </div>
          
        </div>
      );
    }
  }
}

export default login;