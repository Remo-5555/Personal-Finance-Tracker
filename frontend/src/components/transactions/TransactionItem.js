// src/components/transactions/TransactionItem.js

import React, { useContext } from 'react';
import TransactionContext from '../../context/transaction/transactionContext';

const TransactionItem = ({ transaction }) => {
  const transactionContext = useContext(TransactionContext);
  const { deleteTransaction, setCurrent, clearCurrent } = transactionContext;

  const { _id, text, amount, category } = transaction;

  const onDelete = () => {
    deleteTransaction(_id);
    clearCurrent();
  };

  return (
    <li>
      <div>
        <strong>{text}</strong>
        <p>
          {category}: ${amount}
        </p>
      </div>
      <div>
        <button onClick={() => setCurrent(transaction)}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </li>
  );
};

export default TransactionItem;
