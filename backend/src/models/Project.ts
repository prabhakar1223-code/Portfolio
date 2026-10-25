import mongoose, { Schema, type Document } from "mongoose";

export interface ICaseStudy {
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  challenges: string[];
}

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  imageUrl: string;
  screenshots: string[];
  featured: boolean;
  published: boolean;
  order: number;
  caseStudy: ICaseStudy;
}

const caseStudySchema = new Schema<ICaseStudy>(
  {
    problem: { type: String, default: "" },
    solution: { type: String, default: "" },
    architecture: { type: String, default: "" },
    features: { type: [String], default: [] },
    challenges: { type: [String], default: [] },
  },
  { _id: false }
);

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
    technologies: { type: [String], default: [] },
    githubUrl: { type: String, default: "" },
    demoUrl: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    screenshots: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    caseStudy: { type: caseStudySchema, default: () => ({}) },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", projectSchema);
