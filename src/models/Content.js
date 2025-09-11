const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    section: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Content', ContentSchema);
