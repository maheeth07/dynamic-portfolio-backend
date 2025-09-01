const jwt = require('jsonwebtoken');

// Hardcoded admin credentials
const adminCredentials = {
    username: 'admin',
    password: 'password'
};

const login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    if (username === adminCredentials.username && password === adminCredentials.password) {
        // Create token
        const token = jwt.sign({ username: adminCredentials.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials.' });
    }
};

module.exports = {
    login
};
