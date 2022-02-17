import React from 'react';
import Status from '../components/loading-status';
import StartApp from '../components/start-app-btn';
import Menu from '../components/menu';
import Router from './routes';

const MainContainer = (props) => {
  return (
    <div id="mainContainer">
    {!props.enabled && 
      <div className="main-display">
      <StartApp getLocation={props.getLocation}/>
      <Status status={props.status}/>
      </div>
    }
    {props.enabled && 
      <div className="main-display">
        <Menu loggedIn={props.loggedIn}/>
        <Router user={props.user} loggedIn={props.loggedIn} lat={props.lat} lng={props.lng}/>
      </div>
    }
  </div>
  )
};

export default MainContainer;
