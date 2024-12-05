//Student Name: Kisan Rai 
//Student Number: C0910925


// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: false },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userNotes: { type: String, required: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
