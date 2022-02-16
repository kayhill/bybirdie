import React from 'react';
import { Routes, Route, } from "react-router-dom";
import Home from '../components/home';
import Hotspots from '../components/hotspots';
import Notables from '../components/notables';

const Router = (props) => (
  <div className="router">     
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/hotspots" element={<Hotspots lat={props.lat} lng={props.lng}/>} />
      <Route path="/notables" element={<Notables lat={props.lat} lng={props.lng}/>} />
    </Routes>
  </div>

);

export default Router;