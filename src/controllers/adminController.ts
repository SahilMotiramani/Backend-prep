import { Request, Response } from "express"
import { createBanner } from "../services/adminServices";

export const banner = async (req: Request, res: Response): Promise<void> => {
    try {
        const { text, imageUrl, createdBy } = req.body
        await createBanner(text, imageUrl, createdBy);
        res.status(201).json({ message: 'banner added successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }

}