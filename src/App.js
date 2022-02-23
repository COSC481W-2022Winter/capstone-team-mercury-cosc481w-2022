import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
 
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import Feed from './pages/feed.js';
import Profile from './pages/profile';
import Navigation from './components/Navigation';
import NewPost from './pages/newPost.js';
import Register from './pages/register.js';
import Login from './pages/login.js';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Profile />
            <Routes>
             <Route path="/" element={<Login />} exact/>
             <Route path="/about" element={<About />}/>
             <Route path="/contact" element={<Contact />}/>
             <Route path="/feed" element={<Feed />}/>
             <Route path="/signup" element={<Register />}/>
             <Route element={<Error />}/>
           </Routes>
		      <Login />

        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;