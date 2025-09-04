import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  try {
    // Get token from localStorage instead of Firebase
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
  }
  return config;
});

// Response interceptor - handle 401s
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('401 Unauthorized - clearing storage and redirecting');
      
      // Clear storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Redirect to login
      window.location.href = '/admin/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;
