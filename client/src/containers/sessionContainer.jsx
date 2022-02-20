import React, { useState } from 'react';
import Status from '../components/loading-status';
import SessionDisplay from '../components/session-display';

const SessionContainer = ({ user, lat, lng }) => {
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState(null);
  const [session, setSession] = useState({});

  const URL = 'https://bybirdie.herokuapp.com';

  const endSession = () => {
    setSession({});
    setStarted(false);
  }

  const startSession = () => {
    setStatus('Loading...');
    fetch(`${URL}/api/session/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lat: lat,
        lng: lng,
        user_id: user._id
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setStatus(null);
          setSession(result);
          setStarted(true);
        },
        (error) => {
          setStatus('An error occured');
          console.log(error);
        }
      );
  };

  function addBird(bird) {
    setStatus('Loading...');
    fetch(`${URL}/api/session/add`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: session._id,
        bird: bird,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setStatus(null);
          setSession(result);
        },
        (error) => {
          setStatus('An error occured');
          console.log(error);
        }
      );
  }

  const removeBird = () => {
    setStatus('Loading...');
    fetch(`${URL}/api/session/delete`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: session._id,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setStatus(null);
          setSession(result);
        },
        (error) => {
          setStatus('An error occured');
          console.log(error);
        }
      );
  }

  return (
    <div id="sessionContainer">
      <h2>Birdwatching Session</h2>
      <p>Grab your binoculars, it's time to get birding! Keep track of any birds you spot during today's bird watching session. </p>
      {!started && <button className="waves-effect waves-light btn primary" onClick={startSession}>New Session</button>}
      {started && (
        <div id="sessionDisplay">
          <Status status={status} />
          <SessionDisplay addBird={addBird} removeBird={removeBird} endSession={endSession} session={session}/>
        </div>
      )}
    </div>
  );
};

export default SessionContainer;
