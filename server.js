const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for frontend
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes (use your authRoutes.js file)
app.use("/api/admin", require("./routes/authRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
