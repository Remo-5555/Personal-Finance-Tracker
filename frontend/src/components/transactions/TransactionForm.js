// src/components/transactions/TransactionForm.js

import React, { useState, useContext, useEffect } from 'react';
import TransactionContext from '../../context/transaction/transactionContext';

const TransactionForm = () => {
  const transactionContext = useContext(TransactionContext);

  const { addTransaction, updateTransaction, clearCurrent, current } =
    transactionContext;

  useEffect(() => {
    if (current !== null) {
      setTransaction(current);
    } else {
      setTransaction({
        text: '',
        amount: '',
        category: 'Expense',
      });
    }
  }, [transactionContext, current]);

  const [transaction, setTransaction] = useState({
    text: '',
    amount: '',
    category: 'Expense',
  });

  const { text, amount, category } = transaction;

  const onChange = e =>
    setTransaction({ ...transaction, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addTransaction(transaction);
    } else {
      updateTransaction(transaction);
    }
    clearForm();
  };

  const clearForm = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>{current ? 'Edit Transaction' : 'Add Transaction'}</h2>
      <input
        type="text"
        name="text"
        value={text}
        onChange={onChange}
        placeholder="Transaction Description"
        required
      />
      <input
        type="number"
        name="amount"
        value={amount}
        onChange={onChange}
        placeholder="Amount"
        required
      />
      <h5>Transaction Type</h5>
      <input
        type="radio"
        name="category"
        value="Income"
        checked={category === 'Income'}
        onChange={onChange}
      />{' '}
      Income{' '}
      <input
        type="radio"
        name="category"
        value="Expense"
        checked={category === 'Expense'}
        onChange={onChange}
      />{' '}
      Expense{' '}
      <input
        type="radio"
        name="category"
        value="Savings"
        checked={category === 'Savings'}
        onChange={onChange}
      />{' '}
      Savings
      <div>
        <input
          type="submit"
          value={current ? 'Update Transaction' : 'Add Transaction'}
        />
      </div>
      {current && (
        <div>
          <button onClick={clearForm}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default TransactionForm;
