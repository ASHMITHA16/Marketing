import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/auth/signup",{
         name: formData.name,
        companyName: formData.companyName,
        email: formData.email,
        password: formData.password,
      });
      navigate("/login");
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
  <div className="signup-page">
    <div className="signup-card">
      <h2>Create Account</h2>

      {error && <p className="signup-error">{error}</p>}

      <form onSubmit={handleSignup} className="signup-form">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="signup-input"
          onChange={handleChange}
        />

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          required
          className="signup-input"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="signup-input"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="signup-input"
          onChange={handleChange}
        />

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>

      <p className="signup-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  </div>
);
};


export default Signup;