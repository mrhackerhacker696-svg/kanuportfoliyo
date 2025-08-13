import Layout from "../components/Layout";
import { Edit, Trash2, Plus, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Skills() {
  const [skills, setSkills] = useState([
    { id: 1, name: "JavaScript", proficiency: 90 },
    { id: 2, name: "React", proficiency: 85 },
    { id: 3, name: "TypeScript", proficiency: 80 },
    { id: 4, name: "Tailwind CSS", proficiency: 92 },
    { id: 5, name: "Node.js", proficiency: 75 },
    { id: 6, name: "Database Management (SQL)", proficiency: 70 },
    { id: 7, name: "Git & GitHub", proficiency: 95 },
  ]);

  const [newSkill, setNewSkill] = useState({ name: "", proficiency: 50 });
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Skills Management
            </h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Skill
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800">{successMessage}</span>
            </div>
          )}

          {/* Skills Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Your Skills
            </h2>
            <p className="text-gray-600">
              Manage your technical and soft skills displayed on your portfolio.
            </p>
          </div>

          {/* Skills Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600">
                <span>Skill Name</span>
                <span>Proficiency</span>
                <span></span>
                <span>Actions</span>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {skills.map((skill) => (
                <div key={skill.id} className="px-6 py-4">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-10">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div></div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSkills(skills.filter((s) => s.id !== skill.id));
                          setSuccessMessage(
                            `${skill.name} skill deleted successfully!`,
                          );
                          setTimeout(() => setSuccessMessage(""), 3000);
                        }}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Skill Form */}
          {showAddForm && (
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add New Skill
              </h3>
              <p className="text-gray-600 mb-6">
                Add a new skill with its proficiency level.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Web Development, UI/UX Design"
                    value={newSkill.name}
                    onChange={(e) =>
                      setNewSkill((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proficiency Level: {newSkill.proficiency}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newSkill.proficiency}
                    onChange={(e) =>
                      setNewSkill((prev) => ({
                        ...prev,
                        proficiency: parseInt(e.target.value),
                      }))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      if (newSkill.name.trim()) {
                        const newId = Math.max(...skills.map((s) => s.id)) + 1;
                        setSkills([
                          ...skills,
                          {
                            id: newId,
                            name: newSkill.name.trim(),
                            proficiency: newSkill.proficiency,
                          },
                        ]);
                        setSuccessMessage(
                          `${newSkill.name} skill added successfully!`,
                        );
                        setTimeout(() => setSuccessMessage(""), 3000);
                        setShowAddForm(false);
                        setNewSkill({ name: "", proficiency: 50 });
                      }
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add Skill
                  </button>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setNewSkill({ name: "", proficiency: 50 });
                    }}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
