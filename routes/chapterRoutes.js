import express from 'express';
import { getChapters, getChapterQuestions, addChapterQuestion, deleteChapterQuestion, uploadMiddleware } from '../controllers/chapterController.js';

const router = express.Router();

// Get chapters by subject
router.get('/:subject', getChapters);

// Get questions for a specific chapter
router.get('/:subject/:chapter', getChapterQuestions);

// Add new question to chapter with file upload
router.post('/:subject/:chapter', uploadMiddleware, addChapterQuestion);

// Delete a question from a chapter
router.delete('/:subject/:chapter/:id', deleteChapterQuestion);

export default router;
