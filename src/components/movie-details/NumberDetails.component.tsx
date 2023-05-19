import React from "react";
import { MovieDetailsT } from "../../types/types";
import { useUserDataContext } from "../../context/user-data.context";

import "./numberDetails.styles.scss";

const NumberDetails: React.FC<{ details: MovieDetailsT }> = ({ details }) => {
  const { favoritesMovies, handleBookmarked } = useUserDataContext();

  return (
    <div className="media-details__numbers">
      <div className="media-details__numbers-rating rating-container">
        <div className="rating-title">Rating</div>
        <div className="rating-child">
          <img className="rating-child__icon" src="/rating.svg" alt="" />
          <span className="rating-child__main">{Math.round(details.vote_average * 100) / 100}</span>
          <span className="rating-child__secondary">/10</span>
          <br />
          <span className="rating-child__aux">{Math.round(details.vote_count / 100) / 10}k</span>
        </div>
      </div>
      <div className="media-details__numbers-rating">
        <div className="rating-title">Favorite</div>
        <div className="rating-child">
          <img className="rating-child__icon" style={{ cursor: 'pointer' }}
          src={favoritesMovies.includes(details.id) ? "/favorite.svg" : "notfavorite_light.svg"}
            alt="" onClick={() => handleBookmarked(details.id)}
          />
        </div>
      </div>
      <div className="media-details__numbers-rating">
        <div className="rating-title">popularity</div>
        <div className="rating-child">
          <img className="rating-child__icon" src="/popularity_chart.svg" alt="" />
          <span className="rating-child__main">{Math.round(details.popularity * 10) / 10}</span>
        </div>
      </div>
    </div>
  );
};

export default NumberDetails;
