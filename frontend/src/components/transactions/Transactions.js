// src/components/transactions/Transactions.js

import React, { useContext, useEffect } from 'react';
import TransactionContext from '../../context/transaction/transactionContext';
import TransactionItem from './TransactionItem';

const Transactions = () => {
  const transactionContext = useContext(TransactionContext);

  const { transactions, getTransactions, loading } = transactionContext;

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  if (transactions !== null && transactions.length === 0 && !loading) {
    return <h4>Please add a transaction</h4>;
  }

  return (
    <>
      {transactions !== null && !loading ? (
        <ul>
          {transactions.map(transaction => (
            <TransactionItem key={transaction._id} transaction={transaction} />
          ))}
        </ul>
      ) : (
        <h4>Loading...</h4>
      )}
    </>
  );
};

export default Transactions;
