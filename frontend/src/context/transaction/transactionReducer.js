// src/context/transaction/transactionReducer.js

import {
    GET_TRANSACTIONS,
    ADD_TRANSACTION,
    DELETE_TRANSACTION,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_TRANSACTION,
    TRANSACTION_ERROR,
  } from '../types';
  
  const transactionReducer = (state, action) => {
    switch (action.type) {
      case GET_TRANSACTIONS:
        return {
          ...state,
          transactions: action.payload,
        };
      case ADD_TRANSACTION:
        return {
          ...state,
          transactions: [action.payload, ...state.transactions],
        };
      case UPDATE_TRANSACTION:
        return {
          ...state,
          transactions: state.transactions.map(transaction =>
            transaction._id === action.payload._id ? action.payload : transaction
          ),
        };
      case DELETE_TRANSACTION:
        return {
          ...state,
          transactions: state.transactions.filter(
            transaction => transaction._id !== action.payload
          ),
        };
      case SET_CURRENT:
        return {
          ...state,
          current: action.payload,
        };
      case CLEAR_CURRENT:
        return {
          ...state,
          current: null,
        };
      case TRANSACTION_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default transactionReducer; // Named export
  