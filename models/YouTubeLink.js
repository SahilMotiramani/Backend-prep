import mongoose from 'mongoose';

const youtubeLinkSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    chapter: { type: String, required: true },
    videoTitle: { type: String, required: true },
    videoUrl: { type: String, required: true },
    addedAt: { type: Date, default: Date.now }
});

export default mongoose.model('YouTubeLink', youtubeLinkSchema, 'youtubeLinks');  // Explicit collection name

