const express = require('express');
const router = express.Router();
const { getServices, addService } = require('../controllers/services');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getServices);
router.post('/', protect, addService);

module.exports = router;
