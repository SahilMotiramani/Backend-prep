import Papers from "../models/Paper.js";

// Get all papers
export const getPapers = async (req, res) => {
    try {
        const papers = await Papers.find();
        res.json(papers);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a paper by ID
export const getPaperById = async (req, res) => {
    console.log(req.params.id);
    try {
        const paper = await Papers.findById(req.params.id);
        if (!paper) return res.status(404).json({ error: 'Paper not found' });
        res.json(paper);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new paper
export const createPaper = async (req, res) => {
    const { title, subject, year, fileUrl } = req.body;
    try {
        const newPaper = new Papers({ title, subject, year, fileUrl });
        await newPaper.save();
        res.json(newPaper);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a paper
export const deletePaper = async (req, res) => {
    try {
        const paper = await Papers.findByIdAndDelete(req.params.id);
        if (!paper) return res.status(404).json({ error: 'Paper not found' });
        res.json({ message: 'Paper deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
