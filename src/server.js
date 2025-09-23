require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});