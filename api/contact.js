const mongoose = require("mongoose");
const nodemailer = require("nodemailer"); // 👈 Added nodemailer

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

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method not allowed." });

  const { fullName, email, projectType, budgetRange, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing required fields." });
  }

  if (message.length > 2000) {
    return res.status(400).json({ success: false, error: "Message too long (max 2000 characters)." });
  }

  try {
    // 1. Save to Database
    await connectDB();
    await Message.create({ fullName, email, projectType, budgetRange, message });

    // 2. Send Email Notification 👈 Added email logic
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
        subject: `New Portfolio Message from ${fullName}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Type:</strong> ${projectType || "N/A"}</p>
          <p><strong>Budget Range:</strong> ${budgetRange || "N/A"}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("Notification email sent successfully!");
    } catch (emailErr) {
      // If the email fails, we log it but don't crash the database success response
      console.error("Nodemailer error:", emailErr.message);
    }

    return res.status(200).json({ success: true, message: "Message received! I'll get back to you soon." });
  } catch (err) {
    console.error("DB error:", err.message);
    return res.status(500).json({ success: false, error: "Server error. Please try again later." });
  }
};