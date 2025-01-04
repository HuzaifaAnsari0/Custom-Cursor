// Using Sharp for image resizing
const sharp = require('sharp');

// In your get cursor route
router.get('/cursors/:id/image', async (req, res) => {
  try {
    const { width, height } = req.query;
    let imageBuffer = // ... get your image buffer ...

    if (width && height) {
      imageBuffer = await sharp(imageBuffer)
        .resize(parseInt(width), parseInt(height))
        .toBuffer();
    }

    res.send(imageBuffer);
  } catch (error) {
    res.status(500).send(error);
  }
}); 