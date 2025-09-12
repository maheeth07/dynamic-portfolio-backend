
const Gallery = require("../models/Gallery");
const cloudinary = require("cloudinary").v2;


exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const { originalname, path, filename, mimetype, size } = req.file;

    const newImage = await Gallery.create({
      filename: originalname || filename,
      url: path,                    
      cloudinary_id: filename,      
      format: mimetype ? mimetype.split("/")[1] : "",
      size: size || 0
    });

    res.status(201).json(newImage);
  } catch (err) {
    console.error("Upload Error:", err);
    next(err);
  }
};


exports.getImages = async (req, res, next) => {
  try {
    const images = await Gallery.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (err) {
    console.error("Get Images Error:", err);
    next(err);
  }
};


exports.deleteImage = async (req, res, next) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    await cloudinary.uploader.destroy(image.cloudinary_id);
    await image.deleteOne();

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error("Delete Image Error:", err);
    next(err);
  }
};
