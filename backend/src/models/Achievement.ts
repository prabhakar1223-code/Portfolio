import mongoose, { Schema, type Document } from "mongoose";

export interface IAchievement extends Document {
  title: string;
  description: string;
  year: string;
  link: string;
  order: number;
}

const achievementSchema = new Schema<IAchievement>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    year: { type: String, default: "" },
    link: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Achievement = mongoose.model<IAchievement>("Achievement", achievementSchema);
