// src/components/routing/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
