import Chapters from '../models/Chapter.js';
import ChapterQuestions from '../models/chapterQuestion.js';
import multer from 'multer';
import path from 'path';

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to file name
    }
});

const upload = multer({ storage });

// Get chapters by subject
export const getChapters = async (req, res) => {
    const { subject } = req.params;
    try {
        const chapters = await Chapters.find({ subject });
        if (!chapters || chapters.length === 0) {
            return res.status(404).json({ message: 'No chapters found for this subject' });
        }
        res.json(chapters);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get questions for a specific chapter
export const getChapterQuestions = async (req, res) => {
    const { subject, chapter } = req.params;
    try {
        const questions = await ChapterQuestions.find({ subject, chapter });
        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for this chapter' });
        }
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add new question to chapter with file upload
export const addChapterQuestion = async (req, res) => {
    const { subject, chapter } = req.params;
    const { questionText, answer } = req.body;

    // Access the uploaded file from req.file
    if (!req.file) {
        return res.status(400).json({ error: 'File is required' });
    }

    try {
        const newQuestion = new ChapterQuestions({
            subject,
            chapter,
            questionText,
            answer,
            fileUrl: req.file.path // Store the path to the uploaded file
        });
        await newQuestion.save();
        res.json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a question from a chapter
export const deleteChapterQuestion = async (req, res) => {
    const { subject, chapter, id } = req.params;
    try {
        const question = await ChapterQuestions.findOneAndDelete({ _id: id, subject, chapter });
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Export upload middleware for use in routes
export const uploadMiddleware = upload.single('file'); // 'file' is the key in the form data
