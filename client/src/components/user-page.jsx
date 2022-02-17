import React from 'react';
import { Link } from 'react-router-dom';
import History from './history';


const UserPage = (props) => {
  return (
    <div id="userHistory">      
    {props.loggedIn &&
      <div>
      <h2>Welcome back, {props.user.username}</h2>
      <History user={props.user}/>
      </div>
    
    }
    {!props.loggedIn &&
      <p>Please  <Link to="/">Login</Link> to view this page.</p>
    }
  </div>
);  
}

export default UserPage;