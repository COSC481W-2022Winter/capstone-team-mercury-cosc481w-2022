import React, { Component } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import { NavLink } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import pagecss from './page.css'

import MustLogin from '../components/mustLogin';
import Placeholder from '../components/placeholderPost/notifPlaceholder';
import NoNotifsPlaceholder from '../components/placeholderPost/noNotifsPlaceholder';
import Notif from '../components/notif';

class notifs extends Component {
	
	state = 
	{
		notifs:[],
        lastNotifsCheckedTime: ""
	}

	//retrieves notifs whenever component mounts
	componentDidMount = () => {
		if(ReactSession.get('username') != "")
			this.getNotifs();
	}

	//retrieves all notifs that are for the user
	getNotifs = () => {
		axios.post('/api/notificationAPI/getNotifs', {
			username: ReactSession.get('username')
		}) //api route goes here
		.then((response) => {
			const data = response.data;
		  	this.setState({ notifs: data });
		})
		.catch(() => {
		  	console.log('Error retrieving data!');
		});

        axios.post('/api/notificationAPI/getUpdateNotifCheckedTime', {
			username: ReactSession.get('username')
		}) //api route goes here
		.then((response) => {
			const data = response.data;
		  	this.setState({ lastNotifsCheckedTime: data });
		})
		.catch(() => {
		  	console.log('Error retrieving data!');
		});
	}
	
	//maps each notif
	displayNotifs = (notifs) => {
		//if there are no notifs
		if (!notifs.length) return null;
		return notifs.map((notif, index) => (
			<div className={notif.time > this.state.lastNotifsCheckedTime? "newNotif": "notif"} style={{ margin: "auto" }}>
				<Notif notif={notif}/>
            </div>
		));
	}
	
	//rendering
	render() {
		return (  
			<div>
				<MustLogin />
				<Navigation />
				{this.displayNotifs(this.state.notifs)}
				{this.state.notifs.length ==0 ? <NoNotifsPlaceholder />: null}
			</div> 
		);
	}
}

export default notifs;
