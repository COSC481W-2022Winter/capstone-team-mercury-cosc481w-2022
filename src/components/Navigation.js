import React from 'react';
import { ReactSession } from 'react-client-session';
import logo from '../img/logo.png';
import pagecss from '../pages/page.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Logout from './logout';

/* React Bootstrap Components */
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = () => {

   console.log(ReactSession.get("username"));
   if(ReactSession.get("username") !== "" && ReactSession.get("username") != undefined) {
      return (
         <Navbar className="nav-color" activeClassName="active" collapseOnSelect expand="lg" variant="dark">
            <Container>
               <Navbar.Brand> <NavLink to="/feed"><img src={logo} className ='navbarLogo'/></NavLink> </Navbar.Brand>
               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                     <Nav.Link activeClassName="active" exact href="/feed">Content Feed</Nav.Link>
                     <Nav.Link activeClassName="active" exact href="/newpost">New Post</Nav.Link>
                     <Nav.Link activeClassName="active" exact href="/search">Search</Nav.Link>
                     <Nav.Link activeClassName="active" exact href="/explore">Explore</Nav.Link>
                     <Nav.Link activeClassName="active" exact href="/notifications">Notifications</Nav.Link>
                  </Nav>
                  <Nav>
                     <NavDropdown title={ReactSession.get('username')} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/settings"> Account Settings </NavDropdown.Item>
                        <NavDropdown.Item href={"/user/" + ReactSession.get('username')}>My Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item> <Logout /> </NavDropdown.Item>
                     </NavDropdown>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      );
   }
   else {
      return(
         <Navbar className="nav-color" activeClassName="active" collapseOnSelect expand="lg" variant="dark">
            <Container>
                  <Navbar.Brand><NavLink to="/" > <img src={logo} className ='navbarLogo'/></NavLink></Navbar.Brand>
               <Nav className="me-auto">
                  <Nav.Link href="/" >Login</Nav.Link>
                  <Nav.Link href="/signup" >Create Account</Nav.Link>
                  <Nav.Link href="/explore">Explore</Nav.Link>
               </Nav>
            </Container>
         </Navbar>
      );
   }
}

export default Navigation;