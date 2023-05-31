import React from "react";
import { MovieDetailsT } from "../../types/types";
import { useUserDataContext } from "../../context/user-data.context";

import "./numberDetails.styles.scss";
import RatingIcon from "../../Icons/RatingIcon";
import PopularityIcon from "../../Icons/PopularityIcon";
import FavoriteIcon from "../../Icons/FavoriteIcon";

const NumberDetails: React.FC<{ details: MovieDetailsT }> = ({ details }) => {
  const { favoritesMovies, handleBookmarked } = useUserDataContext();

  const isFavorite = favoritesMovies.includes(details.id)

  return (
    <div className="media-details__numbers">
      <div className="media-details__numbers-rating rating-container">
        <div className="rating-title">Rating</div>
        <div className="rating-child">
          <RatingIcon className="rating-child__icon" />
          <span className="rating-child__main">{Math.round(details.vote_average * 100) / 100}</span>
          <span className="rating-child__secondary">/10</span>
          <br />
          <span className="rating-child__aux">{Math.round(details.vote_count / 100) / 10}k</span>
        </div>
      </div>
      <div className="media-details__numbers-rating">
        <div className="rating-title">Favorite</div>
        <div className="rating-child">
          <FavoriteIcon fill={isFavorite ? "#ED8A19" : "none"}
            stroke={isFavorite ? "none" : "currentColor"} strokeWidth='2.5px'
            className="rating-child__icon" onClick={() => handleBookmarked(details.id)} />
        </div>
      </div>
      <div className="media-details__numbers-rating">
        <div className="rating-title">popularity</div>
        <div className="rating-child">
        <PopularityIcon stroke="var(--color-blue-darker)" strokeWidth={0.6} className="rating-child__icon" />
          <span className="rating-child__main">{Math.round(details.popularity * 10) / 10}</span>
        </div>
      </div>
    </div>
  );
};

export default NumberDetails;
