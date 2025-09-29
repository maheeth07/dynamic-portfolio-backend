
const express = require("express");
const router = express.Router();
const { createContent, getContentBySection, updateContent, deleteContent } = require("../controllers/content.controller.js");

router.post("/", createContent);
router.get("/section/:sectionId", getContentBySection);
router.put("/:id", updateContent);
router.delete("/:id", deleteContent);

module.exports = router;
