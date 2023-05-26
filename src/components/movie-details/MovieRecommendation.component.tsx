import React, { useState } from "react";
import { MovieDetailsT, RecommendationT } from "../../types/types";
import { getPosterFullUrl } from "../../utils/media.utils";

import { getMovieMoreDetails } from "../../utils/movie.utils";
import ReactCardFlip from "react-card-flip";
import { useUserDataContext } from "../../context/user-data.context";

import "./movieRecommendation.styles.scss";

type MovieRecommendationProps = {
  recommendation: RecommendationT;
  openModal: (modalDetails: MovieDetailsT) => void;
};


const Recommendation: React.FC<MovieRecommendationProps> = ({ recommendation, openModal }) => {

  const { favoritesMovies, handleBookmarked } = useUserDataContext();
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const posterPath = getPosterFullUrl(recommendation.poster_path);
  const backdropPath = getPosterFullUrl(recommendation.backdrop_path);

  const voteAverage = Math.round(recommendation.vote_average * 10) / 10;

  const handleClick = async () => {
    const newDetails = await getMovieMoreDetails(recommendation.id)
    openModal(newDetails);
  }

  const handleFlip = () => {
    setIsFlipped(prevState => !prevState);
  }

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div className="recommendation-container" onClick={handleFlip}>
        <img className="recommendation-poster" src={posterPath} alt={recommendation.title} />
        <p className="recommendation-rating">{voteAverage}</p>
      </div>

      <div className="recommendation-container-flipped">
        <img className="flipped__poster" src={backdropPath} alt={recommendation.title} />
        <img className="flipped__favorite" style={{ cursor: 'pointer' }}
          src={favoritesMovies.includes(recommendation.id) ? "/favorite.svg" : "notfavorite_light.svg"}
          alt="" onClick={() => handleBookmarked(recommendation.id)}
        />
        <h5 className="flipped__title">{recommendation.title}</h5>
        <div className="flipped__info">{recommendation.release_date}</div> 
        <div className="flipped__info">{recommendation.media_type}</div> 
        <div className="flipped__info">{recommendation.original_language}</div> 
        <div className="flipped__info">{recommendation.genre_ids}</div>
        <button className="btn flipped__btn" onClick={handleClick}>Show more details</button>
      </div>
    </ReactCardFlip>
  );
};

export default Recommendation;
