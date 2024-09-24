// src/components/layout/Header.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Header = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <>
      <li>Hello, {user && user.name}</li>
      <li>
        <a href="#!" onClick={onLogout}>
          Logout
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  return (
    <header>
      <h1>
        <Link to="/">Personal Finance Tracker</Link>
      </h1>
      <nav>
        <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      </nav>
    </header>
  );
};

export default Header;
