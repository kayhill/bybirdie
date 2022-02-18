import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ loggedIn }) => {
  return (
    <div className="menu">
      {loggedIn === false && (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/hotspots">Hotspots</Link>
          </li>
          <li>
            <Link to="/notables">Notables</Link>
          </li>
        </ul>
      )}
      {loggedIn === true && (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/hotspots">Hotspots</Link>
          </li>
          <li>
            <Link to="/notables">Notables</Link>
          </li>
          <li>
            <Link to="/session">Session</Link>
          </li>
          <li>
            <Link to="/history">My History</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
