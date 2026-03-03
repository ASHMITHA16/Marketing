import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "../styles/researchResult.css";

const ResearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis =  location.state?.result;

  if (!analysis) {
    return <p>No research data found.</p>;
  }

  return (
  <div className="research-page">
    <div className="research-container">

      <h1 className="research-title">
        Marketing Research Report
      </h1>

      <div className="research-content">
        <ReactMarkdown>{analysis}</ReactMarkdown>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="research-back"
      >
        ← Back to Dashboard
      </button>

    </div>
  </div>
);
};

export default ResearchResult;