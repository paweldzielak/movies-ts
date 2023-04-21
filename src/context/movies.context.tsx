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
import { MovieT, FilteredYearT } from "../types/types";


export const MovieContext = createContext({
  currentMovies: [],
  handleLoadMoreMovies: () => {},
  totalResults: 0
});

export const MoviesProvider = ({ children }: { children: JSX.Element | JSX.Element[]; }) => {
  const [currentMovies, setCurrentMovies] = useState([] as MovieT[]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [filteredYears, setFilteredYears] = useState([] as FilteredYearT[]);
  const { currentGenreMap, filteredGenreIds } = useContext(GenresContext);

  const handleCurrentMovies = useCallback(
    async (genreMap : Map<number, string>, currentPage = 0, currentMovies: MovieT[] = [], filteredGenreIds: number[] = [], filteredYears: FilteredYearT[] = []) => {
      const { page, results: movies, total_results} = await getDiscoverMovies(
        currentPage + 1,
        filteredGenreIds,
        1000,
        filteredYears,
      );

      const moviesToSet = movies.map((movie:MovieT) => {
        return {
          id: movie.id,
          title: movie.title,
          vote_average: movie.vote_average,
          adult: movie.adult,
          poster_path: getPosterFullUrl(movie.poster_path),
          overview: movie.overview,
          genres: movie.genre_ids?.map((id) => genreMap.get(id)),
          release_date: movie.release_date,
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
