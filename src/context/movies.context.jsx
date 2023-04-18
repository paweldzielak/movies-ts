import { useMemo } from "react";
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { GenresContext } from "./genres.context";

import { getDiscoverMovies } from "../utils/movie.utils";
import { getPosterFullUrl } from "../utils/media.utils";


export const MovieContext = createContext({
  currentMovies: [],
  handleLoadMoreMovies: () => {},
  totalResults: 0
});

export const MoviesProvider = ({ children }) => {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [filteredYears, setFilteredYears] = useState([]);
  const { currentGenreMap, filteredGenreIds } = useContext(GenresContext);

  const handleCurrentMovies = useCallback(
    async (genreMap, currentPage = 0, currentMovies = [], filteredGenreIds = [], filteredYears = []) => {
      const { page, results: movies, total_results} = await getDiscoverMovies(
        currentPage + 1,
        filteredGenreIds,
        1000,
        filteredYears,
      );

      const moviesToSet = movies.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          voteAverage: movie.vote_average,
          adult: movie.adult,
          posterPath: getPosterFullUrl(movie.poster_path),
          description: movie.overview,
          genres: movie.genre_ids.map((id) => genreMap.get(id)),
          releaseDate: movie.release_date,
        };
      });
      setCurrentPage(page);
      setTotalResults(total_results);
      setCurrentMovies([...currentMovies, ...moviesToSet]);
    },
    []
  );

  const handleLoadMoreMovies = useCallback(() => {
    handleCurrentMovies(currentGenreMap, currentPage, currentMovies, filteredGenreIds, filteredYears);
  })

  const contextValue = useMemo(() => ({
    currentMovies,
    setCurrentMovies,
    handleLoadMoreMovies,
    setFilteredYears,
    filteredYears,
    totalResults
  }), [currentMovies, setCurrentMovies, handleLoadMoreMovies, setFilteredYears, filteredYears, totalResults]);

  useEffect(() => {
    if (currentGenreMap) handleCurrentMovies(currentGenreMap, 0, [], filteredGenreIds, filteredYears);
  }, [handleCurrentMovies, currentGenreMap, filteredGenreIds, filteredYears]);

  return (
    <MovieContext.Provider value={contextValue}>{children}</MovieContext.Provider>
  );
};
