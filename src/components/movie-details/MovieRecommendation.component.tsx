import React from "react";
import { MovieDetailsT, RecommendationT } from "../../types/types";
import { getPosterFullUrl } from "../../utils/media.utils";

import "./movieRecommendation.styles.scss";
import { getMovieMoreDetails } from "../../utils/movie.utils";

type MovieRecommendationProps = {
  recommendation: RecommendationT;
  openModal: (modalDetails: MovieDetailsT) => void;
};


const Recommendation: React.FC<MovieRecommendationProps> = ({ recommendation, openModal }) => {
  const posterPath = getPosterFullUrl(recommendation.poster_path);
  const voteAverage = Math.round(recommendation.vote_average * 10) / 10;

  const handleClick = async () => {
    const newDetails = await getMovieMoreDetails(recommendation.id)
    openModal(newDetails);
  }

  return (
    <div className="recommendation-container" onClick={handleClick}>
      <img className="recommendation-poster" src={posterPath} alt={recommendation.title} />
      <p className="recommendation-rating">{voteAverage}</p>
    </div>
  );
};

export default Recommendation;
