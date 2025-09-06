
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const galleryController = require('../controllers/galleryController');

router.get('/', galleryController.getImages);

router.post('/upload', upload.single('image'), galleryController.uploadImage);

router.delete('/:id', galleryController.deleteImage);

module.exports = router;
