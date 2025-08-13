import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";
import { connectDB, isMongoDBAvailable } from "./database/connection.js";
import profileRoutes from "./routes/profile.js";
import projectsRoutes from "./routes/projects.js";
import contactsRoutes from "./routes/contacts.js";
import gitRoutes from "./routes/git.js";
import migrateRoutes from "./routes/migrate.js";
import emailTestRoutes from "./routes/email-test.js";
import { handleFileUpload, handleFileDelete, getUploadConfig } from "./routes/upload.js";

export function createServer() {
  const app = express();

  // Try to connect to MongoDB (non-blocking)
  connectDB()
    .then((connected) => {
      if (connected) {
        console.log("✅ MongoDB integration enabled");
      } else {
        console.log("📱 Running in localStorage mode");
      }
    })
    .catch((error) => {
      console.warn("MongoDB connection attempt failed:", error.message);
    });

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      mongodb: isMongoDBAvailable() ? "connected" : "disconnected",
    });
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Portfolio API routes
  app.use("/api/profile", profileRoutes);
  app.use("/api/projects", projectsRoutes);
  app.use("/api/contacts", contactsRoutes);
  app.use("/api/git", gitRoutes);
  app.use("/api/migrate", migrateRoutes);
  app.use("/api", emailTestRoutes); // Development email testing

  // File upload endpoints
  app.post("/api/upload", handleFileUpload);
  app.delete("/api/upload/:filename", handleFileDelete);
  app.get("/api/upload/config", getUploadConfig);

  return app;
}
