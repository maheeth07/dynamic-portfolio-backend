const Page = require("../models/pages.model.js");
const Admin = require("../models/admin.model.js");

const addSection = async (req, res) => {
    try {
        const adminId = req.admin._id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "ADMIN NOT FOUND AT SECTION CONTROLLER" });
        }
        const { section_name, section_image, section_title, section_description } = req.body;
        const pageId = req.params.pageId;
        const page = await Page.findById(pageId);
        if (!page) {
            return res.status(404).json({ message: "PAGE NOT FOUND AT SECTION CONTROLLER" });
        }
        const newSection = {
            section_name,
            section_image,
            section_title,
            section_description
        }
       const updatedPage = await Page.findByIdAndUpdate(pageId, { $push: { data: newSection } }, { new: true });
       res.status(200).json(updatedPage);
    } catch (error) {
        res.status(500).json("ERROR AT SECTION CONTROLLER", error.message);
    }
};

const getSection = async (req, res) => {
    try {
        const adminId = req.admin._id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "ADMIN NOT FOUND AT SECTION CONTROLLER" });
        }
        const pageId = req.params.pageId;

        const page = await Page.findById(pageId);
        if (!page) {
            return res.status(404).json({ message: "PAGE NOT FOUND AT SECTION CONTROLLER" });
        }
        res.status(200).json(page.data);
    } catch (error) {
        res.status(500).json("ERROR AT SECTION CONTROLLER", error.message);
    }
};

const updateSection = async (req, res) => {
    try {
        const { section_name, section_image, section_title, section_description } = req.body;
        const adminId = req.admin._id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "ADMIN NOT FOUND AT SECTION CONTROLLER" });
        }
        const pageId = req.params.pageId;
        const sectionId = req.params.id;
        const page = await Page.findById(pageId);
        if (!page) {
            return res.status(404).json({ message: "PAGE NOT FOUND AT SECTION CONTROLLER" });
        }
       const section = await page.findOne({ "data._id": sectionId });
       
       if (!section) {
           return res.status(404).json({ message: "SECTION NOT FOUND AT SECTION CONTROLLER" });
       }
       section.section_name = section_name ? section_name : section.section_name;
       section.section_image = section_image ? section_image : section.section_image;
       section.section_title = section_title ? section_title : section.section_title;
       section.section_description = section_description ? section_description : section.section_description;
       const updatedPage = await page.save();
        res.status(200).json(section);
    } catch (error) {
        res.status(500).json("ERROR AT SECTION CONTROLLER", error.message);
    }
};

const deleteSection = async (req, res) => {
    try {
        const pageId = req.params.pageId;
        const sectionId = req.params.id;
        const adminId = req.admin._id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "ADMIN NOT FOUND AT SECTION CONTROLLER" });
        }
        const page = await Page.findById(pageId);
        if (!page) {
            return res.status(404).json({ message: "PAGE NOT FOUND AT SECTION CONTROLLER" });
        }
        const section = await Page.findOne({ "data._id": sectionId });
        if (!section) {
            return res.status(404).json({ message: "SECTION NOT FOUND AT SECTION CONTROLLER" });
        }
       page.data.id(sectionId).remove();
       const updatedPage = await page.save();
        res.status(200).json(updatedPage);
    } catch (error) {
        res.status(500).json("ERROR AT SECTION CONTROLLER", error.message);
    }
};
