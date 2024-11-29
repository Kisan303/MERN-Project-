const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express(); // Initialize the app variable first

// Use CORS middleware
app.use(cors());

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON

// MongoDB connection string from .env
const dbURI = process.env.MONGO_URI; // Correct variable name from .env

// Check if the dbURI is set
if (!dbURI) {
    console.error('MONGO_URI not found in .env file');
    process.exit(1); // Exit if the URI is not found
}

// Connect to MongoDB
mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB: ', err));

// Use user routes
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
