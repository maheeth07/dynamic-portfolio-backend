
const Section = require("../models/section.model.js");

const createSection = async (req, res) => {
  try {
    const { title } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    const section = await Section.create({ title, slug });
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getSections = async (req, res) => {
  try {
    const sections = await Section.find();
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getSection = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateSection = async (req, res) => {
  try {
    const { title } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    const section = await Section.findByIdAndUpdate(req.params.id, { title, slug }, { new: true });
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteSection = async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createSection, getSections, getSection, updateSection, deleteSection };
