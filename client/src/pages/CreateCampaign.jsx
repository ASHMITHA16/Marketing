import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/createCampaign.css";

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
  <div className="create-page">
    <div className="create-container">

      <div className="create-header">
        <h1>🚀 Launch New Campaign</h1>
        <p>Generate AI-powered marketing strategy for your product</p>
      </div>

      <form onSubmit={handleSubmit} className="create-form">

        {error && <div className="error-box">{error}</div>}

        <div className="form-field">
          <label>Product Description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Describe your product clearly..."
            required
            rows="5"
            className="form-textarea"
          />
        </div>

        <div className="form-field">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter campaign name"
            required
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label>Campaign Budget (₹)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter total budget"
            required
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label>Content Type</label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="form-select"
          >
            <option value="instagram_post">Instagram Post</option>
            <option value="instagram_caption">Instagram Caption</option>
            <option value="linkedin_post">LinkedIn Post</option>
            <option value="email_marketing">Email Marketing</option>
          </select>
        </div>

        <div className="button-row">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            ← Back
          </button>

          <button
            type="submit"
            className="btn-primary"
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



export default CreateCampaign;