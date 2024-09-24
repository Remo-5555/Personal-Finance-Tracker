// src/components/auth/Register.js

import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error) {
      console.error(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, navigate]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      console.error('Passwords do not match');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            minLength="2"
          />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div>
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
