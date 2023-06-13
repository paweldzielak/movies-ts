import React, { useState } from "react";
import { useUserDataContext } from "../../context/user-data.context";
import Title from "../title/Title.component";
import "./movieCard.styles.scss";
import { getMovieMoreDetails } from "../../utils/movie.utils";
import { MovieDetailsT, MovieT } from "../../types/types";
import FavoriteIcon from "../../Icons/FavoriteIcon";

type MovieCardProps = {
  movie: MovieT;
  openModal: (modalDetails: MovieDetailsT) => void;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, openModal }) => {
  const { favoritesMovies, handleBookmarked } = useUserDataContext();
  const [details, setDetails] = useState<MovieDetailsT>();

  const getDetails = async () => {
    if (!details) {
      const localDetails = await getMovieMoreDetails(movie.id);
      setDetails(localDetails);
      return localDetails;
    }
    return details;
  };

  const isFavorite = favoritesMovies.includes(movie.id);

  const handleImdb = async () => {
    const details = await getDetails();
    const { imdb_id } = details;
    window.open(`https://www.imdb.com/title/${imdb_id}`, "_blank", "noreferrer");
  };

  const openDetails = async () => {
    const details = await getDetails();
    openModal(details);
  };

  const getReleaseYear = () => {
    if (movie?.release_date && !movie.release_date.includes("-")) return null;
    return movie.release_date.split("-")[0];
  };

  return (
    <div className="movie-card">
      <img className="poster" src={movie.poster_path || "default-image.jpg"} alt={movie.title} />
      <Title title={movie.title} genres={movie.genres as string[]} openDetails={openDetails} releaseYear={getReleaseYear()}></Title>
      <span className="description">{movie.overview}</span>
      <div className="vote-favorite-container">
        <span className="vote">{movie.vote_average}</span>
        <FavoriteIcon fill={isFavorite ? "#ED8A19" : "none"}
          stroke={isFavorite ? "none" : "currentColor"}
          // TODO add title on hover
          className="favorite-button" onClick={() => handleBookmarked(movie.id)} />
        <img
          className="imdb-img"
          alt={`Open ${movie.title} on IMDB`}
          src={"imdb.svg"}
          title={`Open ${movie.title} on IMDB`}
          onClick={handleImdb}
        />
      </div>
    </div>
  );
};

export default MovieCard;
