
const Content = require("../models/content.model.js");

const createContent = async (req, res) => {
  try {
    const { section, title, type, value } = req.body;
    const content = await Content.create({ section, title, type, value });
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getContentBySection = async (req, res) => {
  try {
    const content = await Content.find({ section: req.params.sectionId });
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateContent = async (req, res) => {
  try {
    const { title, type, value } = req.body;
    const content = await Content.findByIdAndUpdate(req.params.id, { title, type, value }, { new: true });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createContent, getContentBySection, updateContent, deleteContent };
