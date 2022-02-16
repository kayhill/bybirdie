import React, { Component, useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import Hotspots from './components/hotspots';
import Notables from './components/notables';
import Home from './components/home';

import MainContainer from './containers/mainContainer';

import './App.css';

const App = props => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [status, setStatus] = useState(null);
  const [enabled, setEnabled] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser :(');

    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setEnabled(true);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  };


  return (
    <div id="app">
      <header><h1>Let's Go Birding!</h1></header>
      <main>
        <MainContainer lat={lat} lng={lng} status={status} enabled={enabled} getLocation={getLocation}/>
      </main>
    </div>
  );
}

export default App;
