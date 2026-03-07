import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import { useEffect } from "react";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const campaignId = location.state?.campaignId;

  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (campaignId) {
    fetchCampaignById();
  }
}, [campaignId]);

const fetchCampaignById = async () => {
  try {
    const res = await API.get(`/campaigns/${campaignId}`);
    setSelectedCampaign(res.data);
  } catch (err) {
    console.log(err);
  }
};
  
  const runAgent = async (type) => {
    if (!selectedCampaign) {
      alert("Select a campaign first");
      return;
    }

    setLoading(true);

    try {
      console.log("Running agent:", type, "for campaign ID:", campaignId);
      const res = await API.post(
        `/agents/${campaignId}/${type}`
      );
     const output=res.data.result;
     console.log("Agent output:", output);
     if(type==="research"){
      navigate("/research-result", { state: { result: output } });
    } 
    else if(type==="strategy"){
      navigate("/strategy-result", { state: { result: output } });
    }
    else if(type==="content"){
      navigate("/content-result", { state: { result: output } });
    }
    else if(type==="analytics"){
     navigate("/analytics-result", { state: { result: output } });
   }
   else if(type==="optimization"){
     navigate("/optimization-result", { state: { result: output } });
   }
  }
    catch (error) {
  console.error("🔥 AGENT CRASH:", error);
  console.error("Response data:", error.response?.data);
  res.status(500).json({ error: error.message });
}

    setLoading(false);
  };

  return (
  <div className="dashboard-page">

    <div className="dashboard-header">
      <h1>Dashboard</h1>

      <div>
        <button
          className="btn-primary"
          onClick={() => navigate("/campaigns")}
        >
          + New Campaign
        </button>

        <button
          className="btn-primary"
          onClick={() => navigate("/fetch")}
        >
          Select Campaign
        </button>
      </div>
    </div>

    {selectedCampaign && (
      <div className="selected-box">
        <h3>Selected Campaign:</h3>
        <p>{selectedCampaign.productDescription}</p>
      </div>
    )}

    <div className="agent-grid">
      <AgentCard
        title="Research Agent"
        onClick={() => runAgent("research")}
      />
      <AgentCard
        title="Strategy Agent"
        onClick={() => runAgent("strategy")}
      />
      <AgentCard
        title="Content Agent"
        onClick={() => runAgent("content")}
      />
      <AgentCard
      title="Analytics Agent"
      onClick={() => runAgent("analytics")}
     />

    <AgentCard
    title="Optimization Agent"
    onClick={() => runAgent("optimization")}
   />
    </div>

    {loading && <p>Processing...</p>}
  </div>
);
};

const AgentCard = ({ title, onClick }) => (
  <div className="agent-card" onClick={onClick}>
    <h3>{title}</h3>
  </div>
);

export default Dashboard;



