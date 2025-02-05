import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
    type: { type: String, required: true }, // Paper, Video, etc.
    link: { type: String, required: true }
});

export default mongoose.model('Resources', resourceSchema);
