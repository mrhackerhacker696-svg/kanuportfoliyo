import React, { createContext, useContext, useState, useEffect } from "react";

interface ProfileData {
  profileImage: string;
  logoText: string;
  resumeUrl: string;
  name: string;
  bio: string;
  tagline: string;
  skills: string[];
  experience: string;
  availability: string;
  contactInfo: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website: string;
    twitter: string;
  };
}

interface ProfileContextType {
  profile: ProfileData;
  updateProfileImage: (imageUrl: string) => void;
  updateLogo: (logoText: string) => void;
  updateResumeUrl: (resumeUrl: string) => void;
  updateContactInfo: (contactInfo: any) => void;
  updatePersonalInfo: (info: Partial<ProfileData>) => void;
  updateSkills: (skills: string[]) => void;
  updateBio: (bio: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<ProfileData>({
    profileImage: "",
    logoText: "⚡ logo",
    resumeUrl: "",
    name: "Kanu Prajapati",
    bio: "Passionate full-stack developer with expertise in modern web technologies. I love creating innovative solutions that solve real-world problems and enhance user experiences.",
    tagline: "Building the future, one line of code at a time",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "Express", "JavaScript", "Python", "AWS"],
    experience: "3+ Years",
    availability: "Available for freelance projects",
    contactInfo: {
      email: "kanuprajapati717@gmail.com",
      phone: "+91 9876543210",
      location: "Gujarat, India",
      linkedin: "https://linkedin.com/in/kanuprajapati",
      github: "https://github.com/kanuprajapati",
      website: "https://kanuprajapati.dev",
      twitter: "https://twitter.com/kanuprajapati",
    },
  });

  // Load from localStorage on mount
  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      // Ensure name field exists, fallback to default if empty
      if (!parsed.name || parsed.name.trim() === "") {
        parsed.name = "Kanu Prajapati";
      }
      // Ensure tagline exists
      if (!parsed.tagline || parsed.tagline.trim() === "") {
        parsed.tagline = "Building the future, one line of code at a time";
      }
      setProfile(parsed);
    }
  }, []);

  // Save to localStorage whenever profile changes
  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(profile));
  }, [profile]);

  const updateProfileImage = (imageUrl: string) => {
    setProfile((prev) => ({ ...prev, profileImage: imageUrl }));
  };

  const updateLogo = (logoText: string) => {
    setProfile((prev) => ({ ...prev, logoText }));
  };

  const updateResumeUrl = (resumeUrl: string) => {
    setProfile((prev) => ({ ...prev, resumeUrl }));
  };

  const updateContactInfo = (contactInfo: any) => {
    setProfile((prev) => ({ ...prev, contactInfo }));
  };

  const updatePersonalInfo = (info: Partial<ProfileData>) => {
    setProfile((prev) => ({ ...prev, ...info }));
  };

  const updateSkills = (skills: string[]) => {
    setProfile((prev) => ({ ...prev, skills }));
  };

  const updateBio = (bio: string) => {
    setProfile((prev) => ({ ...prev, bio }));
  };

  const value = {
    profile,
    updateProfileImage,
    updateLogo,
    updateResumeUrl,
    updateContactInfo,
    updatePersonalInfo,
    updateSkills,
    updateBio,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
