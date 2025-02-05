import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes";
import semesterRoutes from "./routes/semesterRoutes";
import cors from 'cors';

const app = express();

// Updated CORS configuration
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://shivpratikhande2017:KWAj0BaKnkHOio9s@cluster0.ggko1.mongodb.net/')
  .then(() => console.log('Connected successfully to MongoDB'))
  .catch(err => console.error("Failed to connect", err));

// Define routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use("/admin", adminRoutes);
app.use("/api", semesterRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
