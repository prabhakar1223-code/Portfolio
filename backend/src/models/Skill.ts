import mongoose, { Schema, type Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: string;
  level: "proficient" | "learning" | "familiar";
  order: number;
}

const skillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    level: {
      type: String,
      enum: ["proficient", "learning", "familiar"],
      default: "proficient",
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Skill = mongoose.model<ISkill>("Skill", skillSchema);
