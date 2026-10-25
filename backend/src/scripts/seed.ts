import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import { Admin } from "../models/Admin.js";
import { Profile } from "../models/Profile.js";
import { Project } from "../models/Project.js";
import { Skill } from "../models/Skill.js";
import { Education } from "../models/Education.js";
import { Achievement } from "../models/Achievement.js";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI required");
  await connectDB(uri);

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@portfolio.local";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await Admin.create({ email: adminEmail, passwordHash });
    console.log(`Admin created: ${adminEmail}`);
  }

  await Profile.deleteMany({});
  await Profile.create({
    name: "Prabhakar Shinde",
    headline: "Full-Stack Developer & Aspiring AI Engineer",
    bio: "B.Tech Computer Engineering student at PICT, Pune, building full-stack web applications and exploring AI-powered products.",
    about:
      "I am a Computer Engineering student at Pune Institute of Computer Technology (PICT), passionate about software development, problem-solving, and building real-world projects. I work across the MERN stack and modern React tooling, and I am actively deepening my skills in AI engineering — from integrating LLM APIs to building intelligent user experiences. I enjoy turning ideas into polished, maintainable applications and learning through hands-on project work.",
    email: process.env.CONTACT_NOTIFY_EMAIL ?? "your.email@example.com",
    location: "Pune, India",
    education: "B.Tech Computer Engineering — PICT, Pune",
    availability: "open",
    availabilityNote: "Open to internships, AI engineering roles, and freelance collaborations.",
    heroImageUrl: "/images/hero-prabhakar.jpg",
    aboutImageUrl: "/images/about-prabhakar.jpg",
    resumeUrl: "",
    githubUrl: "https://github.com/prabhakar1223-code",
    linkedinUrl: "https://www.linkedin.com/in/prabhakar-shinde-dev/",
    leetcodeUrl: "https://leetcode.com/u/Prabhakar_2905/",
    seoTitle: "Prabhakar Shinde | Full-Stack Developer & Aspiring AI Engineer",
    seoDescription:
      "Portfolio of Prabhakar Shinde — B.Tech CSE student at PICT Pune. Full-stack developer building MERN apps, AI SaaS tools, and production-ready web experiences.",
    seoKeywords: [
      "Prabhakar Shinde",
      "Full-Stack Developer",
      "PICT Pune",
      "MERN",
      "AI Engineer",
      "React",
      "Node.js",
    ],
  });

  await Project.deleteMany({});
  await Project.insertMany([
    {
      title: "QuickAI",
      slug: "quickai",
      shortDescription:
        "AI SaaS platform for content creation with premium AI tools — articles, images, and workflow enhancements.",
      description:
        "QuickAI is a full-stack AI SaaS application featuring a React + Vite client and Node.js/Express API. It integrates OpenAI for generative workflows, Clerk for authentication, Cloudinary for media, and Neon serverless PostgreSQL for persistence.",
      technologies: [
        "React 19",
        "Vite",
        "Tailwind CSS",
        "Node.js",
        "Express 5",
        "OpenAI",
        "Clerk",
        "Cloudinary",
        "Neon PostgreSQL",
      ],
      githubUrl: "https://github.com/prabhakar1223-code/QuickAI",
      demoUrl: "",
      imageUrl: "",
      featured: true,
      published: true,
      order: 0,
      caseStudy: {
        problem:
          "Content creators need a unified workspace to generate and manage AI-assisted text and media without juggling multiple disconnected tools.",
        solution:
          "Built a SaaS-style dashboard with authenticated routes, AI generation endpoints, and media upload pipelines backed by a modular Express API.",
        architecture:
          "React SPA → Express REST API → OpenAI / Cloudinary / Neon PostgreSQL, with Clerk handling auth on both client and server.",
        features: [
          "AI-powered content generation workflows",
          "User authentication via Clerk",
          "Media upload and storage with Cloudinary",
          "Persistent data on Neon PostgreSQL",
        ],
        challenges: [
          "Coordinating third-party auth between client and Express middleware",
          "Structuring API routes for multiple AI content types",
        ],
      },
    },
    {
      title: "SmartClaimAI (InsureFlow)",
      slug: "smartclaimai",
      shortDescription:
        "Digital insurance claim platform with dashboards, real-time tracking, and automated pre-validation.",
      description:
        "SmartClaimAI maps to the InsureFlow project (Smart_insurence_claim): a TypeScript React frontend with Express backend, JWT auth, document upload, and ML-assisted validation using Tesseract.js and TensorFlow.js.",
      technologies: [
        "React 18",
        "TypeScript",
        "Vite",
        "Express 5",
        "JWT",
        "Socket.io",
        "Tesseract.js",
        "TensorFlow.js",
        "Framer Motion",
      ],
      githubUrl: "https://github.com/prabhakar1223-code/Smart_insurence_claim",
      demoUrl: "",
      imageUrl: "",
      featured: true,
      published: true,
      order: 1,
      caseStudy: {
        problem:
          "Insurance claim submission is often slow, opaque, and error-prone for both claimants and administrators.",
        solution:
          "Designed a unified dashboard for claim submission, status tracking, and automated pre-validation of uploaded documents.",
        architecture:
          "React + TypeScript client, Express API with JWT sessions, real-time updates via Socket.io, and client-side ML/OCR pipelines for document checks.",
        features: [
          "Claim submission and tracking dashboard",
          "JWT-secured API routes",
          "Document upload with OCR (Tesseract.js)",
          "Image classification experiments with TensorFlow.js",
        ],
        challenges: [
          "Balancing client-side ML performance with browser constraints",
          "Designing clear claim state transitions for users",
        ],
      },
    },
    {
      title: "WonderList",
      slug: "wonderlist",
      shortDescription:
        "Airbnb-style accommodation listing platform to showcase and discover homes.",
      description:
        "WonderList is a MERN-style listing application built with Node.js, Express, EJS templates, MongoDB/Mongoose, Passport local auth, and Cloudinary image uploads.",
      technologies: [
        "Node.js",
        "Express 5",
        "MongoDB",
        "Mongoose",
        "EJS",
        "Passport.js",
        "Cloudinary",
        "Joi",
      ],
      githubUrl: "https://github.com/prabhakar1223-code/WonderList",
      demoUrl: "",
      imageUrl: "",
      featured: true,
      published: true,
      order: 2,
      caseStudy: {
        problem:
          "Property owners need a simple way to list accommodations while travelers browse trustworthy listings.",
        solution:
          "Implemented server-rendered listing flows with authenticated owners, validated forms, and image hosting.",
        architecture:
          "Express + EJS views, MongoDB for listings/users, Passport for sessions, Cloudinary for listing photos.",
        features: [
          "User registration and login",
          "Create and browse home listings",
          "Image uploads to Cloudinary",
          "Server-side validation with Joi",
        ],
        challenges: [
          "Session management across multi-step listing forms",
          "Integrating Cloudinary uploads with Multer middleware",
        ],
      },
    },
    {
      title: "AI Habit Tracker",
      slug: "ai-habit-tracker",
      shortDescription:
        "Habit tracking app with streaks, analytics, and personalised AI insights about your progress.",
      description:
        "Full-stack habit tracker with a React + Vite frontend (charts, drag-and-drop) and Express + MongoDB backend, using Google Generative AI for personalised insights.",
      technologies: [
        "React 19",
        "Vite",
        "Tailwind CSS 4",
        "Recharts",
        "Node.js",
        "Express 5",
        "MongoDB",
        "Google Generative AI",
        "JWT",
      ],
      githubUrl: "https://github.com/prabhakar1223-code/AI_Habit_Tracker",
      demoUrl: "",
      imageUrl: "",
      featured: true,
      published: true,
      order: 3,
      caseStudy: {
        problem:
          "People struggle to maintain habits without feedback loops that explain patterns in their behavior.",
        solution:
          "Built streak tracking with visual analytics and optional AI-generated summaries powered by Google's Generative AI API.",
        architecture:
          "React SPA ↔ Express REST API ↔ MongoDB; JWT auth; Gemini API for insight generation on aggregated habit data.",
        features: [
          "Habit CRUD and streak tracking",
          "Interactive charts (Recharts)",
          "Drag-and-drop habit ordering",
          "AI-generated progress insights",
        ],
        challenges: [
          "Prompting Gemini with structured habit history safely",
          "Keeping JWT auth flows consistent across SPA routes",
        ],
      },
    },
  ]);

  await Skill.deleteMany({});
  await Skill.insertMany([
    { name: "React", category: "Frontend", level: "proficient", order: 0 },
    { name: "Next.js", category: "Frontend", level: "learning", order: 1 },
    { name: "TypeScript", category: "Frontend", level: "proficient", order: 2 },
    { name: "Tailwind CSS", category: "Frontend", level: "proficient", order: 3 },
    { name: "HTML & CSS", category: "Frontend", level: "proficient", order: 4 },
    { name: "Node.js", category: "Backend", level: "proficient", order: 0 },
    { name: "Express.js", category: "Backend", level: "proficient", order: 1 },
    { name: "REST APIs", category: "Backend", level: "proficient", order: 2 },
    { name: "MongoDB", category: "Databases", level: "proficient", order: 0 },
    { name: "Mongoose", category: "Databases", level: "proficient", order: 1 },
    { name: "PostgreSQL (Neon)", category: "Databases", level: "familiar", order: 2 },
    { name: "JavaScript", category: "Programming", level: "proficient", order: 0 },
    { name: "C++", category: "Programming", level: "familiar", order: 1 },
    { name: "Python", category: "Programming", level: "learning", order: 2 },
    { name: "OpenAI API", category: "AI / ML", level: "proficient", order: 0 },
    { name: "Google Generative AI", category: "AI / ML", level: "proficient", order: 1 },
    { name: "TensorFlow.js", category: "AI / ML", level: "learning", order: 2 },
    { name: "Cloudinary", category: "Cloud & DevOps", level: "proficient", order: 0 },
    { name: "Git & GitHub", category: "Developer Tools", level: "proficient", order: 0 },
    { name: "Vite", category: "Developer Tools", level: "proficient", order: 1 },
    { name: "Clerk Auth", category: "Developer Tools", level: "familiar", order: 2 },
  ]);

  await Education.deleteMany({});
  await Education.create({
    institution: "Pune Institute of Computer Technology (PICT)",
    degree: "B.Tech",
    field: "Computer Engineering",
    startYear: "2024",
    endYear: "Present",
    description:
      "Pursuing undergraduate studies in computer engineering with focus on software development, data structures, and emerging AI technologies.",
    order: 0,
  });

  await Achievement.deleteMany({});
  await Achievement.insertMany([
    {
      title: "534 LeetCode Problems Solved",
      description:
        "Global rank 188,514 — 212 Easy, 275 Medium, and 47 Hard problems solved on LeetCode.",
      year: "2026",
      link: "https://leetcode.com/u/Prabhakar_2905/",
      order: 0,
    },
    {
      title: "11 Public GitHub Repositories",
      description:
        "Active open-source portfolio including QuickAI, WonderList, AI Habit Tracker, and InsureFlow.",
      year: "2026",
      link: "https://github.com/prabhakar1223-code",
      order: 1,
    },
  ]);

  console.log("Seed completed successfully");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
