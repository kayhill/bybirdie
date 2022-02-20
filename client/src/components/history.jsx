import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const URL = 'https://bybirdie.herokuapp.com';

const History = ({ user }) => {
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${URL}/api/session/history?id=${user._id}`)
      .then((res) => res.json())
      .then(
        (items) => {
          setIsLoaded(true);
          setItems(items);
        },
        (error) => {
          setError('Sorry, we encountered a problem getting your history.');
          console.log(error);
        }
      );
  }, [user]);

  return (
    <div>
      {error && <p>{error}</p>}
      {!isLoaded && (
        <p>
          You haven't saved any bird watching sessions yet.{' '}
          <Link to="/session">Begin birding!</Link>
        </p>
      )}
      {isLoaded && (
        <ul>
          {items.map((item, i) => {
            return (
              <li id="history-listitem" key={i} className="card bird-display">
                Location: {item.lat}, {item.lng}
                <br></br>
                Date: {item.createdAt}
                <br></br>
                <ul>
                  {item.birds.map((bird, i) => {
                    return (
                      <li key={i}>
                        <span>{bird}</span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default History;
