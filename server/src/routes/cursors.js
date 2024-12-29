import express from 'express';
import multer from 'multer';
import path from 'path';
import { Cursor } from '../models/Cursor.js';

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: 'server/uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 1024 * 1024 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|svg|ico/;
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
  const cursors = await Cursor.find().sort('-createdAt');
  res.json(cursors);
});

// Upload new cursor
router.post('/', upload.single('image'), async (req, res) => {
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
});

// Increment downloads
router.post('/:id/download', async (req, res) => {
  const cursor = await Cursor.findById(req.params.id);
  if (!cursor) {
    res.status(404);
    throw new Error('Cursor not found');
  }

  cursor.downloads += 1;
  await cursor.save();
  res.json({ downloads: cursor.downloads });
});

export default router;