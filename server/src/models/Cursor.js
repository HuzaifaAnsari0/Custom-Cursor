import mongoose from 'mongoose';

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

export const Cursor = mongoose.model('Cursor', cursorSchema);