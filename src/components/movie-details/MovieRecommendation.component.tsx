import React, { useState } from "react";
import { MovieDetailsT, RecommendationT } from "../../types/types";
import { getPosterFullUrl } from "../../utils/media.utils";

import { getMovieMoreDetails } from "../../utils/movie.utils";
import ReactCardFlip from "react-card-flip";
import { useUserDataContext } from "../../context/user-data.context";

import "./movieRecommendation.styles.scss";
import { useMovieContext } from "../../context/movies.context";
import CalendarIcon from "../../Icons/CalendarIcon";

type MovieRecommendationProps = {
  recommendation: RecommendationT;
  openModal: (modalDetails: MovieDetailsT) => void;
};


const Recommendation: React.FC<MovieRecommendationProps> = ({ recommendation, openModal }) => {

  const { genreMap } = useMovieContext()

  const { favoritesMovies, handleBookmarked } = useUserDataContext();
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const posterPath = getPosterFullUrl(recommendation.poster_path);
  const backdropPath = getPosterFullUrl(recommendation.backdrop_path);

  const voteAverage = Math.round(recommendation.vote_average * 10) / 10;

  const genreList = recommendation.genre_ids?.map((id) => genreMap.get(id));

  const handleClick = async () => {
    const newDetails = await getMovieMoreDetails(recommendation.id)
    openModal(newDetails);
  }

  const handleFlip = () => {
    setIsFlipped(prevState => !prevState);
  }

  return (
    <span onMouseEnter={handleFlip} onMouseLeave={handleFlip}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" >
        <div className="recommendation-container" >
          <img className="recommendation-poster" src={posterPath} alt={recommendation.title} />
        </div>

        <div className="recommendation-container-flipped">
          <img className="flipped__poster" src={backdropPath} alt={recommendation.title} />
          <img className="flipped__favorite" style={{ cursor: 'pointer' }}
            src={favoritesMovies.includes(recommendation.id) ? "/favorite.svg" : "notfavorite_light.svg"}
            alt="" onClick={() => handleBookmarked(recommendation.id)}
          />
          <h5 className="flipped__title">{recommendation.title}</h5>
          <div className="flipped__info">
            <CalendarIcon />
            {recommendation.release_date}
          </div>
          <div className="flipped__info">
            <img src="/popularity_chart.svg" alt="" />
            {voteAverage}
          </div>
          {/* <div className="flipped__info">
            <img src="/language.svg" alt="" />
            {recommendation.original_language}
            </div>  */}
          {/* <div className="flipped__info genres">{genreList}</div> */}
          <div className="flipped__info genre-container">
            {!!genreList?.length && genreList.map((genre, index) => {
              console.log(genre, index);
              if ((index + 1) % 2 === 0) return <><br /><span key={'r' + recommendation.title + genre} className="genre__recommendation">{` ${genre}`}</span></>
              return <span key={'r' + recommendation.title + genre} className="genre__recommendation">{` ${genre}`}</span>;
            })}
          </div>
          <button className="btn flipped__btn" onClick={handleClick}>Show more details</button>
        </div>
      </ReactCardFlip>
    </span>
  );
};

export default Recommendation;
