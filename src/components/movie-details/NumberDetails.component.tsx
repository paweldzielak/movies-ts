import React from "react";
import { MovieDetailsT } from "../../types/types";
import { useUserDataContext } from "../../context/user-data.context";

import "./numberDetails.styles.scss";

const NumberDetails: React.FC<{ details: MovieDetailsT }> = ({ details }) => {
  const { favoritesMovies, handleBookmarked } = useUserDataContext();

  return (
    <div className="media-details__numbers">
      <div className="media-details__numbers-rating">
        <div className="rating-title">TMDB Rating</div>
        <div className="rating-child">{Math.round(details.vote_average * 100) / 100}</div>
      </div>
      <div className="media-details__numbers-rating">
        <div className="rating-title">Your Favorite</div>
        <img
          src={favoritesMovies.includes(details.id) ? "/favorite.svg" : "notfavorite_light.svg"}
          alt=""
          onClick={() => handleBookmarked(details.id)}
        />
      </div>
      <div className="media-details__numbers-rating">
        <div className="rating-title">popularity</div>
        <div className="rating-child">{Math.round(details.popularity * 10) / 10}</div>
      </div>
    </div>
  );
};

export default NumberDetails;
