
import React, { Component } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import DeleteUser from '../components/deleteUser';
import LikesVisibleButton from '../components/likesVisibilityButton';
import DeletePosts from '../components/deletePosts';
import ChangePassword from '../components/changePassword';

import MustLogin from '../components/mustLogin';

class accountSettings extends Component {
	
	state = 
	{
	}

	render() {
		return (  
			<>
				<MustLogin />
				<Navigation />
        		<ChangePassword/>
				<br/>
				<LikesVisibleButton/>
				<br/>
				<DeletePosts />
				<br/>
				<DeleteUser />
				<br/>
			</> 
		);
	}
}

export default accountSettings;