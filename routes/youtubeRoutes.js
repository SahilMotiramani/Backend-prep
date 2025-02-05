import express from 'express';
import { getYouTubeLinks, addYouTubeLink, deleteYouTubeLink } from '../controllers/YouTubeController.js';

const router = express.Router();

// Get YouTube links for a specific subject and chapter
router.get('/youtube/:subject/:chapter', getYouTubeLinks);

// Add a new YouTube link for a specific subject and chapter
router.post('/youtube/:subject/:chapter', addYouTubeLink);

// Delete a YouTube link by its ID
router.delete('/youtube/:id', deleteYouTubeLink);

export default router;
