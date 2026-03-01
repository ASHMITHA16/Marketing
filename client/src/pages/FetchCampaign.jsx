import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const FetchCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await API.get("/campaigns/fetchCampaigns");
      setCampaigns(res.data);
    } catch (err) {
      console.log(err);
    }
  };

 const handleSelect = (campaign) => {
  navigate("/dashboard", {
    state: { campaignId: campaign._id }
  });
};

  return (
    <div style={styles.page}>
      <h1>Select Campaign</h1>

      <div style={styles.list}>
        {campaigns.map((c) => (
          <div
            key={c._id}
            style={styles.card}
            onClick={() => handleSelect(c)}
          >
            <h3>{c.name}</h3>
            <p>Budget: ₹{c.budget}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "40px",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
};

export default FetchCampaign;