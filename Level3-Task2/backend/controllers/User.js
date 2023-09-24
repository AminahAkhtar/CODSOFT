const User = require('../models/User');
const { validationResult } = require('express-validator');
const sendVerificationEmail = require('../middleware/sendVerificationEmail'); // Import the function
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Aminahisagoodgirl'
// Create a new user
async function createUser(req, res) {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      console.log(hashedPassword)
      // Create a new user with hashed password
      const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        cpassword: hashedPassword, // Make sure both fields have the same hashed password
        role: req.body.role,
        accountVerified: false, // Initially set to false
      });
  
      // Generate a verification token
    const verificationToken = jwt.sign({ email: req.body.email }, JWT_SECRET);

    // Send the verification email to the user
    sendVerificationEmail(newUser.email, verificationToken);

    // Generate a JWT token for authentication
    const authtoken = jwt.sign({ userId: newUser._id }, JWT_SECRET);

    // Respond with the JWT token
    res.status(201).json({ success: true, authtoken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
// Get a list of users
async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get a user by ID
async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update user information
async function updateUser(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete a user
async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
