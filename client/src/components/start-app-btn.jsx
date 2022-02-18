import React from 'react';

const StartApp = (props) => {
  return <button id="start-app" className="waves-effect waves-light btn primary" onClick={props.getLocation}>Use My Location</button>;
};

export default StartApp;
