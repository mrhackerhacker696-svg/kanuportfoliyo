const API_BASE_URL = "/api";

// Generic API call function
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      let errorMessage = `API call failed (${response.status}): ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (parseError) {
        // If we can't parse the error response, use the default message
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error: any) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Unable to connect to server. Please check if the server is running.",
      );
    }
    throw error;
  }
}

// Profile API
export const profileAPI = {
  get: () => apiCall("/profile"),
  update: (data: any) =>
    apiCall("/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  updateImage: (profileImage: string) =>
    apiCall("/profile/image", {
      method: "PUT",
      body: JSON.stringify({ profileImage }),
    }),
  updateLogo: (logoText: string) =>
    apiCall("/profile/logo", {
      method: "PUT",
      body: JSON.stringify({ logoText }),
    }),
  updateResume: (resumeUrl: string) =>
    apiCall("/profile/resume", {
      method: "PUT",
      body: JSON.stringify({ resumeUrl }),
    }),
  updateContact: (contactInfo: any) =>
    apiCall("/profile/contact", {
      method: "PUT",
      body: JSON.stringify({ contactInfo }),
    }),
};

// Projects API
export const projectsAPI = {
  getAll: () => apiCall("/projects"),
  getById: (id: string) => apiCall(`/projects/${id}`),
  create: (data: any) =>
    apiCall("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiCall(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiCall(`/projects/${id}`, {
      method: "DELETE",
    }),
};

// Contacts API
export const contactsAPI = {
  getAll: () => apiCall("/contacts"),
  create: (data: any) =>
    apiCall("/contacts", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, status: string) =>
    apiCall(`/contacts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
  delete: (id: string) =>
    apiCall(`/contacts/${id}`, {
      method: "DELETE",
    }),
};

// Git API
export const gitAPI = {
  get: () => apiCall("/git"),
  update: (data: any) =>
    apiCall("/git", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// Migration API
export const migrationAPI = {
  migrate: (localStorageData: any) =>
    apiCall("/migrate/migrate", {
      method: "POST",
      body: JSON.stringify({ localStorageData }),
    }),
  getStatus: () => apiCall("/migrate/status"),
};
