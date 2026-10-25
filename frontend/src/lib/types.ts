export type Availability = "open" | "limited" | "closed";

export interface Profile {
  _id?: string;
  name: string;
  headline: string;
  bio: string;
  about: string;
  email: string;
  location: string;
  education: string;
  availability: Availability;
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

export interface CaseStudy {
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  challenges: string[];
}

export interface Project {
  _id?: string;
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
  caseStudy: CaseStudy;
}

export interface Skill {
  _id?: string;
  name: string;
  category: string;
  level: "proficient" | "learning" | "familiar";
  order: number;
}

export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  description: string;
  order: number;
}

export interface Achievement {
  _id?: string;
  title: string;
  description: string;
  year: string;
  link: string;
  order: number;
}

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  url: string;
}

export interface LeetCodeStats {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  url: string;
}
