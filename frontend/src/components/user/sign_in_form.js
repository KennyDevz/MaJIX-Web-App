import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function SignInForm({ onClose }) {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/api/user/auth/login",
        formData
      );

      if (response.data) {
        const userData = {
          id: response.data.id,
          role: response.data.role,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email


        };

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData)
        console.log(response)

        alert("Login Successful!")

        if(userData.role === 'CUSTOMER') 
          navigate("/", { replace: true })
        else if(userData.role === 'ADMIN') 
          navigate("/admin", { replace: true })

        if (onClose) onClose(); // avoid 2 alerts check if onClose is defined or presents
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
      alert("Login failed!");
      setFormData({ email: "", password: "" });
    }
  }

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
            <label htmlFor="email" style={{ fontWeight: "500" }}>
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
                border: "1px solid #a0a0a0ff",
                paddingLeft: "15px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="password" style={{ fontWeight: "500" }}>
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
                border: "1px solid #a0a0a0ff",
                paddingLeft: "15px",
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

          {message && (
            <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
