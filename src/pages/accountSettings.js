
import React, { Component } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import DeleteUser from '../components/deleteUser';
import LikesVisibleButton from '../components/likesVisibilityButton';
import DeletePosts from '../components/deletePosts';
import ChangePassword from '../components/changePassword';
import { NavLink } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import pagecss from './page.css'

import MustLogin from '../components/mustLogin';

class accountSettings extends Component {
	
	state = 
	{
	}

	render() {
		return (  
			<div>
				<MustLogin />
				<Navigation />
        <ChangePassword/>
				<LikesVisibleButton/>
				<DeletePosts />
				<DeleteUser />
				
			</div> 
		);
	}
}

export default accountSettings;