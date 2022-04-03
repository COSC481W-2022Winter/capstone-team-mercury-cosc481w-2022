import React from 'react';
import { ReactSession } from 'react-client-session';
import logo from '../img/logo.png';

import { NavLink } from 'react-router-dom';
import Logout from './logout';
 
const Navigation = () => {
    return (
       <div>
          <img src={logo}/>
          You are logged in as: {ReactSession.get('username')}
          <Logout />
          <NavLink to="/feed">Content Feed</NavLink>
          &nbsp; &nbsp; &nbsp;
          <NavLink to="/newpost">New Post</NavLink>
          &nbsp; &nbsp; &nbsp;
          <NavLink to="/search">Search</NavLink>
          &nbsp; &nbsp; &nbsp;
          <NavLink to={"/user/" +ReactSession.get('username')} >My Profile</NavLink>
       </div>
    );
}
 
export default Navigation;