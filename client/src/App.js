import React, { Component, useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import Hotspots from './components/hotspots';
import Notables from './components/notables';
import Home from './components/home';

import './App.css';

const App = props => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser :(');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  };

  return (
    <div className="router">
      <main>
      <h1>Let's Go Birding!</h1>
      <button onClick={getLocation}>Use My Location</button>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}

      <div className="menu">
          <ul>
            <li> <Link to="/hotspots">Hotspots</Link> </li>
            <li> <Link to="/notables">Notables</Link> </li>
          </ul>
      </div>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/hotspots" element={<Hotspots lat={lat} lng={lng}/>} />
        <Route path="/notables" element={<Notables lat={lat} lng={lng}/>} />

      </Routes>
        
      </main>
    </div>
  );
}

export default App;
