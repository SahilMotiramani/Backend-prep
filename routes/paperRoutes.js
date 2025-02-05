import express from "express"
const router = express.Router();
import { getPapers, getPaperById, createPaper, deletePaper } from '../controllers/paperController.js';

// Get all papers
router.get('/', getPapers);

// Get a single paper by ID
router.get('/:id', getPaperById);

// Upload a new paper
router.post('/', createPaper);

// Delete a paper by ID
router.delete('/:id', deletePaper);

export default router;