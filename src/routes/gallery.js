const express = require('express');
const router = express.Router();
const { getGallery, uploadImage, upload } = require('../controllers/gallery');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getGallery);
router.post('/upload', protect, upload.single('image'), uploadImage);

module.exports = router;
