const mongoose = require('mongoose');

const cursorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  cssCode: { 
    type: String, 
    required: true 
  },
  downloads: { 
    type: Number, 
    default: 0 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cursor', cursorSchema);