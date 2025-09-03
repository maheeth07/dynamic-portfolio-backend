
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/gallery', require('./routes/galleryRoutes'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((err, req, res, next) => {
  console.error("Express global error:", err);
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = app;
