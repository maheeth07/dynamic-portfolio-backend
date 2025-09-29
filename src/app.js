const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const servicesRoutes = require('./routes/services');
const galleryRoutes = require('./routes/gallery');
const sectionRoutes = require('./routes/section.routes.js');
const contentApiRoutes = require('./routes/content.routes.js');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/contents', contentApiRoutes);


module.exports = app;
