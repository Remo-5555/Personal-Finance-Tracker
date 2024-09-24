// models/Transaction.js

const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Reference to the User model
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Income', 'Expense', 'Savings'],
    default: 'Expense',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('transaction', TransactionSchema);
