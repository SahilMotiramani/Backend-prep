import mongoose from 'mongoose';

const chapterQuestionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    chapter: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,  // This will store the URL or path to the uploaded PDF file
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ChapterQuestion = mongoose.model('ChapterQuestion', chapterQuestionSchema);
export default ChapterQuestion;
