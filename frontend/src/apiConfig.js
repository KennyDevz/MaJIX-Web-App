import axios from "axios";

// 1. Set the URL for your backend
axios.defaults.baseURL = "http://localhost:8081";

// 2. IMPORTANT: Allow cookies to be sent with every request
axios.defaults.withCredentials = true;

// 3. Optional: Global error handler (e.g., if session expires, auto-logout)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If backend says "Unauthorized", you could auto-logout here
      // but for your demo, just logging it is fine.
      console.log("Session expired or invalid.");
    }
    return Promise.reject(error);
  }
);

export default axios;
export const API_BASE_URL = "http://localhost:8081/api";
