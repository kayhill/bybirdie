import React, { useState } from 'react';
import UserForm from '../components/user-form';
import Status from '../components/loading-status';


const UserFormsContainer = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(true);

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      {register === true &&
        <div id="register-container">
          <p>Unlock more functionality by creating an account</p>
          <p> Already have an account? <button className="invisible-btn" onClick={()=>{setRegister(false)}}>Log in!</button></p>
          <UserForm id="register" handlePasswordInput={handlePasswordInput} handleUsernameInput={handleUsernameInput} username={username} password={password} />
          <button type="button" onClick={() => {props.register(username, password); setUsername(''); setPassword('')}}>Register</button>
        </div>
      }
      {register === false &&
        <div id="login-container">
          <p>Log in with your existing account</p>
          <UserForm id="login" handlePasswordInput={handlePasswordInput} handleUsernameInput={handleUsernameInput} username={username} password={password} />
          <button type="button" onClick={() => {props.login(username, password); setUsername(''); setPassword('')}}>Log In</button>
        </div>
      }
      <Status status={props.status} />  
    </div>
  )
};

export default UserFormsContainer;