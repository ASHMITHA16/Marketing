import { useLocation, useNavigate } from "react-router-dom";
import "../styles/contentResult.css";

const ContentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const output = location.state?.output || location.state?.result;

  if (!output) return <p>No content generated.</p>;

  return (
  <div className="content-page">

    <button
      onClick={() => navigate(-1)}
      className="back-button"
    >
      ← Back
    </button>

    <div className="content-card">

      <img
        src={output.imageUrl}
        alt="Generated Post"
      />

      <div className="content-body">
        <h2 className="content-title">
          {output.title}
        </h2>

        <p className="content-text">
          {output.content}
        </p>

        <div className="hashtags">
          {output.hashtags?.map((tag, index) => (
            <span key={index} className="hashtag">
              {tag}
            </span>
          ))}
        </div>
      </div>

    </div>

  </div>
);
};
export default ContentResult;