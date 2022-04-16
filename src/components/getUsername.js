
import React from 'react';
import { useParams } from "react-router-dom";
import UserProfile from '../pages/userProfile';

function GetUsername() {

    const { username } = useParams();
    const k = username;

    return (
            <UserProfile username={username} key={k} />
      
    );
}
export default GetUsername;