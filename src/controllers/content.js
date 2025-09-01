const Content = require('../models/Content');

const getAboutContent = async (req, res) => {
    try {
        let content = await Content.findOne({ section: 'about' });
        if (!content) {
            // Create default content if it doesn't exist
            content = new Content({
                section: 'about',
                title: 'About Me',
                text: 'I am a passionate developer with a love for creating amazing things.'
            });
            await content.save();
        }
        res.json(content);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const updateContent = async (req, res) => {
    const { section, data } = req.body;
    try {
        let content = await Content.findOneAndUpdate(
            { section: section },
            { $set: data },
            { new: true, upsert: true } // new: true returns the updated document, upsert: true creates it if it doesn't exist
        );
        res.json(content);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAboutContent,
    updateContent
};