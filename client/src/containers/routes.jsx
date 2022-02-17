import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/home';
import Hotspots from '../components/hotspots';
import Notables from '../components/notables';
import UserPage from '../components/user-page';
import SessionContainer from './sessionContainer';

const Router = (props) => (
  <div className="router">
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Home
            register={props.register}
            login={props.login}
            logout={props.logout}
            status={props.status}
            user={props.user}
            loggedIn={props.loggedIn}
          />
        }
      />
      <Route
        path="/hotspots"
        element={<Hotspots lat={props.lat} lng={props.lng} />}
      />
      <Route
        path="/notables"
        element={<Notables lat={props.lat} lng={props.lng} />}
      />
      <Route
        path="/session"
        element={<SessionContainer user={props.user} lat={props.lat} lng={props.lng} />}
      />
      <Route
        path="/history"
        element={<UserPage user={props.user} loggedIn={props.loggedIn} />}
      />
    </Routes>
  </div>
);

export default Router;
