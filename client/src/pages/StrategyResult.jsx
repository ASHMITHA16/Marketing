import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const StrategyResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const output = location.state?.output || location.state?.result;

  if (!output) {
    return <p>No strategy data found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        
        <h1 className="text-3xl font-bold mb-6 text-green-600">
          Marketing Strategy Blueprint
        </h1>

        <div className="prose max-w-none">
          <ReactMarkdown>{output}</ReactMarkdown>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          ← Back to Dashboard
        </button>

      </div>
    </div>
  );
};

export default StrategyResult;