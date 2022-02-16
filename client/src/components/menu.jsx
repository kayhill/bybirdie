import React from 'react';
import { Link } from "react-router-dom";

const Menu = () => (
  <div className="menu">
    <ul>
      <li> <Link to="/hotspots">Hotspots</Link> </li>
      <li> <Link to="/notables">Notables</Link> </li>
    </ul>
 </div>
);

export default Menu;