import React, { Component } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import DeleteUser from '../components/deleteUser';
import DeletePosts from '../components/deletePosts';
import ChangePassword from '../components/changePassword';
import { NavLink } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import pagecss from './page.css'

import MustLogin from '../components/mustLogin';
import '../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';

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
				<DeletePosts />
				<DeleteUser />
				
			</div> 
		);
	}
}

export default accountSettings;