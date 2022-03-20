
import React from 'react';
import { useParams } from "react-router-dom";
import UserProfile from '../pages/userProfile';

function GetUsername() {

    const { username } = useParams();

    return (
            <UserProfile username={username} />
      
    );
}
export default GetUsername;