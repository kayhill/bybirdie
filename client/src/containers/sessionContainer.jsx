import React, { useState } from 'react';
import Status from '../components/loading-status';
import SessionDisplay from '../components/session-display';

const SessionContainer = ({ lat, lng }) => {
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState(null);
  const [session, setSession] = useState({});

  const endSession = () => {
    setSession({});
    setStarted(false);
  }

  const startSession = () => {
    setStatus('Loading...');
    fetch('/api/session/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lat: lat,
        lng: lng,
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
    fetch('/api/session/add', {
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
          console.log(result);
        },
        (error) => {
          setStatus('An error occured');
          console.log(error);
        }
      );
  }

  const removeBird = () => {
    setStatus('Loading...');
    fetch('/api/session/delete', {
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
      <h2>Session</h2>
      {!started && <button onClick={startSession}>Start Session</button>}
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
