import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import sha from 'js-sha512';
import { Navigate } from "react-router-dom";
import logincss from './/login.css'
import Navigation from '../components/Navigation';
import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils';
 
//The idea is to give the react component control over the form
class login extends React.Component {
   constructor(props) {
     super(props);
     this.state = {content: '', filename: '', redir: false, selectedFile: null, imgURL: null};
 
     this.handleContentChange = this.handleContentChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.fileUpload = this.fileUpload.bind(this);
   }

   onFileChange = event => {
    
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    
    };


      fileUpload() {
        const imageData = new FormData();
        imageData.append("file", this.state.selectedFile);
        imageData.append("upload_preset", "cutestpaw");
        imageData.append("cloud_name", "cutestpaw");

        return new Promise(function (resolve, reject) {
          fetch("https://api.cloudinary.com/v1_1/cutestpaw/image/upload", {
          method: "post",
          body: imageData
        })
        .then(res=>res.json())
        .then(data=> {
          console.log(data)
          var result = data.secure_url;
          resolve(result);
        })
        .catch(err=> {
          alert("An error occoured uploading your image: " +err)
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
   
     if(this.state.content =='') {//&& if no file later
       alert("You can't post an empty post! Please try again.");
       return;
     }
     
     if(this.state.selectedFile != null)
        fileResult = await this.fileUpload();
     axios.post('/api/postAPI/newPost',  {
        username: ReactSession.get("username"),
        content: this.state.content,
        attachments: fileResult
    }).then((response) => {
    })
            .catch(() => {
                  console.log('An error occoured uploading your post');
                  return;
            });
      this.setState({redir: true});


    }
   render() {
     if(this.state.redir)
        return (<Navigate to="../feed" />);
    else {
     return (
       <div>
          <Navigation />
           <h1 className='header'>New Post</h1>
        <div className='post'>
            <label>
            Image: &nbsp;
              <input type="file"  onChange={this.onFileChange} />
            </label>
            <br />
            <label>
              <textarea rows="25" cols="100" placeholder="Write something to post..." className='inform' value={this.state.content} onChange={this.handleContentChange} />
            </label>
            <br />
            <input type="submit" value="Post" onClick={this.handleSubmit} />
         
          </div>
          
        </div>
    
     )};

     }
   }
export default login;