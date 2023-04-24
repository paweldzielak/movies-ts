import React from "react";
import { Recommendation } from "../../types/types";

const MovieRecommendations: React.FC<Recommendation[]>  = (recommendations)  => {
  if (recommendations) {
    console.log("recommendations[0]", recommendations[0]);
  }

  const getRecommendation = (r: Recommendation) => {
    console.log('recommendation', r);
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
