import React from 'react';

const BirdDisplay = ({session}) => {
  if (session.birds) {
    return (
      <div className="bird-display card">
      <ul>
        {session.birds.map((bird, i) => (
          <li key={i}>
            {bird}
          </li>
        ))}
      </ul>
      </div>
    );
  } else {
    return (<p>Good luck out there!</p>)
  }
}


export default BirdDisplay;