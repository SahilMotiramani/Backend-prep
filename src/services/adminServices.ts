import { Banner, IBanner } from '../models/adminBanner'; // Adjust the import based on your structure
import { Types } from 'mongoose';

// Service to create a new banner
export const createBanner = async (imageUrl: string, text: string, createdBy: Types.ObjectId): Promise<IBanner> => {
  const newBanner = new Banner({
    imageUrl,
    text,
    createdBy,
  });

  return await newBanner.save();
};