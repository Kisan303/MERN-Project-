//Student Name: Kisan Rai 
//Student Number: C0910925

const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all users (Updated route to `/users`)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.json(users); // Send the data back to the frontend as JSON
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
});

// Add a new user
router.post('/addUser', async (req, res) => {
  const { firstName, lastName, dateOfBirth, address1, address2, city, postalCode, country, phoneNumber, email, userNotes } = req.body;

  // Check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send('Email already in use');
  }

  const newUser = new User({
    firstName,
    lastName,
    dateOfBirth,
    address1,
    address2,
    city,
    postalCode,
    country,
    phoneNumber,
    email,
    userNotes
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).send('Error adding user');
  }
});

// Get a single user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    res.status(500).send('Error fetching user');
  }
});

// Update user by ID
router.put('/updateUser/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).send('Error updating user');
  }
});

// Delete user by ID
router.delete('/deleteUser/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('User deleted');
  } catch (err) {
    res.status(500).send('Error deleting user');
  }
});

module.exports = router;
