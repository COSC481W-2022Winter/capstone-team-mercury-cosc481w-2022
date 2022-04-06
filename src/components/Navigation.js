import React from 'react';
import { ReactSession } from 'react-client-session';
import logo from '../img/logo.png';
import pagecss from '../pages/page.css'

import { NavLink } from 'react-router-dom';
import Logout from './logout';
 
const Navigation = () => {
   if(ReactSession.get("username") !=="") {
    return (
       <>
       <div className='navbar'>
          
          &nbsp; &nbsp; &nbsp;
          <NavLink to="/feed"><img src={logo} className ='navbarLogo'/>Content Feed</NavLink>
          &nbsp; &nbsp; &nbsp;
          <NavLink to="/newpost">New Post</NavLink>
          &nbsp; &nbsp; &nbsp;
          <NavLink to="/search">Search</NavLink>
          &nbsp; &nbsp; &nbsp;
          <NavLink to="/explore">Explore</NavLink>
          &nbsp; &nbsp; &nbsp;
            <NavLink to={"/user/" +ReactSession.get('username')} >My Profile</NavLink>
            &nbsp; &nbsp; &nbsp;
            You are logged in as: {ReactSession.get('username')}
            &nbsp; &nbsp;
            <Logout />
         </div>
         <br />
        </>
    );
   }
   else {
      return(
         <>
         <div className='navbar'>
          
          <NavLink to="/" > <img src={logo} className ='navbarLogo'/>Login</NavLink>
            &nbsp; &nbsp; &nbsp;
          <NavLink to="/signup" >Create Account</NavLink>
          &nbsp; &nbsp; &nbsp;
          <NavLink to="/explore">Explore</NavLink>
         </div>
         <br />
         </>
      );

   }
}
 
export default Navigation;