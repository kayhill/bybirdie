import React from 'react';
import SessionForm from './session-form';
import BirdDisplay from './bird-display';

const SessionDisplay = ({ endSession, session, addBird, removeBird }) => {
  return (
    <div>      
      <BirdDisplay session={session} />   
      <SessionForm removeBird={removeBird} addBird={addBird} />
      <button id="end-btn" className="btn waves-effect waves-light teal" onClick={endSession} type="button">End Session</button>   
    </div>
  );
};

export default SessionDisplay;
