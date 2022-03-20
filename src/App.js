import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
 
import Feed from './pages/feed.js';
import Profile from './pages/profile';
import NewPost from './pages/newPost.js';
import Register from './pages/register.js';
import Login from './pages/login.js';
import UserProfileWrapper from './components/getUsername';
 
ReactSession.setStoreType('localStorage');
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Routes>
             <Route path="/" element={<Login />} exact/>
             <Route path="/profile" element = {<Profile />}/>
             <Route path="/newpost" element = {<NewPost />}/>
             <Route path="/feed" element={<Feed />}/>
             <Route path="/signup" element={<Register />}/>
             <Route path="/user/:username" element={<UserProfileWrapper />}/>
           </Routes>

        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;