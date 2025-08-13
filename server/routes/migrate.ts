import express from "express";
import {
  Profile,
  Project,
  ContactMessage,
  GitSettings,
} from "../models/index.js";
import { isMongoDBAvailable } from "../database/connection.js";

const router = express.Router();

// Migrate data from localStorage to MongoDB
router.post("/migrate", async (req, res) => {
  try {
    if (!isMongoDBAvailable()) {
      return res.status(503).json({
        success: false,
        error: "MongoDB not available",
        message:
          "MongoDB is not connected. Please set up MongoDB and set ENABLE_MONGODB=true to use migration.",
        mongodbAvailable: false,
      });
    }

    const { localStorageData } = req.body;
    const userId = "kanu-portfolio";

    const migrationResults = {
      profile: null,
      projects: [],
      contacts: [],
      gitSettings: null,
      errors: [],
    };

    // Migrate profile data
    if (localStorageData.profileData) {
      try {
        const profileData = JSON.parse(localStorageData.profileData);
        const profile = await Profile.findOneAndUpdate(
          { userId },
          { ...profileData, userId },
          { new: true, upsert: true },
        );
        migrationResults.profile = profile;
      } catch (error) {
        migrationResults.errors.push(
          "Failed to migrate profile data: " + error.message,
        );
      }
    }

    // Migrate projects data
    if (localStorageData.adminProjects) {
      try {
        const projectsData = JSON.parse(localStorageData.adminProjects);
        for (const projectData of projectsData) {
          // Check if project already exists
          const existingProject = await Project.findOne({
            userId,
            title: projectData.title,
          });

          if (!existingProject) {
            const project = new Project({
              ...projectData,
              userId,
              fullDescription:
                projectData.fullDescription ||
                `This is a project developed with modern web technologies.

Key Features:
• Modern and responsive design
• Clean and efficient code structure
• User-friendly interface
• Cross-platform compatibility

Technical Implementation:
Built using industry-standard technologies and best practices to ensure optimal performance and maintainability.`,
              challenges:
                projectData.challenges ||
                "Developing a robust and scalable solution while maintaining clean code architecture and ensuring optimal user experience.",
              outcome:
                projectData.outcome ||
                "Successfully delivered a high-quality project that meets all requirements and provides excellent user experience.",
              screenshots: projectData.screenshots || [
                projectData.image,
                projectData.image,
                projectData.image,
              ],
              dateCompleted:
                projectData.dateCompleted ||
                new Date().toISOString().split("T")[0],
            });
            await project.save();
            migrationResults.projects.push(project);
          }
        }
      } catch (error) {
        migrationResults.errors.push(
          "Failed to migrate projects data: " + error.message,
        );
      }
    }

    // Migrate contact messages
    if (localStorageData.contactMessages) {
      try {
        const contactsData = JSON.parse(localStorageData.contactMessages);
        for (const contactData of contactsData) {
          // Check if message already exists
          const existingMessage = await ContactMessage.findOne({
            userId,
            name: contactData.name,
            email: contactData.email,
            subject: contactData.subject,
          });

          if (!existingMessage) {
            const message = new ContactMessage({
              ...contactData,
              userId,
            });
            await message.save();
            migrationResults.contacts.push(message);
          }
        }
      } catch (error) {
        migrationResults.errors.push(
          "Failed to migrate contact messages: " + error.message,
        );
      }
    }

    // Migrate git settings
    if (localStorageData.gitSettings) {
      try {
        const gitData = JSON.parse(localStorageData.gitSettings);
        const gitSettings = await GitSettings.findOneAndUpdate(
          { userId },
          { ...gitData, userId },
          { new: true, upsert: true },
        );
        migrationResults.gitSettings = gitSettings;
      } catch (error) {
        migrationResults.errors.push(
          "Failed to migrate git settings: " + error.message,
        );
      }
    }

    res.json({
      success: true,
      message: "Data migration completed",
      results: migrationResults,
    });
  } catch (error) {
    console.error("Migration error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to migrate data",
      details: error.message,
    });
  }
});

// Get migration status
router.get("/status", async (req, res) => {
  try {
    if (!isMongoDBAvailable()) {
      return res.json({
        hasProfile: false,
        projectsCount: 0,
        contactsCount: 0,
        hasGitSettings: false,
        migrated: false,
        mongodbAvailable: false,
        message:
          "MongoDB is not available. Currently running in localStorage mode.",
      });
    }

    const userId = "kanu-portfolio";

    const profile = await Profile.findOne({ userId });
    const projectsCount = await Project.countDocuments({ userId });
    const contactsCount = await ContactMessage.countDocuments({ userId });
    const gitSettings = await GitSettings.findOne({ userId });

    res.json({
      hasProfile: !!profile,
      projectsCount,
      contactsCount,
      hasGitSettings: !!gitSettings,
      migrated: !!(
        profile ||
        projectsCount > 0 ||
        contactsCount > 0 ||
        gitSettings
      ),
      mongodbAvailable: true,
    });
  } catch (error) {
    console.error("Error checking migration status:", error);
    res.status(500).json({ error: "Failed to check migration status" });
  }
});

export default router;
