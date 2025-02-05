import express from 'express';
import { getResources, addResource, updateResource, deleteResource } from '../controllers/resourceController.js';

const router = express.Router();

// Get all resources
router.get('/resources', getResources);

// Add a new resource
router.post('/resources', addResource);

// Update a resource
router.put('/resources/:id', updateResource);

// Delete a resource
router.delete('/resources/:id', deleteResource);

export default router;
