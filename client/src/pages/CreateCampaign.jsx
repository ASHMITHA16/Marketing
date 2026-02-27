import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CreateCampaign = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [contentType, setContentType] = useState("instagram_post");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("campaigns/create", {
        name,
        productDescription,
        budget: Number(budget),
        contentType,
      });
       
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create campaign. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <div style={styles.header}>
          <h1 style={styles.title}>🚀 Launch New Campaign</h1>
          <p style={styles.subtitle}>
            Generate AI-powered marketing strategy for your product
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>

          {error && <div style={styles.error}>{error}</div>}
        
          {/* Product Description */}
          <div style={styles.field}>
            <label style={styles.label}>Product Description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Describe your product clearly..."
              required
              rows="5"
              style={styles.textarea}
            />
          </div>
            <div style={styles.field}>
            <label style={styles.label}>Name</label>
             <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter campaign name"
              required
              style={styles.input}
            />
        
          </div>

          {/* Budget */}
          <div style={styles.field}>
            <label style={styles.label}>Campaign Budget (₹)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter total budget"
              required
              style={styles.input}
            />
          </div>

          {/* Content Type */}
          <div style={styles.field}>
            <label style={styles.label}>Content Type</label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              style={styles.input}
            >
              <option value="instagram_post">Instagram Post</option>
              <option value="instagram_caption">Instagram Caption</option>
              <option value="linkedin_post">LinkedIn Post</option>
              <option value="email_marketing">Email Marketing</option>
            </select>
          </div>

          {/* Buttons */}
          <div style={styles.buttonRow}>
            <button
              type="button"
              style={styles.secondaryButton}
              onClick={() => navigate("/dashboard")}
            >
              ← Back
            </button>

            <button
              type="submit"
              style={styles.primaryButton}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Campaign"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },
  header: {
    marginBottom: "30px",
  },
  title: {
    margin: 0,
    fontSize: "26px",
  },
  subtitle: {
    marginTop: "8px",
    color: "#666",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "500",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  primaryButton: {
    padding: "10px 18px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "10px 18px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#f3f4f6",
    cursor: "pointer",
  },
  error: {
    padding: "10px",
    backgroundColor: "#ffe5e5",
    color: "red",
    borderRadius: "6px",
    fontSize: "13px",
  },
};

export default CreateCampaign;