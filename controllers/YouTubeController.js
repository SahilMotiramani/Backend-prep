import youtubeLinks from '../models/YouTubeLink.js';

// Get all YouTube links for a subject and chapter
export const getYouTubeLinks = async (req, res) => {
    const { subject, chapter } = req.params;
    try {
        const links = await youtubeLinks.find({ subject, chapter });
        console.log(links);
        if (!links || links.length === 0) {
            return res.status(404).json({ message: 'No YouTube links found for this chapter' });
        }
        res.json(links);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add a new YouTube link to a chapter
export const addYouTubeLink = async (req, res) => {
    const { subject, chapter } = req.params;
    const { videoTitle, videoUrl } = req.body;

    if (!videoTitle || !videoUrl) {
        return res.status(400).json({ error: 'Video title and URL are required' });
    }

    try {
        const newLink = new youtubeLinks({
            subject,
            chapter,
            videoTitle,
            videoUrl
        });
        await newLink.save();
        res.json(newLink);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a YouTube link by ID
export const deleteYouTubeLink = async (req, res) => {
    const { id } = req.params;
    try {
        const link = await youtubeLinks.findByIdAndDelete(id);
        if (!link) {
            return res.status(404).json({ message: 'YouTube link not found' });
        }
        res.json({ message: 'YouTube link deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
