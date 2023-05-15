import React from "react";
import { MovieDetailsT } from "../../types/types";

import "./numberDetails.styles.scss";

const NumberDetails: React.FC<{ details: MovieDetailsT }> = ({ details }) => {
  return (
    <div className="media-details__numbers">
      <div className="media-details__numbers-rating">
        <div className="rating-title">TMDB Rating</div>
        <div className="rating-child">{Math.round(details.vote_average * 100) / 100}</div>
      </div>
      <div className="media-details__numbers-rating">
        <div className="rating-title">Your Favorite</div>
        <img src="/favorite.svg" alt="" />
      </div>
      <div className="media-details__numbers-rating">
        <div className="rating-title">popularity</div>
        <div className="rating-child">{Math.round(details.popularity * 10) / 10}</div>
      </div>
    </div>
  );
};

export default NumberDetails;
