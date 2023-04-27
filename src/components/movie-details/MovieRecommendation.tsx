import React from "react";
import { RecommendationT } from "../../types/types";
import { getPosterFullUrl } from "../../utils/media.utils";

import "./movieRecommendation.styles.scss";

const Recommendation: React.FC<{ recommendation: RecommendationT }> = ({ recommendation }) => {
  const posterPath = getPosterFullUrl(recommendation.poster_path);

  return (
    <div className="recommendation-container">
      <img className="recommendation-poster" src={posterPath} alt={recommendation.title} />
    </div>
  );
};

export default Recommendation;
