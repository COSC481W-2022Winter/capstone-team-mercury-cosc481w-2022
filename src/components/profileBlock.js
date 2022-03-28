import React, { Component } from 'react';
import { ReactSession } from 'react-client-session';
import pagecss from '../pages/page.css';
import Logout from './logout';
import { NavLink } from 'react-router-dom';

class profileBLock extends Component {
	constructor(props) {
        super();
        this.state = {
          user: props.user
        };
      }

    render() {
        return (
        <div className='profile'>
            <h2>{this.state.user.username}</h2>
            <h3>{this.state.user.name}</h3>
            <p>{this.state.user.bio}</p>
            {this.state.user.website !=undefined || this.state.user.website !=""? (<p><a href={this.state.user.website}>Website</a></p>) : null}
            {(ReactSession.get("username") == this.state.user.username)? (<div><NavLink to="../../editProfile"><input type="submit" value="Edit Profile" /></NavLink> <Logout /> </div>): null}
        </div> 
         );
    }
}
export default profileBLock;