import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Watch.css";

const Watch = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Movie data from state (passed via navigate)
  const movie = location.state;

  return (
    <div className="watch-container">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Movies
      </button>

      <h1 className="watch-title">{title}</h1>
      <div className="video-box">
        {movie?.video ? (
          <video controls autoPlay>
            <source src={movie.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p style={{ color: "#aaa", textAlign: "center" }}>
            No video available for this movie 😢
          </p>
        )}
      </div>
    </div>
  );
};

export default Watch;
