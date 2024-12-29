const express = require('express');
const multer = require('multer');
const path = require('path');
const Cursor = require('../models/Cursor');

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 1024 * 1024 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|svg|ico|cur/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Get all cursors
router.get('/', async (req, res) => {
  try {
    const cursors = await Cursor.find().sort('-createdAt');
    res.json(cursors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload new cursor
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;
    const cssCode = `cursor: url(${process.env.SERVER_URL}${imageUrl}), auto;`;

    const cursor = new Cursor({
      name,
      imageUrl,
      cssCode
    });

    const savedCursor = await cursor.save();
    res.status(201).json(savedCursor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Increment downloads
router.post('/:id/download', async (req, res) => {
  try {
    const cursor = await Cursor.findById(req.params.id);
    if (!cursor) {
      return res.status(404).json({ message: 'Cursor not found' });
    }

    cursor.downloads += 1;
    await cursor.save();
    res.json({ downloads: cursor.downloads });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;