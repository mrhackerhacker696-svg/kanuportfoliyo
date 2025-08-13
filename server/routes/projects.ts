import express from "express";
import { Project } from "../models/index.js";

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const userId = "kanu-portfolio";
    const projects = await Project.find({ userId }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Get project by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// Create new project
router.post("/", async (req, res) => {
  try {
    const userId = "kanu-portfolio";
    const projectData = { ...req.body, userId };

    // Set default values for missing fields
    if (!projectData.fullDescription) {
      projectData.fullDescription = `This is a project developed with modern web technologies.

Key Features:
• Modern and responsive design
• Clean and efficient code structure
• User-friendly interface
• Cross-platform compatibility

Technical Implementation:
Built using industry-standard technologies and best practices to ensure optimal performance and maintainability.`;
    }

    if (!projectData.challenges) {
      projectData.challenges =
        "Developing a robust and scalable solution while maintaining clean code architecture and ensuring optimal user experience.";
    }

    if (!projectData.outcome) {
      projectData.outcome =
        "Successfully delivered a high-quality project that meets all requirements and provides excellent user experience.";
    }

    if (!projectData.screenshots) {
      projectData.screenshots = [
        projectData.image,
        projectData.image,
        projectData.image,
      ];
    }

    if (!projectData.dateCompleted) {
      projectData.dateCompleted = new Date().toISOString().split("T")[0];
    }

    const project = new Project(projectData);
    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Update project
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

// Delete project
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;
