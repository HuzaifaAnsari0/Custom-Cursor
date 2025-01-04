const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();

// Admin signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: email, password, and name' 
      });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user with default role (0)
    const admin = new Admin({
      email,
      password,
      name
    });

    await admin.save();

    // Generate token
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET || 'your-fallback-secret',
      { expiresIn: '24h' }
    );

    // Send response
    res.status(201).json({
      message: 'Account created successfully',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Signup Error:', error);
    res.status(400).json({ 
      message: error.message || 'Failed to create account' 
    });
  }
});

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Please provide both email and password' 
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET || 'your-fallback-secret',
      { expiresIn: '24h' }
    );

    // Send response
    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ 
      message: error.message || 'Login failed' 
    });
  }
});

module.exports = router; 