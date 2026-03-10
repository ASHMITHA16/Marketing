import { useLocation, useNavigate } from "react-router-dom";
import AnalyticsChart from "../components/AnalyticsChart";
import "../styles/analyticsResult.css";

const AnalyticsResult = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state?.result;

  if (!data) return <p>No analytics available</p>;

  return (
    <div className="analytics-page">

      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <h1>Campaign Analytics</h1>

      <div className="analytics-grid">

        <div className="metric">
          <h3>Impressions</h3>
          <p>{data.impressions}</p>
        </div>

        <div className="metric">
          <h3>Clicks</h3>
          <p>{data.clicks}</p>
        </div>

        <div className="metric">
          <h3>Conversions</h3>
          <p>{data.conversions}</p>
        </div>

        <div className="metric">
          <h3>CTR</h3>
          <p>{data.ctr}%</p>
        </div>

        <div className="metric">
          <h3>Conversion Rate</h3>
          <p>{data.conversionRate}%</p>
        </div>

        <div className="metric">
          <h3>Performance Score</h3>
          <p>{data.performanceScore}/100</p>
        </div>

      </div>

      <div className="chart-container">
        <AnalyticsChart
          impressions={data.impressions}
          clicks={data.clicks}
          conversions={data.conversions}
        />
      </div>

    </div>
  );
};

export default AnalyticsResult;