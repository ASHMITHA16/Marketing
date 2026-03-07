import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "../styles/optimizationResult.css";

const OptimizationResult = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const output = location.state?.result;

  if (!output) {
    return <p>No optimization data found.</p>;
  }

  return (
    <div className="optimization-page">

      <div className="optimization-container">

        <h1 className="optimization-title">
          Campaign Optimization Suggestions
        </h1>

        <div className="optimization-content">
          <ReactMarkdown>{output}</ReactMarkdown>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="optimization-back"
        >
          ← Back to Dashboard
        </button>

      </div>

    </div>
  );
};

export default OptimizationResult;