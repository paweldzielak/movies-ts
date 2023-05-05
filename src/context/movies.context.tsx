import React, { FC, PropsWithChildren, useMemo } from "react";
import { createContext, useState, useCallback, useEffect } from "react";

import { getDiscoverMovies, getGenresMapFromAPI } from "../utils/movie.utils";
import { getPosterFullUrl } from "../utils/media.utils";
import { MovieT, FilteredYearT } from "../types/types";

export type MovieContextState = {
  currentMovies: MovieT[];
  setCurrentMovies: (currentMovies: MovieT[]) => void;
  handleLoadMoreMovies: (
    currentGenreMap: Map<number, string>,
    currentPage: number,
    currentMovies: MovieT[],
    filteredGenreIds: number,
    filteredYears: FilteredYearT[]
  ) => void;
  setFilteredYears: (filteredYears: FilteredYearT[]) => void;
  filteredYears: FilteredYearT[];
  totalResults: number;
  genreMap: Map<number, string>;
  filteredGenreIds: number[];
  setFilteredGenreIds: (filteredGenresIds: number[]) => void;
};

const MovieContext = createContext({} as MovieContextState);

export const MoviesContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentMovies, setCurrentMovies] = useState<MovieT[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [filteredYears, setFilteredYears] = useState<FilteredYearT[]>([]);
  const [filteredGenreIds, setFilteredGenreIds] = useState<number[]>([]);
  const [genreMap, setGenreMap] = useState<Map<number, string>>(new Map());

  const handleCurrentMovies = useCallback(
    async (genres = genreMap, currentPage = 0, currentMovies: MovieT[] = [], filteredGenreIds: number[] = [], filteredYears: FilteredYearT[] = []) => {
      const { page, results: movies, total_results } = await getDiscoverMovies(currentPage + 1, filteredGenreIds, 1000, filteredYears);
      const moviesToSet = movies.map((movie: MovieT) => {
        return {
          id: movie.id,
          title: movie.title,
          vote_average: movie.vote_average,
          adult: movie.adult,
          poster_path: getPosterFullUrl(movie.poster_path),
          overview: movie.overview,
          genres: movie.genre_ids?.map((id) => genres.get(id)),
          release_date: movie.release_date,
        };
      });
      setCurrentPage(page);
      setTotalResults(total_results);
      setCurrentMovies([...currentMovies, ...moviesToSet]);
    },
    [genreMap]
  );

  const handleLoadMoreMovies = useCallback(() => {
    handleCurrentMovies(genreMap, currentPage, currentMovies, filteredGenreIds, filteredYears);
  }, [genreMap, currentMovies, filteredGenreIds, currentPage, filteredYears, handleCurrentMovies]);

  const contextValue = useMemo(
    () => ({
      currentMovies,
      setCurrentMovies,
      handleLoadMoreMovies,
      setFilteredYears,
      filteredYears,
      totalResults,
      genreMap,
      filteredGenreIds,
      setFilteredGenreIds,
    }),
    [currentMovies, setCurrentMovies, handleLoadMoreMovies, setFilteredYears, filteredYears, totalResults, genreMap, filteredGenreIds, setFilteredGenreIds]
  );

  useEffect(() => {
    getGenresMapFromAPI().then((genreMap) => {
      handleCurrentMovies(genreMap, 0, [], filteredGenreIds, filteredYears);
      setGenreMap(genreMap);
    });
  }, [filteredGenreIds, filteredYears, handleCurrentMovies]);

  return <MovieContext.Provider value={contextValue}>{children}</MovieContext.Provider>;
};

export const useMovieContext = () => {
  const context = React.useContext(MovieContext);
  if (!context) throw new Error("useMovieContext must be used inside MovieContext.Provider");
  return context;
};
