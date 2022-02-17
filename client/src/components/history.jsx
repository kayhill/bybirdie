import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const History = ({ user }) => {
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/api/session/history?id=${user._id}`, {})
      .then((res) => res.json())
      .then(
        (items) => {
          setIsLoaded(true);
          setItems(items);
        },
        (error) => {
          setIsLoaded(true);
          setError('Sorry, we encountered a problem getting your history.');
          console.log(error);
        }
      );
  }, [user]);

  return (
    <div>
      {!isLoaded && <p>Fetching your history...</p>}
      {error && <p>{error}</p>}
      {isLoaded && items.length === 0&& (
        <p>
          You haven't saved any bird watching sessions yet.{' '}
          <Link to="/session">Begin birding!</Link>
        </p>
      )}
      {isLoaded && items.length > 0 && (
        <ul>
          {items.map((item, i) => {
            return (
              <li key={i}>
                {item.lat}, {item.lng}, {item.createdAt}, {item.birds}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default History;
