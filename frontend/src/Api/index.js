import axios from "axios";

const api = axios.create({
  baseURL: "https://neonflake-backend.vercel.app/api", // Adjust the base URL according to your backend
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
  return await api.get("/get-all-video-list");
};

export const getVideoById = async (id) => {
  return await api.get(`/videos/${id}`);
};

export default api;
