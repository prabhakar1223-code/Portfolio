import mongoose, { Schema, type Document } from "mongoose";

export interface IProfile extends Document {
  name: string;
  headline: string;
  bio: string;
  about: string;
  email: string;
  location: string;
  education: string;
  availability: "open" | "limited" | "closed";
  availabilityNote: string;
  heroImageUrl: string;
  aboutImageUrl: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  leetcodeUrl: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

const profileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    headline: { type: String, required: true },
    bio: { type: String, default: "" },
    about: { type: String, default: "" },
    email: { type: String, default: "" },
    location: { type: String, default: "Pune, India" },
    education: { type: String, default: "" },
    availability: {
      type: String,
      enum: ["open", "limited", "closed"],
      default: "open",
    },
    availabilityNote: { type: String, default: "" },
    heroImageUrl: { type: String, default: "" },
    aboutImageUrl: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    leetcodeUrl: { type: String, default: "" },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    seoKeywords: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Profile = mongoose.model<IProfile>("Profile", profileSchema);
