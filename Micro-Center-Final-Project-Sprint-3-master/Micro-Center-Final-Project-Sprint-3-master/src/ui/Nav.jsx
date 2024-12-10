import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
        <li style={{ margin: '0 10px' }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ margin: '0 10px' }}>
          <Link to="/login">Login</Link>
        </li>
        <li style={{ margin: '0 10px' }}>
          <Link to="/cart">Cart</Link>
        </li>
        <li style={{ margin: '0 10px' }}>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
