import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Prevents "flickering" login screens

  // // Load user from localStorage on initial render
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  // 1. CHECK SESSION ON APP LOAD
  useEffect(() => {
    const verifySession = async () => {
      try {
        // We use relative path because baseURL is set in apiConfig
        const response = await axios.get("/api/user/auth/check-session");
        setUser(response.data);
      } catch (error) {
        // If 401 (Unauthorized), user is just not logged in.
        // We don't need to alert an error, just ensure user is null.
        setUser(null);
      } finally {
        setLoading(false); // App is ready to render
      }
    };

    verifySession();
  }, []);

  // 2. LOGIN FUNCTION
  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/user/auth/login", {
        email,
        password,
      });

      // Update state
      setUser(response.data);

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Invalid email or password.",
      };
    }
  };

  // 3. LOGOUT FUNCTION
  const logout = async () => {
    try {
      await axios.post("/api/user/auth/logout");
      setUser(null); // Clear frontend state immediately
      // Optional: Navigate to home here if you pass 'navigate' or use window.location
      alert("You have been logged out successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, loading }}>
      {!loading ? (
        children
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
      )}
    </UserContext.Provider>
  );
};
