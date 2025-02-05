import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    chapter: { type: String, required: true },
    questions: [{ questionText: String, answer: String }]
});

// Use ES6 export syntax
const Chapters = mongoose.model('Chapter', chapterSchema);

export default Chapters;
