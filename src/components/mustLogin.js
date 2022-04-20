// Include this component to restrict a page to logged in Users
import React from 'react';
import { ReactSession } from 'react-client-session';
import { Navigate } from "react-router-dom";
ReactSession.setStoreType('localStorage');

class mustLogin extends React.Component {
    constructor(props) {
        super()
    }

    render(){
        if(ReactSession.get("username") == "" || ReactSession.get("username") == 'undefined') 
            return(<Navigate  to="../" /> );
        else 
            return (null);

    }
}
export default mustLogin;