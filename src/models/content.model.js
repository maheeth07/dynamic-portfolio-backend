
const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  section: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
});

module.exports = mongoose.model("Content", contentSchema);
