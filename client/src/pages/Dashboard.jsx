import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCampaign, setSelectedCampaign] = useState(
    location.state?.selectedCampaign || null
  );

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runAgent = async (type) => {
    if (!selectedCampaign) {
      alert("Select a campaign first");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post(
        `/agent/${selectedCampaign._id}/${type}`
      );

      setResult(res.data.result);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>Dashboard</h1>
       <button
          style={styles.newBtn}
          onClick={() => navigate("/campaigns")}
          >
          + New Campaign
          </button>
          
        <button
          style={styles.newBtn}
          onClick={() => navigate("/fetch")}
        >
          Select Campaign
        </button>
      </div>

      {selectedCampaign && (
        <div style={styles.selectedBox}>
          <h3>Selected Campaign:</h3>
          <p>{selectedCampaign.productDescription}</p>
        </div>
      )}

      <div style={styles.agentGrid}>
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
      </div>

      {loading && <p>Processing...</p>}

      {result && (
        <div style={styles.resultBox}>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

const AgentCard = ({ title, onClick }) => (
  <div style={styles.card} onClick={onClick}>
    <h3>{title}</h3>
  </div>
);

const styles = {
  page: {
    padding: "40px",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  newBtn: {
    padding: "8px 14px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  selectedBox: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  agentGrid: {
    display: "flex",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  resultBox: {
    marginTop: "30px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
  },
};

export default Dashboard;