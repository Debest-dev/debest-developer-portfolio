/**
 * DEBEST.DEV — Contact Form Handler
 * Replace your existing Web3Forms submit code with this.
 * 
 * Assumes your form fields have these name/id attributes:
 *   Full Name     → id="fullName"
 *   Email         → id="email"
 *   Project Type  → id="projectType"   (select)
 *   Budget Range  → id="budgetRange"   (select)
 *   Message       → id="message"       (textarea)
 *   Submit Button → id="submitBtn"
 *   Status div    → id="formStatus"
 */

// ⬇️ Change this to your server's URL
// const API_URL = "https://api.debest.dev/api/contact";
const API_URL = "http://localhost:3001/api/contact";

document.getElementById("submitBtn").addEventListener("click", async () => {
  const btn = document.getElementById("submitBtn");
  const status = document.getElementById("formStatus");

  const fullName    = document.getElementById("fullName").value.trim();
  const email       = document.getElementById("email").value.trim();
  const projectType = document.getElementById("projectType").value;
  const budgetRange = document.getElementById("budgetRange").value;
  const message     = document.getElementById("message").value.trim();

  // Client-side validation
  if (!fullName || !email || !message) {
    showStatus(status, "Please fill in all required fields.", "error");
    return;
  }

  // Loading state
  btn.disabled = true;
  btn.textContent = "Sending...";
  clearStatus(status);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, projectType, budgetRange, message }),
    });

    const data = await res.json();

    if (data.success) {
      showStatus(status, "✅ " + data.message, "success");
      // Clear the form
      ["fullName", "email", "message"].forEach(id => document.getElementById(id).value = "");
      document.getElementById("projectType").selectedIndex = 0;
      document.getElementById("budgetRange").selectedIndex = 0;
    } else {
      showStatus(status, "❌ " + (data.error || "Something went wrong."), "error");
    }
  } catch (err) {
    showStatus(status, "❌ Could not reach the server. Please try again.", "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "Send Message";
  }
});

function showStatus(el, msg, type) {
  el.textContent = msg;
  el.style.display = "block";
  el.style.color = type === "success" ? "#16a34a" : "#dc2626";
  el.style.marginTop = "12px";
  el.style.fontWeight = "500";
}

function clearStatus(el) {
  el.textContent = "";
  el.style.display = "none";
}
