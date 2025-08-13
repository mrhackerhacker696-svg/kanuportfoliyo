import express from "express";

const router = express.Router();

// Development-only email testing endpoint
router.post("/send-email", (req, res) => {
  console.log("📧 Development email test received:", req.body);

  const { name, email, phone, subject, message, contactMethod } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Missing required fields",
      details: "Name, email, and message are required",
    });
  }

  // Simulate email sending delay
  setTimeout(() => {
    console.log(`📨 Simulated email sent to kanuprajapati717@gmail.com`);
    console.log(`📧 From: ${name} (${email})`);
    console.log(`📝 Subject: ${subject || "Contact Form Submission"}`);
    console.log(`💬 Message: ${message}`);
    console.log(`📞 Contact Method: ${contactMethod}`);
    console.log(`🎯 Phone: ${phone || "Not provided"}`);

    res.status(200).json({
      success: true,
      message: "Email sent successfully (development mode)",
      timestamp: new Date().toISOString(),
      development: true,
      details: {
        recipient: "kanuprajapati717@gmail.com",
        sender: email,
        subject: subject || "Contact Form Submission",
      },
    });
  }, 500); // Simulate network delay
});

export default router;
