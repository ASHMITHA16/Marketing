import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/fetchCampaign.css";
const FetchCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await API.get("/campaigns/fetchCampaigns");
      console.log("Fetched campaigns:", res.data);
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
  <div className="fetch-page">
    <h1 className="fetch-title">Select Campaign</h1>

    <div className="campaign-list">
      {campaigns.map((c) => (
        <div
          key={c._id}
          className="campaign-card"
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

export default FetchCampaign;