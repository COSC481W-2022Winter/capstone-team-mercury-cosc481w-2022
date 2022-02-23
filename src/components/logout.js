// refresh page with local variables cleared, user won't be logged in, send back to main page
import React, { Component } from 'react';
import { ReactSession } from 'react-client-session';
import { Routes, Route, Navigate } from "react-router-dom";
ReactSession.setStoreType('localStorage');

class logout extends React.Component {
    constructor(props) {
      super(props);
      this.state = { redir: false };
    }

    LogoutClick() {
        alert('You logged out!');
        ReactSession.set("username", "");
        this.setState({redir: true});
    }

    render(){
        return(
           
        <div>
             { this.state.redir  ? (<Navigate  to="../" />) : null }
            <input type="submit" value="Logout" onClick={this.LogoutClick.bind(this)} />
        </div>
        )
    }
}
export default logout;