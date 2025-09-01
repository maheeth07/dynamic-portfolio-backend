const express = require('express');
const router = express.Router();
const { getAboutContent, updateContent } = require('../controllers/content');
const { protect } = require('../middlewares/authMiddleware');

router.get('/about', getAboutContent);
router.put('/update', protect, updateContent);

module.exports = router;
