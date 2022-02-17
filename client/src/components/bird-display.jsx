import React from 'react';

const BirdDisplay = ({session}) => {
  if (session.birds) {
    return (
      <ul>
        {session.birds.map((bird, i) => (
          <li key={i}>
            {bird}
          </li>
        ))}
      </ul>
    );
  } else {
    return (<p>Grab those binoculars and get to work!</p>)
  }
}


export default BirdDisplay;