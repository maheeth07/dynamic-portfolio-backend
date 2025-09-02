const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', registerAdmin); 
router.post('/login', loginAdmin);

router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Welcome Admin', admin: req.admin });
});

module.exports = router;
