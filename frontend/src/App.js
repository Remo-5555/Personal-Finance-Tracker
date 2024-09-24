// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from './context/auth/AuthState';
import TransactionState from './context/transaction/TransactionState';
import setAuthToken from './utils/setAuthToken';

import './App.css';

// Set token header for axios if token exists
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <TransactionState>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<PrivateRoute component={Home} />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </TransactionState>
    </AuthState>
  );
}

export default App;
