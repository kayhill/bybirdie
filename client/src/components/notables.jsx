import React, { useState, useEffect } from 'react';

export default function Notables({ lat, lng }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/api/notables?lat=${lat}&lng=${lng}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [lat, lng]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h2>Notable and Rare Sightings</h2>
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              {item.comName} ... {item.locName}{' '}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
