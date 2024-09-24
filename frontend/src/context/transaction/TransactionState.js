// src/context/transaction/TransactionState.js

import React, { useReducer } from 'react';
import axios from 'axios';
import TransactionContext from './transactionContext';
import transactionReducer from './transactionReducer';

import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TRANSACTION,
  TRANSACTION_ERROR,
} from '../types';

const TransactionState = props => {
  const initialState = {
    transactions: [],
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(transactionReducer, initialState);

  // Get Transactions
  const getTransactions = async () => {
    try {
      const res = await axios.get('/api/transactions');

      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Transaction
  const addTransaction = async transaction => {
    try {
      const res = await axios.post('/api/transactions', transaction);

      dispatch({
        type: ADD_TRANSACTION,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete Transaction
  const deleteTransaction = async id => {
    try {
      await axios.delete(`/api/transactions/${id}`);

      dispatch({
        type: DELETE_TRANSACTION,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update Transaction
  const updateTransaction = async transaction => {
    try {
      const res = await axios.put(
        `/api/transactions/${transaction._id}`,
        transaction
      );

      dispatch({
        type: UPDATE_TRANSACTION,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Set Current Transaction
  const setCurrent = transaction => {
    dispatch({ type: SET_CURRENT, payload: transaction });
  };

  // Clear Current Transaction
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        current: state.current,
        error: state.error,
        getTransactions,
        addTransaction,
        deleteTransaction,
        setCurrent,
        clearCurrent,
        updateTransaction,
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionState;
