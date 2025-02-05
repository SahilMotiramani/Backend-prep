import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
    year: { type: Number, required: true },
    fileUrl: { type: String, required: true }
});

const Papers = mongoose.model('Papers', paperSchema);
export default Papers;