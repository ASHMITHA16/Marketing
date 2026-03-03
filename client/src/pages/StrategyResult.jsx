import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "../styles/strategyResult.css";

const StrategyResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const output = location.state?.output || location.state?.result;

  if (!output) {
    return <p>No strategy data found.</p>;
  }
return (
  <div className="strategy-page">
    <div className="strategy-container">

      <h1 className="strategy-title">
        Marketing Strategy Blueprint
      </h1>

      <div className="strategy-content">
        <ReactMarkdown>{output}</ReactMarkdown>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="strategy-back"
      >
        ← Back to Dashboard
      </button>

    </div>
  </div>
);
};

export default StrategyResult;