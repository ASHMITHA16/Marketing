import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "../styles/analyticsResult.css";

const AnalyticsResult = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const output = location.state?.result;

  if (!output) {
    return <p>No analytics data found.</p>;
  }

  return (
    <div className="analytics-page">

      <div className="analytics-container">

        <h1 className="analytics-title">
          Campaign Analytics Report
        </h1>

        <div className="analytics-content">
          <ReactMarkdown>{output}</ReactMarkdown>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="analytics-back"
        >
          ← Back to Dashboard
        </button>

      </div>

    </div>
  );
};

export default AnalyticsResult;