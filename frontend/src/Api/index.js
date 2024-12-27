import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Adjust the base URL according to your backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Video endpoints
export const uploadVideo = async (formData) => {
  return await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Necessary for file uploads
    },
  });
};

export const getVideos = async () => {
  return await api.get("/videos");
};

export const getVideoById = async (id) => {
  return await api.get(`/videos/${id}`);
};

export default api;
