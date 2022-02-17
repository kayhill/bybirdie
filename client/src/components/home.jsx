import React from 'react';


const Home = (props) => {  

  return (
    <div>
      {props.loggedIn === true && 
        <div>
          <h2>Welcome {props.user.username}</h2>
          <p>Bird watching is so fun</p>
        </div>
      }
      {props.loggedIn === false &&
      <div>
        <h2>Welcome</h2>
        <p>Bird watching is so fun</p>
        <button type="button">Register</button>
        <button>Log In</button>
      </div>
      }
    </div>
    
    ) 
};

export default Home;