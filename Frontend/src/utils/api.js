import axios from "axios";
import { auth } from "../../firebase-config";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  try {
    // Get Firebase ID token instead of JWT from localStorage
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
    // If token retrieval fails, continue without token
  }
  return config;
});

export default api;
