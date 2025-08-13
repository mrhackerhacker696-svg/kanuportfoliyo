import React, { useState } from "react";
import {
  User,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Plus,
  X,
  Save,
  Edit,
  CheckCircle,
} from "lucide-react";
import { useProfile } from "../contexts/ProfileContext";

const ProfileManagement: React.FC = () => {
  const { profile, updatePersonalInfo, updateContactInfo, updateSkills, updateBio } = useProfile();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [tempData, setTempData] = useState<any>({});
  const [newSkill, setNewSkill] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleEdit = (section: string) => {
    setIsEditing(section);
    setTempData({ ...profile });
  };

  const handleSave = (section: string) => {
    switch (section) {
      case "personal":
        updatePersonalInfo({
          name: tempData.name,
          bio: tempData.bio,
          tagline: tempData.tagline,
          experience: tempData.experience,
          availability: tempData.availability,
        });
        showSuccess("Personal information updated successfully!");
        break;
      case "contact":
        updateContactInfo(tempData.contactInfo);
        showSuccess("Contact information updated successfully!");
        break;
      case "skills":
        updateSkills(tempData.skills);
        showSuccess("Skills updated successfully!");
        break;
    }
    setIsEditing(null);
    setTempData({});
  };

  const handleCancel = () => {
    setIsEditing(null);
    setTempData({});
    setNewSkill("");
  };

  const addSkill = () => {
    if (newSkill.trim() && !tempData.skills?.includes(newSkill.trim())) {
      setTempData((prev: any) => ({
        ...prev,
        skills: [...(prev.skills || profile.skills), newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setTempData((prev: any) => ({
      ...prev,
      skills: prev.skills.filter((skill: string) => skill !== skillToRemove),
    }));
  };

  return (
    <div className="space-y-8">
      {/* Success Message */}
      {successMessage && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          <p className="text-green-800">{successMessage}</p>
        </div>
      )}

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg mr-3">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
          </div>
          {isEditing !== "personal" ? (
            <button
              onClick={() => handleEdit("personal")}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Edit className="h-4 w-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => handleSave("personal")}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            {isEditing === "personal" ? (
              <input
                type="text"
                value={tempData.name || ""}
                onChange={(e) => setTempData((prev: any) => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{profile.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            {isEditing === "personal" ? (
              <input
                type="text"
                value={tempData.experience || ""}
                onChange={(e) => setTempData((prev: any) => ({ ...prev, experience: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{profile.experience}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
            {isEditing === "personal" ? (
              <input
                type="text"
                value={tempData.tagline || ""}
                onChange={(e) => setTempData((prev: any) => ({ ...prev, tagline: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{profile.tagline}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            {isEditing === "personal" ? (
              <textarea
                rows={4}
                value={tempData.bio || ""}
                onChange={(e) => setTempData((prev: any) => ({ ...prev, bio: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{profile.bio}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            {isEditing === "personal" ? (
              <input
                type="text"
                value={tempData.availability || ""}
                onChange={(e) => setTempData((prev: any) => ({ ...prev, availability: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Available for freelance projects"
              />
            ) : (
              <p className="text-gray-900 py-2">{profile.availability}</p>
            )}
          </div>
        </div>
      </div>

      {/* Skills Management */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg mr-3">
              <Briefcase className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Skills</h3>
          </div>
          {isEditing !== "skills" ? (
            <button
              onClick={() => handleEdit("skills")}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              <Edit className="h-4 w-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => handleSave("skills")}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {isEditing === "skills" && (
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
              placeholder="Add a new skill"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={addSkill}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {(isEditing === "skills" ? tempData.skills || profile.skills : profile.skills).map((skill: string, index: number) => (
            <div
              key={index}
              className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {skill}
              {isEditing === "skills" && (
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-purple-600 hover:text-purple-800"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg mr-3">
              <Mail className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
          </div>
          {isEditing !== "contact" ? (
            <button
              onClick={() => handleEdit("contact")}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              <Edit className="h-4 w-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => handleSave("contact")}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { key: "email", label: "Email", icon: Mail, type: "email" },
            { key: "phone", label: "Phone", icon: Phone, type: "tel" },
            { key: "location", label: "Location", icon: MapPin, type: "text" },
            { key: "website", label: "Website", icon: Globe, type: "url" },
            { key: "linkedin", label: "LinkedIn", icon: Linkedin, type: "url" },
            { key: "github", label: "GitHub", icon: Github, type: "url" },
            { key: "twitter", label: "Twitter", icon: Twitter, type: "url" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <field.icon className="h-4 w-4 inline mr-1" />
                {field.label}
              </label>
              {isEditing === "contact" ? (
                <input
                  type={field.type}
                  value={(tempData.contactInfo?.[field.key as keyof typeof tempData.contactInfo]) || ""}
                  onChange={(e) =>
                    setTempData((prev: any) => ({
                      ...prev,
                      contactInfo: {
                        ...prev.contactInfo,
                        [field.key]: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <p className="text-gray-900 py-2 break-all">
                  {profile.contactInfo[field.key as keyof typeof profile.contactInfo] || "Not set"}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
