import nodemailer from "nodemailer";

export async function sendContactNotification(data: {
  name: string;
  email: string;
  type: string;
  subject: string;
  message: string;
}): Promise<void> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_NOTIFY_EMAIL;

  if (!host || !user || !pass || !to) return;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    to,
    replyTo: data.email,
    subject: `[Portfolio ${data.type}] ${data.subject || "New inquiry"}`,
    text: `From: ${data.name} <${data.email}>\nType: ${data.type}\n\n${data.message}`,
  });
}
