import React, { useState } from 'react';

const SessionForm = ({ addBird, removeBird }) => {
  const [name, setName] = useState(' ');

  const handleInput = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <input
        onChange={handleInput}
        name="bird"
        id="bird-input"
        type="text"
        value={name}
        placeholder="Species name"
      ></input>
      <button
        onClick={() => {
          addBird(name);
          setName('');
        }}
        type="button"
        className="btn waves-effect waves-light primary"
      >
        Add Birdie
      </button>
      <button id="undo-btn" className="btn waves-effect waves-light btn-flat" onClick={removeBird}>Undo</button>
    </div>
  );
};

export default SessionForm;
