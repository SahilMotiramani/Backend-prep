import Resources from '../models/Resource.js';

// Get all resources
export const getResources = async (req, res) => {
    try {
        const resources = await Resources.find();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get resources' });
    }
};

// Add a new resource
export const addResource = async (req, res) => {
    const { title, subject, type, link } = req.body;
    try {
        const newResource = new Resources({ title, subject, type, link });
        await newResource.save();
        res.status(201).json({ message: 'Resource added successfully', newResource });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add resource' });
    }
};

// Update a resource
export const updateResource = async (req, res) => {
    const { id } = req.params;
    const { title, subject, type, link } = req.body;

    try {
        const updatedResource = await Resources.findByIdAndUpdate(id, { title, subject, type, link }, { new: true });
        if (!updatedResource) return res.status(404).json({ message: 'Resource not found' });
        res.status(200).json({ message: 'Resource updated successfully', updatedResource });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update resource' });
    }
};

// Delete a resource
export const deleteResource = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedResource = await Resources.findByIdAndDelete(id);
        if (!deletedResource) return res.status(404).json({ message: 'Resource not found' });
        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete resource' });
    }
};
