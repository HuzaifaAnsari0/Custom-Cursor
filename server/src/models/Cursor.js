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
  className: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    default: 'Anonymous'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  downloads: { 
    type: Number, 
    default: 0 
  }
}, {
  timestamps: true
});

// Generate className before saving
cursorSchema.pre('save', function(next) {
  if (!this.className) {
    this.className = `cursor-${this.name.toLowerCase().replace(/\s+/g, '-')}`;
  }
  next();
});

module.exports = mongoose.model('Cursor', cursorSchema);