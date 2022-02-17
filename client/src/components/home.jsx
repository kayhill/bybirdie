import React from 'react';
import UserFormsContainer from '../containers/UserFormsContainer';


const Home = (props) => {  

  return (
    <div>
      {props.loggedIn === true && 
        <div>
          <h2>Welcome {props.user.username}</h2>
          <p>Bird watching is so fun</p>
          <button type='button' onClick={props.logout}>Log Out</button>
        </div>
      }
      {props.loggedIn === false &&
      <div>
        <h2>Welcome</h2>
        <p>Bird watching is so fun</p>
        <UserFormsContainer status={props.status} register={props.register} login={props.login} user={props.user}/>
      </div>
      }
    </div>
    ) 
};

export default Home;