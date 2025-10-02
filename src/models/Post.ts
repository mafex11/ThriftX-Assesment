import mongoose, { Schema, model, models } from "mongoose";

export interface IPost extends mongoose.Document {
  title: string;
  date: Date;
  author: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true, trim: true },
  date: { type: Date, required: true, default: () => new Date() },
  author: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
}, { timestamps: true });

export const Post = models.Post || model<IPost>("Post", PostSchema);


