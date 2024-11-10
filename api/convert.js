// api/convert.js
const express = require('express');
const fileUpload = require('express-fileupload');
const sharp = require('sharp');

const app = express();
app.use(fileUpload());

// Route to handle webp to png conversion
app.post('/api/convert', async (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).send('No file uploaded');
  }

  const webpImage = req.files.image;

  try {
    const pngBuffer = await sharp(webpImage.data).png().toBuffer();

    res.set('Content-Disposition', 'attachment; filename="converted.png"');
    res.set('Content-Type', 'image/png');
    res.send(pngBuffer);
  } catch (err) {
    res.status(500).send('Failed to convert image');
  }
});

module.exports = app;
