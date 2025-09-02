const express = require('express');
const sectionRouter = express.Router();
const { addSection, getSection, updateSection, deleteSection } = require('../controllers/sectionController');
const { protect } = require('../middlewares/authMiddleware');

sectionRouter.post('/content/add/:pageId', protect, addSection);
sectionRouter.get('/content/get/:pageId', protect, getSection);
sectionRouter.put('/content/update/:pageId/:id', protect, updateSection);
sectionRouter.delete('/content/delete/:pageId/:id', protect, deleteSection);


module.exports = sectionRouter;
