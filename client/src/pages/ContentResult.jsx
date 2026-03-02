import { useLocation, useNavigate } from "react-router-dom";

const ContentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const output = location.state?.output || location.state?.result;

  if (!output) return <p>No content generated.</p>;

  return (
    <div className="min-h-screen bg-gray-200 p-10 flex justify-center">
      
      <div className="bg-white w-96 rounded-xl shadow-lg overflow-hidden">
        
        {/* 🔥 AI Generated Image */}
        <img
          src={output.imageUrl}
          alt="Generated Post"
          className="w-full h-80 object-cover"
        />

        <div className="p-4">
          <h2 className="font-semibold text-lg mb-2">
            {output.title}
          </h2>

          <p className="text-sm whitespace-pre-line mb-3">
            {output.content}
          </p>

          <div className="flex flex-wrap gap-1">
            {output.hashtags?.map((tag, index) => (
              <span key={index} className="text-blue-600 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="absolute top-10 left-10 bg-purple-600 text-white px-4 py-2 rounded"
      >
        Back
      </button>

    </div>
  );
};

export default ContentResult;