import { Schema, model, Document, Types } from 'mongoose';

export interface IBanner extends Document {
  imageUrl: string;
  text?: string; // Optional text for the banner
  createdBy: Types.ObjectId; 
  createdAt: Date;
}

const bannerSchema = new Schema<IBanner>({
  imageUrl: { type: String, required: true },
  text: { type: String, optional: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Correctly specify ObjectId type
  createdAt: { type: Date, default: Date.now }
});


export const Banner = model<IBanner>('Banner', bannerSchema);
