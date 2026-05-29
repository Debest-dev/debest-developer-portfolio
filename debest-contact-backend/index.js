const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

// ── MongoDB Message Schema ──────────────────────────────────────────────────
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

// ── DB Connection (cached for serverless performance) ───────────────────────
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable");
  }
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
  console.log("MongoDB connected via Serverless Handler...");
}

// ── Email Notification Setup ────────────────────────────────────────────────
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

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent status ID:", info.messageId);
}

// ── CORS Headers Helper ──────────────────────────────────────────────────────
function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// ── Vercel Serverless Handler ────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  setCors(res);

  // Handle CORS preflight options check
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST requests for the contact form
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed." });
  }

  const { fullName, email, projectType, budgetRange, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing required fields." });
  }

  try {
    // 1. Connect to MongoDB Atlas
    await connectDB();

    // 2. Save document data
    const newMessage = await Message.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      projectType: projectType || null,
      budgetRange: budgetRange || null,
      message: message.trim()
    });

    // 3. Send email notification
    try {
      await sendNotificationEmail({ fullName, email, projectType, budgetRange, message });
    } catch (emailErr) {
      console.error("Serverless Email Error:", emailErr.message);
      // We don't crash the request if only the email fails, database takes priority
    }

    return res.status(200).json({ 
      success: true, 
      message: "Message received! I'll get back to you soon.",
      id: newMessage._id 
    });

  } catch (err) {
    console.error("Serverless Handler Main Error:", err.message);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};