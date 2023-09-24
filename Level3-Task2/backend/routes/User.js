const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');
const fetchuser = require('../middleware/fetchuser')
const { body} = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Aminahisagoodgirl'
const bcrypt = require('bcryptjs')
const User = require('../models/User');
// Create a new user
router.post(
    '/users',
    [
      // Validation rules for request body fields
      body('firstName').trim().not().isEmpty().withMessage('First name is required'),
      body('lastName').trim().not().isEmpty().withMessage('Last name is required'),
      body('email').trim().isEmail().withMessage('Invalid email address'),
      body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
      body('cpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      }),
      body('role').trim().not().isEmpty().withMessage('Role is required'),
    ],
    userController.createUser // Call the controller function
  );
  

// Get a list of users
router.get('/users', fetchuser,userController.getUsers);

// Get a user by ID
router.get('/users/:userId', fetchuser, userController.getUserById);

// Update user information
router.put('/users/:userId', fetchuser, userController.updateUser);

// Delete a user
router.delete('/users/:userId', fetchuser, userController.deleteUser);

// Handle email verification
router.get('/verify', async (req, res) => {
  const token = req.query.token;
  console.log(token);
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    
    // Log the decoded token for debugging
    // Log the decoded token and its expiration time
    console.log('Decoded Token:', decodedToken);
    console.log('Token Expiration Time (Unix Timestamp):', decodedToken.exp);

    // Update the user's accountVerified field to 1 (verified)
    await User.findOneAndUpdate(
      { email: decodedToken.email },
      { $set: { accountVerified: true } }
    );

    return res.status(200).json({ message: 'Email verification successful' });
  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(400).json({ error: 'Invalid or expired token' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if the account is verified
    if (!user.accountVerified) {
      return res.status(401).json({ error: 'Email not verified' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(password)
    console.log(user.password)
    console.log(passwordMatch)
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }


    // Create and send a JWT token for authentication
const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);
res.json({ token });
    // // Create and send a JWT token for authentication
    // const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    // res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
