const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  section_name: String,
  section_image: String,
  section_title: String,
  section_description: String,
});

const pageSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  data: [sectionSchema],
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" } 
});

module.exports = mongoose.model("Page", pageSchema);
