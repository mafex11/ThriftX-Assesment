import mongoose, { Schema, models, model } from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

export const User = models.User || model<IUser>("User", UserSchema);


