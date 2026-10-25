import { Router } from "express";
import { z } from "zod";
import multer from "multer";
import { requireAuth, type AuthRequest } from "../middleware/auth.js";
import { Profile } from "../models/Profile.js";
import { Project } from "../models/Project.js";
import { Skill } from "../models/Skill.js";
import { Education } from "../models/Education.js";
import { Achievement } from "../models/Achievement.js";
import { Contact } from "../models/Contact.js";
import { configureCloudinary, uploadBuffer } from "../utils/cloudinary.js";

const router = Router();
router.use(requireAuth);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    cb(null, allowed.includes(file.mimetype));
  },
});

configureCloudinary();

// Profile
router.get("/profile", async (_req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
});

router.put("/profile", async (req, res) => {
  const profile = await Profile.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  res.json(profile);
});

router.post("/profile/hero-image", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "Image required" });
    return;
  }
  const result = await uploadBuffer(req.file.buffer, "hero");
  const profile = await Profile.findOneAndUpdate(
    {},
    { heroImageUrl: result.secure_url },
    { new: true, upsert: true }
  );
  res.json(profile);
});

router.post("/profile/about-image", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "Image required" });
    return;
  }
  const result = await uploadBuffer(req.file.buffer, "about");
  const profile = await Profile.findOneAndUpdate(
    {},
    { aboutImageUrl: result.secure_url },
    { new: true, upsert: true }
  );
  res.json(profile);
});

router.post("/profile/resume", upload.single("file"), async (req, res) => {
  if (!req.file || req.file.mimetype !== "application/pdf") {
    res.status(400).json({ error: "PDF required" });
    return;
  }
  const result = await uploadBuffer(req.file.buffer, "resume", "raw");
  const profile = await Profile.findOneAndUpdate(
    {},
    { resumeUrl: result.secure_url },
    { new: true, upsert: true }
  );
  res.json(profile);
});

// Projects CRUD
router.get("/projects", async (_req, res) => {
  const projects = await Project.find().sort({ order: 1 });
  res.json(projects);
});

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  githubUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  screenshots: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  order: z.number().optional(),
  caseStudy: z
    .object({
      problem: z.string().optional(),
      solution: z.string().optional(),
      architecture: z.string().optional(),
      features: z.array(z.string()).optional(),
      challenges: z.array(z.string()).optional(),
    })
    .optional(),
});

router.post("/projects", async (req, res) => {
  const parsed = projectSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const project = await Project.create(parsed.data);
  res.status(201).json(project);
});

router.put("/projects/:id", async (req, res) => {
  const parsed = projectSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const project = await Project.findByIdAndUpdate(req.params.id, parsed.data, {
    new: true,
    runValidators: true,
  });
  if (!project) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(project);
});

router.delete("/projects/:id", async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ok: true });
});

router.post("/projects/reorder", async (req, res) => {
  const schema = z.array(z.object({ id: z.string(), order: z.number() }));
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid order payload" });
    return;
  }
  await Promise.all(
    parsed.data.map(({ id, order }) => Project.findByIdAndUpdate(id, { order }))
  );
  const projects = await Project.find().sort({ order: 1 });
  res.json(projects);
});

router.post("/projects/:id/image", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "Image required" });
    return;
  }
  const result = await uploadBuffer(req.file.buffer, "projects");
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { imageUrl: result.secure_url },
    { new: true }
  );
  res.json(project);
});

router.post("/projects/:id/screenshots", upload.array("files", 6), async (req, res) => {
  const files = req.files as Express.Multer.File[];
  if (!files?.length) {
    res.status(400).json({ error: "Images required" });
    return;
  }
  const urls: string[] = [];
  for (const file of files) {
    const result = await uploadBuffer(file.buffer, "screenshots");
    urls.push(result.secure_url);
  }
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  project.screenshots.push(...urls);
  await project.save();
  res.json(project);
});

// Skills
router.get("/skills", async (_req, res) => {
  res.json(await Skill.find().sort({ category: 1, order: 1 }));
});

router.post("/skills", async (req, res) => {
  res.status(201).json(await Skill.create(req.body));
});

router.put("/skills/:id", async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!skill) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(skill);
});

router.delete("/skills/:id", async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// Education
router.get("/education", async (_req, res) => {
  res.json(await Education.find().sort({ order: 1 }));
});

router.post("/education", async (req, res) => {
  res.status(201).json(await Education.create(req.body));
});

router.put("/education/:id", async (req, res) => {
  const item = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(item);
});

router.delete("/education/:id", async (req, res) => {
  await Education.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// Achievements
router.get("/achievements", async (_req, res) => {
  res.json(await Achievement.find().sort({ order: 1 }));
});

router.post("/achievements", async (req, res) => {
  res.status(201).json(await Achievement.create(req.body));
});

router.put("/achievements/:id", async (req, res) => {
  const item = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(item);
});

router.delete("/achievements/:id", async (req, res) => {
  await Achievement.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// Contacts
router.get("/contacts", async (_req, res) => {
  res.json(await Contact.find().sort({ createdAt: -1 }));
});

router.patch("/contacts/:id/read", async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  if (!contact) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(contact);
});

router.delete("/contacts/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
