import mongoose from "mongoose";

// Profile Schema
const ProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    profileImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    },
    logoText: { type: String, default: "⚡ logo" },
    resumeUrl: { type: String, default: "" },
    contactInfo: {
      email: { type: String, default: "kanuprajapati717@gmail.com" },
      phone: { type: String, default: "+91 9876543210" },
      location: { type: String, default: "Gujarat, India" },
      linkedin: {
        type: String,
        default: "https://linkedin.com/in/kanuprajapati",
      },
      github: { type: String, default: "https://github.com/kanuprajapati" },
    },
  },
  { timestamps: true },
);

// Project Schema
const ProjectSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    fullDescription: { type: String, default: "" },
    tags: [{ type: String }],
    image: { type: String, required: true },
    status: {
      type: String,
      enum: ["In Development", "Completed", "Live", "Published"],
      default: "In Development",
    },
    dateCompleted: { type: String, default: "" },
    links: {
      github: { type: String, default: "" },
      demo: { type: String, default: "" },
      live: { type: String, default: "" },
    },
    screenshots: [{ type: String }],
    challenges: { type: String, default: "" },
    outcome: { type: String, default: "" },
  },
  { timestamps: true },
);

// Contact Message Schema
const ContactMessageSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    contactMethod: {
      type: String,
      enum: ["email", "sms", "call"],
      default: "email",
    },
    status: { type: String, enum: ["new", "replied"], default: "new" },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
  },
  { timestamps: true },
);

// Git Settings Schema
const GitSettingsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    username: { type: String, default: "kanuprajapati" },
    accessToken: { type: String, default: "" },
    isConnected: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Project Screenshots Schema (for additional screenshots)
const ProjectScreenshotSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    projectId: { type: String, required: true },
    screenshots: [{ type: String }],
  },
  { timestamps: true },
);

// Export models
export const Profile = mongoose.model("Profile", ProfileSchema);
export const Project = mongoose.model("Project", ProjectSchema);
export const ContactMessage = mongoose.model(
  "ContactMessage",
  ContactMessageSchema,
);
export const GitSettings = mongoose.model("GitSettings", GitSettingsSchema);
export const ProjectScreenshot = mongoose.model(
  "ProjectScreenshot",
  ProjectScreenshotSchema,
);
