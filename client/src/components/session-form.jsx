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
      >
        Add Birdie
      </button>
      <button onClick={removeBird}>Undo</button>
    </div>
  );
};

export default SessionForm;
