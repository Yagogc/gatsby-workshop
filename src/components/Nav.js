import React from 'react';
import { Link } from 'gatsby';
import NavStyles from './styles/nav.module.css';

const Nav = () => (
  <nav className={NavStyles.nav}>
    <ul>
      <li>
        <Link activeClassName={NavStyles.active} to="/">
          Home
        </Link>
      </li>
      <li>
        <Link activeClassName={NavStyles.active} to="/about">
          About
        </Link>
      </li>
      <li>
        <Link activeClassName={NavStyles.active} to="/users">
          Users
        </Link>
      </li>
      <li>
        <Link activeClassName={NavStyles.active} to="/tips">
          🔥 Tips
        </Link>
      </li>
    </ul>
  </nav>
);
export default Nav;
