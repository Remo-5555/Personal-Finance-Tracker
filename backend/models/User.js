// models/User.js

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Remove whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true, // No duplicate emails
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', UserSchema);
