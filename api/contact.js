const mongoose = require("mongoose");


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

// ── DB Connection (cached for serverless) ──────────────────────────────────
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
}

// ── CORS helper ─────────────────────────────────────────────────────────────
function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// ── Vercel Serverless Handler ────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  setCors(res);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed." });
  }

  const { fullName, email, projectType, budgetRange, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing required fields." });
  }

  if (message.length > 2000) {
    return res.status(400).json({ success: false, error: "Message too long (max 2000 characters)." });
  }

  try {
    await connectDB();
    await Message.create({ fullName, email, projectType, budgetRange, message });
    return res.status(200).json({ success: true, message: "Message received! I'll get back to you soon." });
  } catch (err) {
    console.error("DB error:", err.message);
    return res.status(500).json({ success: false, error: "Server error. Please try again later." });
  }
};