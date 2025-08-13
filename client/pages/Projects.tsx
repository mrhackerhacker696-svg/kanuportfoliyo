import Layout from "../components/Layout";
import {
  ExternalLink,
  Github,
  Edit,
  Trash2,
  Plus,
  Monitor,
  Smartphone,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tags: "",
    status: "In Development",
    github: "",
    demo: "",
    image: "",
  });

  // Load projects from localStorage on mount (including default projects)
  useEffect(() => {
    const defaultProjects = [
      {
        id: 1,
        title: "AI-Powered Course Platform",
        description:
          "Developed a robust platform for creating and managing AI-generated courses, featuring intuitive course creation tools.",
        tags: ["React.js", "TypeScript", "Next.js", "CSS"],
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop&crop=top",
        status: "Live",
        links: {
          github: "https://github.com/kanuprajapati/ai-course-platform",
          demo: "https://react-portfolio-template.vercel.app",
        },
      },
      {
        id: 2,
        title: "E-commerce Analytics Dashboard",
        description:
          "Built a real-time analytics dashboard to track sales, customer behavior, and inventory, providing key insights.",
        tags: ["React", "D3.js", "Node.js", "Express"],
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&crop=top",
        status: "Live",
        links: {
          github: "https://github.com/kanuprajapati/ecommerce-analytics",
          demo: "https://dashboard-template-react.vercel.app",
        },
      },
      {
        id: 3,
        title: "Decentralized Voting System",
        description:
          "Implemented a secure and transparent voting system using blockchain technology, ensuring vote integrity.",
        tags: ["Solidity", "Hardhat", "React", "Web3.js"],
        image:
          "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=500&h=300&fit=crop&crop=center",
        status: "Completed",
        links: {
          github: "https://github.com/kanuprajapati/blockchain-voting",
          demo: "https://web3-voting-app.vercel.app",
        },
      },
      {
        id: 4,
        title: "Personal Finance Tracker",
        description:
          "Created a user-friendly web application to help individuals track expenses, set budgets, and visualizing spending patterns.",
        tags: ["Vue.js", "Firebase", "TypeScript", "Chart.js"],
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop&crop=center",
        status: "Live",
        links: {
          github: "https://github.com/kanuprajapati/finance-tracker",
          demo: "https://finance-tracker-vue.vercel.app",
        },
      },
    ];

    const savedProjects = localStorage.getItem("adminProjects");
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        // Combine default projects with saved projects and remove duplicates
        const allProjects = [
          ...defaultProjects.map(defaultProject => {
            // Check if this default project was modified in saved projects
            const savedVersion = parsed.find(p => p.id === defaultProject.id);
            return savedVersion || defaultProject;
          }),
          ...parsed.filter(p => p.id > 4), // Add new projects (ID > 4)
        ];
        setProjects(allProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem("adminProjects", JSON.stringify(projects));
    }
  }, [projects]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setNewProject((prev) => ({
            ...prev,
            image: e.target.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setEditingProject((prev) => ({
            ...prev,
            image: e.target.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addProject = () => {
    if (newProject.title && newProject.description) {
      const newId =
        projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
      const tagsArray = newProject.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      const projectToAdd = {
        id: newId,
        title: newProject.title,
        description: newProject.description,
        tags: tagsArray,
        image:
          newProject.image ||
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=center",
        status: newProject.status,
        links: {
          github: newProject.github || "#",
          demo: newProject.demo || "#",
        },
      };

      const updatedProjects = [...projects, projectToAdd];
      setProjects(updatedProjects);
      setNewProject({
        title: "",
        description: "",
        tags: "",
        status: "In Development",
        github: "",
        demo: "",
        image: "",
      });
      setShowAddForm(false);
      setSuccessMessage("Project added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const deleteProject = (id: number) => {
    if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      setProjects(projects.filter((p) => p.id !== id));
      setSuccessMessage("Project deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const startEditProject = (project: any) => {
    setEditingProject({
      ...project,
      tags: project.tags.join(", "),
      github: project.links.github || "",
      demo: project.links.demo || "",
      image: project.image || "",
    });
    setShowEditForm(true);
  };

  const updateProject = () => {
    if (editingProject.title && editingProject.description) {
      const tagsArray = editingProject.tags
        .split(",")
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag);
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id
            ? {
                ...p,
                title: editingProject.title,
                description: editingProject.description,
                tags: tagsArray,
                status: editingProject.status,
                image: editingProject.image || p.image,
                links: {
                  github: editingProject.github,
                  demo: editingProject.demo,
                },
              }
            : p,
        ),
      );
      setShowEditForm(false);
      setEditingProject(null);
      setSuccessMessage("Project updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-100 text-green-800";
      case "In Development":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Published":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Projects Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage projects that appear on your home page and portfolio
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Project
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800">{successMessage}</span>
            </div>
          )}

          {/* Add Project Form */}
          {showAddForm && (
            <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add New Project
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter project title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={newProject.status}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="In Development">In Development</option>
                    <option value="Completed">Completed</option>
                    <option value="Live">Live</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your project"
                ></textarea>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newProject.tags}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        tags: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="React, Node.js, TypeScript"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={newProject.github}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        github: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Demo URL
                </label>
                <input
                  type="url"
                  value={newProject.demo}
                  onChange={(e) =>
                    setNewProject((prev) => ({ ...prev, demo: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://your-project-demo.com"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Image
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="text-center text-gray-500">or</div>
                  <input
                    type="url"
                    value={newProject.image}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        image: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                  {newProject.image && (
                    <div className="mt-2">
                      <img
                        src={newProject.image}
                        alt="Preview"
                        className="w-32 h-20 object-cover rounded border"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={addProject}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Project
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewProject({
                      title: "",
                      description: "",
                      tags: "",
                      status: "In Development",
                      github: "",
                      demo: "",
                      image: "",
                    });
                  }}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Edit Project Form */}
          {showEditForm && editingProject && (
            <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Edit Project
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="In Development">In Development</option>
                    <option value="Completed">Completed</option>
                    <option value="Live">Live</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingProject.tags}
                    onChange={(e) =>
                      setEditingProject((prev) => ({
                        ...prev,
                        tags: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.github}
                    onChange={(e) =>
                      setEditingProject((prev) => ({
                        ...prev,
                        github: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Demo URL
                </label>
                <input
                  type="url"
                  value={editingProject.demo}
                  onChange={(e) =>
                    setEditingProject((prev) => ({
                      ...prev,
                      demo: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Image
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleEditImageUpload(e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="text-center text-gray-500">or</div>
                  <input
                    type="url"
                    value={editingProject.image || ""}
                    onChange={(e) =>
                      setEditingProject((prev) => ({
                        ...prev,
                        image: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                  {editingProject.image && (
                    <div className="mt-2">
                      <img
                        src={editingProject.image}
                        alt="Preview"
                        className="w-32 h-20 object-cover rounded border"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={updateProject}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Update Project
                </button>
                <button
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingProject(null);
                  }}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="p-1 bg-white rounded">
                      <Monitor className="h-3 w-3 text-gray-600" />
                    </div>
                    <div className="p-1 bg-white rounded">
                      <Smartphone className="h-3 w-3 text-gray-600" />
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Live Demo
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                        >
                          <Github className="h-3 w-3" />
                          GitHub
                        </a>
                      )}
                      {project.links.appStore && (
                        <a
                          href={project.links.appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          App Store
                        </a>
                      )}
                      {project.links.playStore && (
                        <a
                          href={project.links.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          Play Store
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditProject(project)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Project Card */}
            <div
              onClick={() => setShowAddForm(true)}
              className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[400px] hover:border-gray-400 transition-colors cursor-pointer"
            >
              <div className="text-center">
                <div className="p-4 bg-white rounded-full mb-4 mx-auto w-fit">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Create New Project
                </h3>
                <p className="text-gray-500 text-sm">
                  Add a new project to your portfolio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
