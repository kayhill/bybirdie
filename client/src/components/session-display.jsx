import React from 'react';
import SessionForm from './session-form';
import BirdDisplay from './bird-display';

const SessionDisplay = ({ endSession, session, addBird, removeBird }) => {
  return (
    <div>
      <SessionForm removeBird={removeBird} addBird={addBird} />
      <BirdDisplay session={session} />   
      <button onClick={endSession} type="button">End Session</button>   
    </div>
  );
};

export default SessionDisplay;
