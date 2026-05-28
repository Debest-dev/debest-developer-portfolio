require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
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

// ── Database (Forced Local/Non-SSL Configuration) ───────────────────────────
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'debestdev',
  password: 'password123', // Matches your .env settings
  port: 5432,
  ssl: false // Completely disables local SSL enforcement
});

// Create messages table if it doesn't exist
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id          SERIAL PRIMARY KEY,
        full_name   VARCHAR(100) NOT NULL,
        email       VARCHAR(150) NOT NULL,
        project_type VARCHAR(100),
        budget_range VARCHAR(100),
        message     TEXT NOT NULL,
        created_at  TIMESTAMP DEFAULT NOW(),
        is_read     BOOLEAN DEFAULT FALSE
      )
    `);
    console.log("✅ Database ready and table verified");
  } catch (err) {
    console.error("❌ Database initialization failed:", err.message);
  }
}

// ── Email Transporter ────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email Notification function
async function sendNotificationEmail({ fullName, email, projectType, budgetRange, message }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFY_EMAIL,
    subject: `💼 New Portfolio Message from ${fullName}`,
    text: `
You have received a new contact form submission.

👤 Full Name: ${fullName}
📧 Email: ${email}
📁 Project Type: ${projectType || "Not specified"}
💰 Budget Range: ${budgetRange || "Not specified"}

📝 Message:
${message}
    `,
  };

  return transporter.sendMail(mailOptions);
}

// ── Routes ──────────────────────────────────────────────────────────────────

// POST /api/contact — Submit contact form
app.post("/api/contact", async (req, res) => {
  const { fullName, email, projectType, budgetRange, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing required fields." });
  }

  if (message.length > 2000) {
    return res.status(400).json({ success: false, error: "Message too long (max 2000 characters)." });
  }

  try {
    // Save to database
    await pool.query(
      `INSERT INTO messages (full_name, email, project_type, budget_range, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [fullName.trim(), email.trim().toLowerCase(), projectType || null, budgetRange || null, message.trim()]
    );

    // Send email notification (non-blocking)
    sendNotificationEmail({ fullName, email, projectType, budgetRange, message }).catch((err) =>
      console.error("Email notification failed:", err.message)
    );

    return res.json({ success: true, message: "Message received! I'll get back to you soon." });
  } catch (err) {
    console.error("DB error:", err.message);
    return res.status(500).json({ success: false, error: "Server error. Please try again later." });
  }
});

// GET /api/messages — view all messages
app.get("/api/messages", async (req, res) => {
  const secret = req.headers["x-admin-secret"];
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { rows } = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get("/api/health", (_, res) => res.json({ status: "OK" }));

/// Keep your listen function exactly like this
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Move this line down here, completely outside the curly braces!
module.exports = app;