import React from 'react';

const UserForm = ({handlePasswordInput, handleUsernameInput, username, password}) => {  
 return(
  <form>
    <input
        onChange={handleUsernameInput}
        name="username"
        id="username-input"
        type="text"
        value={username}
        placeholder="Username"
      ></input>
    <input
      onChange={handlePasswordInput}
      name="password"
      id="password-input"
      type="text"
      value={password}
      placeholder="Password"
    ></input>
  </form>)
}

export default UserForm;