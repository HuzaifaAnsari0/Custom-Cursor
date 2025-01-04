const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-fallback-secret');
    const admin = await Admin.findById(decoded.adminId);

    if (!admin) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Add admin info to request
    req.admin = admin;
    req.token = token;
    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = auth; 