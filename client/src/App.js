import React, { useState } from 'react';

import MainContainer from './containers/mainContainer';
import logo from './components/images/bybirdie_logo.png';

import './App.css';

const URL = 'https://bybirdie.herokuapp.com';

const App = () => {
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [status, setStatus] = useState(null);
  const [enabled, setEnabled] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser :(');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setEnabled(true);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus('Unable to retrieve your location');
        }
      );
    }
  };

  function register(username, password) {
    setStatus('Registering...');
    fetch(`${URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then(
        (user) => {
          setStatus(null);
          setLoggedIn(true);
          setUser(user);
        },
        (error) => {
          setStatus('Sorry, that username is already taken.');
          console.log(error);
        }
      );
  }

  function login(username, password) {
    setStatus('Logging in...');
    fetch(`${URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then(
        (user) => {
          setStatus(null);
          setLoggedIn(true);
          setUser(user);
        },
        (error) => {
          setStatus(
            'An error occured. Please check your credentials and try again.'
          );
          console.log(error);
        }
      );
  }

  const logout = () => {
    setUser('');
    setLoggedIn(false);
  };

  return (
    <div id="app">
      <header className="App-header">
        <img className="App-logo" alt="By Birdie Logo" src={logo} />
        <h1>ByBirdie</h1>
      </header>
      <main>
        <MainContainer
          user={user}
          loggedIn={loggedIn}
          lat={lat}
          lng={lng}
          status={status}
          enabled={enabled}
          getLocation={getLocation}
          register={register}
          logout={logout}
          login={login}
        />
      </main>
    </div>
  );
};

export default App;
