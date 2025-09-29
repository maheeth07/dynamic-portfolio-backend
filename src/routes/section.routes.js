
const express = require("express");
const router = express.Router();
const { createSection, getSections, getSection, updateSection, deleteSection } = require("../controllers/section.controller.js");

router.post("/", createSection);
router.get("/", getSections);
router.get("/:id", getSection);
router.put("/:id", updateSection);
router.delete("/:id", deleteSection);

module.exports = router;
