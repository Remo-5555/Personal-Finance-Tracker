// src/components/pages/Home.js

import React, { useEffect, useContext } from 'react';
import Transactions from '../transactions/Transactions';
import TransactionForm from '../transactions/TransactionForm';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <TransactionForm />
      </div>
      <div>
        <Transactions />
      </div>
    </div>
  );
};

export default Home;
