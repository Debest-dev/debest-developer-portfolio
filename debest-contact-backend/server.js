require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*" }));
app.use(express.json());

// Rate limiting: max 5 submissions per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: "Too many submissions. Please wait a few minutes." },
});
app.use("/api/contact", limiter);

// ── MongoDB Schema & Model Setup ─────────────────────────────────────────────
const messageSchema = new mongoose.Schema({
  fullName:    { type: String, required: true, trim: true },
  email:       { type: String, required: true, trim: true, lowercase: true },
  projectType: { type: String, default: null },
  budgetRange: { type: String, default: null },
  message:     { type: String, required: true, trim: true },
  createdAt:   { type: Date, default: Date.now },
  isRead:      { type: Boolean, default: false },
});

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Atlas Connected Successfully..."))
  .catch((err) => console.error("MongoDB Connection Error:", err.message));

// ── Email Setup ──────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendNotificationEmail({ fullName, email, projectType, budgetRange, message }) {
  const mailOptions = {
    from: `"Portfolio Website" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `New Contact Form Message from ${fullName}`,
    text: `
      You received a new message from your website contact form:
      
      Name: ${fullName}
      Email: ${email}
      Project Type: ${projectType || "Not Specified"}
      Budget Range: ${budgetRange || "Not Specified"}
      
      Message:
      ${message}
    `,
  };

  // Sends the email and waits for the delivery receipt from Google
  const info = await transporter.sendMail(mailOptions);
  console.log("👉 Nodemailer Status: Email left server successfully! Message ID:", info.messageId);
}

// ── API Routes ───────────────────────────────────────────────────────────────

// POST /api/contact — Handle Form Submission
app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, email, projectType, budgetRange, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ success: false, error: "Missing required fields." });
    }

    // Save directly to MongoDB Atlas
    const newMessage = await Message.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      projectType: projectType || null,
      budgetRange: budgetRange || null,
      message: message.trim()
    });

    console.log("✅ MongoDB Status: Saved document successfully:", newMessage._id);

    // Send email notification (tracked logs via catch block)
    sendNotificationEmail({ fullName, email, projectType, budgetRange, message })
      .catch((err) => {
        console.error("❌ Nodemailer Error: Email delivery failed!");
        console.error("Reason:", err.message);
      });

    return res.json({ success: true, message: "Message received! I'll get back to you soon." });
  } catch (err) {
    console.error("Server error:", err.message);
    return res.status(500).json({ success: false, error: "Server error. Please try again later." });
  }
});

// GET /api/messages — View all saved messages securely
app.get("/api/messages", async (req, res) => {
  const secret = req.headers["x-admin-secret"];
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get("/api/health", (_, res) => res.json({ status: "OK", database: "MongoDB Atlas" }));

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});