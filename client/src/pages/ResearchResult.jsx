import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const ResearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis =  location.state?.result;

  if (!analysis) {
    return <p>No research data found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        
        <h1 className="text-3xl font-bold mb-6 text-blue-600">
          Marketing Research Report
        </h1>

        <div className="prose max-w-none">
          <ReactMarkdown>{analysis}</ReactMarkdown>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          ← Back to Dashboard
        </button>

      </div>
    </div>
  );
};

export default ResearchResult;