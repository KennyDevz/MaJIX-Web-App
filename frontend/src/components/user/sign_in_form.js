import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function SignInForm({ onClose }) {
  // Get the login function from our new Provider
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous errors

    // Call the context function
    const result = await login(formData.email, formData.password);

    if (result.success) {
      // We don't have the user object here directly anymore, but Context has it.
      // If you need to redirect based on role, you can get 'user' from context
      // *after* a re-render, OR return the user object from the login function.
      // For now, let's just go to root or admin based on a quick check or default.
      // Simple fix: Reload or just close. The Context updates automatically.
      if (onClose) onClose();
      alert("Login Successful!"); //simple success 
      if(result.role === 'CUSTOMER') 
          navigate("/", { replace: true })
        else if(result.role === 'ADMIN') 
          navigate("/admin", { replace: true })
      // Logic for redirecting can be added here if login() returns the user object.
    } else {
      setMessage(result.message);
      setFormData({ ...formData, password: "" }); // Clear password on fail
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          padding: "30px",
          width: "400px",
          borderRadius: "12px",
          position: "relative",
          boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
          animation: "fadeIn 0.3s ease",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <p
          style={{
            fontFamily: "Poppins",
            fontSize: "28px",
            margin: "0 0 10px 0",
            fontWeight: "500",
          }}
        >
          Welcome back!
        </p>
        <p
          style={{
            fontFamily: "Poppins",
            fontSize: "14px",
            margin: "0 0 20px 0",
            color: "#555",
          }}
        >
          Enter your credentials to access your account.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="email"
              style={{ fontWeight: "500", color: "black" }}
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={formData.email}
              required
              style={{
                fontFamily: "Poppins",
                borderRadius: "10px",
                height: "40px",
                border: message ? "1px solid red" : "1px solid #a0a0a0ff",
                paddingLeft: "15px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="password"
              style={{ fontWeight: "500", color: "black" }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={formData.password}
              required
              style={{
                fontFamily: "Poppins",
                borderRadius: "10px",
                height: "40px",
                border: message ? "1px solid red" : "1px solid #a0a0a0ff",
                paddingLeft: "15px",
                backgroundColor: message ? "#ffa3a36f" : "#FFF",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <a
              href="#"
              style={{
                textDecoration: "none",
                color: "blue",
                fontSize: "12px",
              }}
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "black",
              height: "42px",
              borderRadius: "10px",
              color: "#FFF",
              fontFamily: "Poppins",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
        {message && (
          <div
            style={{
              display: "flex",
              color: "red",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "5px",
              borderRadius: "10px",
            }}
          >
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
