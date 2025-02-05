// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import paperRoutes from './routes/paperRoutes.js';
import youtubeRoutes from './routes/youtubeRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js'; // ES6 import


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // To parse JSON requests

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Use paper routes
app.use('/api/papers', paperRoutes);

// Use the YouTube routes
app.use('/', youtubeRoutes);

// Use the resource routes
app.use('/api', resourceRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
