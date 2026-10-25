import mongoose, { Schema, type Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  type: "internship" | "employment" | "collaboration" | "freelance";
  subject: string;
  message: string;
  read: boolean;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    type: {
      type: String,
      enum: ["internship", "employment", "collaboration", "freelance"],
      required: true,
    },
    subject: { type: String, default: "" },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Contact = mongoose.model<IContact>("Contact", contactSchema);
