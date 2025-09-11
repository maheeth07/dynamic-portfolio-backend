const Image = require('../models/Image');
const multer = require('multer');
const path = require('path');

// Multer configuration remains the same
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });


const getGallery = async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    try {
        const newImage = new Image({
            filename: req.file.filename,
            path: req.file.path
        });
        const image = await newImage.save();
        res.status(201).json(image);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getGallery,
    uploadImage,
    upload
};