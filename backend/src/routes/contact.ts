import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { Contact } from "../models/Contact.js";
import { sendContactNotification } from "../utils/email.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { error: "Too many messages. Please try again later." },
});

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  type: z.enum(["internship", "employment", "collaboration", "freelance"]),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
});

router.post("/", contactLimiter, async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid form data", details: parsed.error.flatten() });
    return;
  }

  const inquiry = await Contact.create(parsed.data);

  try {
    await sendContactNotification({
      ...parsed.data,
      subject: parsed.data.subject ?? "",
    });
  } catch (err) {
    console.error("Email notification failed:", err);
  }

  res.status(201).json({ ok: true, id: inquiry._id });
});

export default router;
