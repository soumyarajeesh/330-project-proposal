const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
