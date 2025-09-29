const jwt = require('jsonwebtoken');
const Admin = require("../models/admin.model.js");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({ name, email, password });
    res.status(201).json({ message: "Admin created successfully", id: admin._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    const admin = await Admin.findOne({ name });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", token: generateToken(admin._id) });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerAdmin, loginAdmin };
