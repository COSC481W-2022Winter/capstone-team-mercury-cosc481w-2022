import React from 'react';
import { ReactSession } from 'react-client-session';

const About = () => {
   ReactSession.set("username", "Wolf");
   console.log(ReactSession.get('username'));
    return (
       <div>
          <h1>About US</h1>
          <p>About US page body content</p>
       </div>
    );
}
 
export default About;