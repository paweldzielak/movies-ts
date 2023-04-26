import React from "react";
import { Recommendation } from "../../types/types";

const MovieRecommendations: React.FC<{recommendations: Recommendation[]}> = ({ recommendations }) => {
  const getRecommendation = (r: Recommendation) => {
    return <div>{r.title}</div>;
  };

  return (
    <div className="media-details__recommendations">
      {recommendations.map((r: Recommendation) => {
        return getRecommendation(r);
      })}
    </div>
  );
};

export default MovieRecommendations;
