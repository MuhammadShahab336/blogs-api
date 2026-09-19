
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes')
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const { authMiddleware } = require('./middleware/authMiddleware');


const app = express()

// Global middleware
app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Blog API is running",
    });
});

app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/posts", authMiddleware, postRoutes);
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

app.use(errorMiddleware)

module.exports = app