
const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  filename: { type: String, required: true },         
  url: { type: String, required: true },              
  cloudinary_id: { type: String, required: true },    
  format: { type: String },                           
  size: { type: Number },                             
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', GallerySchema);
