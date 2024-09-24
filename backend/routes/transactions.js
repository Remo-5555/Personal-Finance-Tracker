// routes/transactions.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');

// @route   GET api/transactions
// @desc    Get all user's transactions
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/transactions
// @desc    Add new transaction
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required').notEmpty(),
      check('amount', 'Amount is required').notEmpty(),
      check('amount', 'Amount must be a number').isNumeric(),
    ],
  ],
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return the first error message
      return res.status(400).json({ errors: errors.array() });
    }

    const { text, amount, category } = req.body;

    try {
      const newTransaction = new Transaction({
        text,
        amount,
        category,
        user: req.user.id,
      });

      const transaction = await newTransaction.save();

      res.json(transaction);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/transactions/:id
// @desc    Delete transaction
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log("Transaction ID:", req.params.id);
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      console.log("Transaction not found");
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    console.log("Transaction found:", transaction);
    // Ensure user owns the transaction
    if (transaction.user.toString() !== req.user.id) {
      console.log("Not authorized to delete");
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Transaction.findByIdAndDelete(req.params.id);
    console.log("Transaction removed");

    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      // If ID is not formatted correctly
      return res.status(404).json({ msg: 'Transaction not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
