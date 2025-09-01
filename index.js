const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// In-memory data store for services
let services = [
    { id: 1, name: 'Web Development', description: 'Creating beautiful and functional websites.' },
    { id: 2, name: 'API Development', description: 'Building robust and scalable APIs.' }
];
let nextId = 3;

// In-memory data store for gallery
let gallery = [];
let nextImageId = 1;

// In-memory data store for content
let content = {
    about: {
        title: 'About Me',
        text: 'I am a passionate developer with a love for creating amazing things.'
    }
};

// Hardcoded admin credentials
const adminCredentials = {
    username: 'admin',
    password: 'password'
};

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// POST /api/auth/login - Admin login
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    if (username === adminCredentials.username && password === adminCredentials.password) {
        res.json({ message: 'Login successful.' });
    } else {
        res.status(401).json({ message: 'Invalid credentials.' });
    }
});

// GET /api/services - List services/products
app.get('/api/services', (req, res) => {
    res.json(services);
});

// POST /api/services - Add new service
app.post('/api/services', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required.' });
    }
    const newService = { id: nextId++, name, description };
    services.push(newService);
    res.status(201).json(newService);
});

// GET /api/gallery - Fetch images for public display
app.get('/api/gallery', (req, res) => {
    res.json(gallery);
});

// POST /api/gallery/upload - Upload new image (admin only)
app.post('/api/gallery/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    const newImage = {
        id: nextImageId++,
        filename: req.file.filename,
        path: req.file.path
    };
    gallery.push(newImage);
    // Redirect back to the root page to see the updated gallery
    res.redirect('/');
});

// GET /api/content/about - Get "About" section content
app.get('/api/content/about', (req, res) => {
    res.json(content.about);
});

// PUT /api/content/update - Update any section content (admin)
app.put('/api/content/update', (req, res) => {
    const { section, data } = req.body;
    if (!section || !data) {
        return res.status(400).json({ message: 'Section and data are required.' });
    }
    if (content.hasOwnProperty(section)) {
        content[section] = { ...content[section], ...data };
        res.json(content[section]);
    } else {
        res.status(404).json({ message: 'Section not found.' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
