import mongoose, { Schema, type Document } from "mongoose";

export interface IEducation extends Document {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  description: string;
  order: number;
}

const educationSchema = new Schema<IEducation>(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, default: "" },
    startYear: { type: String, default: "" },
    endYear: { type: String, default: "" },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education = mongoose.model<IEducation>("Education", educationSchema);
