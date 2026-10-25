import { Router } from "express";
import { Profile } from "../models/Profile.js";
import { Project } from "../models/Project.js";
import { Skill } from "../models/Skill.js";
import { Education } from "../models/Education.js";
import { Achievement } from "../models/Achievement.js";

const router = Router();

router.get("/profile", async (_req, res) => {
  const profile = await Profile.findOne().lean();
  if (!profile) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }
  res.json(profile);
});

router.get("/projects", async (_req, res) => {
  const projects = await Project.find({ published: true }).sort({ order: 1, createdAt: -1 }).lean();
  res.json(projects);
});

router.get("/projects/:slug", async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug, published: true }).lean();
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  res.json(project);
});

router.get("/skills", async (_req, res) => {
  const skills = await Skill.find().sort({ category: 1, order: 1 }).lean();
  res.json(skills);
});

router.get("/education", async (_req, res) => {
  const items = await Education.find().sort({ order: 1 }).lean();
  res.json(items);
});

router.get("/achievements", async (_req, res) => {
  const items = await Achievement.find().sort({ order: 1 }).lean();
  res.json(items);
});

router.get("/stats/github", async (_req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME ?? "prabhakar1223-code";
    const r = await fetch(`https://api.github.com/users/${username}`);
    if (!r.ok) throw new Error("GitHub API error");
    const data = (await r.json()) as {
      public_repos: number;
      followers: number;
      html_url: string;
    };
    res.json({
      publicRepos: data.public_repos,
      followers: data.followers,
      url: data.html_url,
    });
  } catch {
    res.status(502).json({ error: "Unable to fetch GitHub stats" });
  }
});

router.get("/stats/leetcode", async (_req, res) => {
  try {
    const username = process.env.LEETCODE_USERNAME ?? "Prabhakar_2905";
    const r = await fetch(
      `https://alfa-leetcode-api.onrender.com/${username}/solved`
    );
    if (!r.ok) throw new Error("LeetCode API error");
    const data = (await r.json()) as {
      solvedProblem: number;
      easySolved: number;
      mediumSolved: number;
      hardSolved: number;
    };
    res.json({
      totalSolved: data.solvedProblem,
      easy: data.easySolved,
      medium: data.mediumSolved,
      hard: data.hardSolved,
      url: `https://leetcode.com/u/${username}/`,
    });
  } catch {
    res.status(502).json({ error: "Unable to fetch LeetCode stats" });
  }
});

export default router;
