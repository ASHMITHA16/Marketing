import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });
      console.log("Login successful:", res);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };


  return (
  <div className="login-page">
    <div className="login-card">
      <h2>Login to CampaignIQ</h2>

      {error && <p className="login-error">{error}</p>}

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          required
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <p className="login-footer">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  </div>
);
};

export default Login;