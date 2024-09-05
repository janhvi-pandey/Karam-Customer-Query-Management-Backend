
const Admin=require('../models/Admin')


const express = require('express');
const router = express.Router();

// admin credentials
const adminCredentials = {
  email: 'janhvi23@gmail.com',
  password: 'white@lily'
};

// POST route for admin login
router.post('/adminlogin', (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password match the credentials
  if (email === adminCredentials.email && password === adminCredentials.password) {
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
});

module.exports = router;
