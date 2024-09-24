// server.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Initialize Express
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/users', require('./routes/users'));  // <-- Make sure this line exists
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));

// Set Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
