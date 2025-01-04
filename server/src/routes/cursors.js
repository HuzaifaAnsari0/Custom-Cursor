const express = require('express');
const multer = require('multer');
const path = require('path');
const Cursor = require('../models/Cursor');
const auth = require('../middleware/auth');
const fs = require('fs').promises;

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, '../../uploads');
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'cursor-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get pending cursors (protected, admin only)
router.get('/pending', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.admin.role !== 1) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const pendingCursors = await Cursor.find({ status: 'pending' })
      .sort('-createdAt');
    res.json(pendingCursors);
  } catch (error) {
    console.error('Pending cursors error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch pending cursors',
      error: error.message 
    });
  }
});

// Get statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const [total, approved, pending] = await Promise.all([
      Cursor.countDocuments(),
      Cursor.countDocuments({ status: 'approved' }),
      Cursor.countDocuments({ status: 'pending' })
    ]);
    
    res.json({
      total,
      approved,
      pending
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
});

// Get all cursors
router.get('/', async (req, res) => {
  try {
    const cursors = await Cursor.find({ status: 'approved' })
      .sort('-createdAt');
    res.json(cursors);
  } catch (error) {
    console.error('Get cursors error:', error);
    res.status(500).json({ message: 'Failed to fetch cursors' });
  }
});

// Create new cursor
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const { name, createdBy } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Please provide a name for the cursor' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const serverUrl = process.env.VITE_SERVER_URL || 'http://localhost:5000';
    const className = `cursor-${name.toLowerCase().replace(/\s+/g, '-')}`;

    const cursor = new Cursor({
      name,
      imageUrl,
      cssCode: `cursor: url(${serverUrl}${imageUrl}), auto;`,
      className,
      createdBy: createdBy || 'Anonymous',
      status: 'pending'
    });

    const savedCursor = await cursor.save();
    res.status(201).json(savedCursor);
  } catch (error) {
    console.error('Create cursor error:', error);
    res.status(400).json({ message: error.message || 'Failed to create cursor' });
  }
});

// Update cursor status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const cursor = await Cursor.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!cursor) {
      return res.status(404).json({ message: 'Cursor not found' });
    }

    res.json(cursor);
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ message: 'Failed to update status' });
  }
});

// Get cursor by ID (This must come AFTER all other specific routes)
router.get('/:id', async (req, res) => {
  try {
    const cursor = await Cursor.findById(req.params.id);
    if (!cursor) {
      return res.status(404).json({ message: 'Cursor not found' });
    }
    res.json(cursor);
  } catch (error) {
    console.error('Get cursor error:', error);
    res.status(500).json({ message: 'Failed to fetch cursor' });
  }
});

// Serve CSS file for a specific cursor
router.get('/:id/style.css', async (req, res) => {
  try {
    const cursor = await Cursor.findById(req.params.id);
    if (!cursor || cursor.status !== 'approved') {
      return res.status(404).send('/* Cursor not found */');
    }

    const cssContent = `/* ${cursor.name} Cursor by ${cursor.createdBy} */
.cursor-${cursor.name.toLowerCase().replace(/\s+/g, '-')} {
  ${cursor.cssCode}
}`;

    res.setHeader('Content-Type', 'text/css');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.send(cssContent);
  } catch (error) {
    console.error('CSS serve error:', error);
    res.status(500).send('/* Error serving cursor CSS */');
  }
});

// Delete cursor (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.admin.role !== 1) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const cursor = await Cursor.findById(req.params.id);
    if (!cursor) {
      return res.status(404).json({ message: 'Cursor not found' });
    }

    // Delete the image file
    const imagePath = path.join(__dirname, '../../uploads', path.basename(cursor.imageUrl));
    try {
      await fs.unlink(imagePath);
    } catch (error) {
      console.error('Error deleting image file:', error);
      // Continue with deletion even if file removal fails
    }

    // Delete from database
    await Cursor.findByIdAndDelete(req.params.id);

    res.json({ message: 'Cursor deleted successfully' });
  } catch (error) {
    console.error('Delete cursor error:', error);
    res.status(500).json({ message: 'Failed to delete cursor' });
  }
});

module.exports = router;