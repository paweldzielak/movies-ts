import React, { FC, PropsWithChildren, useMemo } from "react";
import { createContext, useState, useCallback, useEffect } from "react";

import { getAllMoviesByIds, getDiscoverMovies, getGenresMapFromAPI } from "../utils/movie.utils";
import { getPosterFullUrl } from "../utils/media.utils";
import { MovieT, FilteredYearT, Genre } from "../types/types";
import { useUserDataContext } from "./user-data.context";

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
  handleSwitchFavoriteList: () => void;
  isDisplayFavorites: boolean;
};

const MovieContext = createContext({} as MovieContextState);

export const MoviesContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentMovies, setCurrentMovies] = useState<MovieT[]>([]);
  const [currentFavoriteMovies, setCurrentFavoriteMovies] = useState<MovieT[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [filteredYears, setFilteredYears] = useState<FilteredYearT[]>([]);
  const [filteredGenreIds, setFilteredGenreIds] = useState<number[]>([]);
  const [genreMap, setGenreMap] = useState<Map<number, string>>(new Map());
  const [isDisplayFavorites, setDisplayFavorites] = useState<boolean>(false);
  const {favoritesMovies} = useUserDataContext();

  const handleSwitchFavoriteList = () => {
    setDisplayFavorites(prevState => !prevState);
  }

  const getParsedMovies = useCallback((movies: MovieT[], genres: Map<number, string> = genreMap) => {
    return movies.map((movie) => {
      const result = {
        id: movie.id,
        title: movie.title,
        vote_average: Math.round(movie.vote_average * 10) / 10,
        adult: movie.adult,
        poster_path: getPosterFullUrl(movie.poster_path),
        overview: movie.overview,
        genres: movie.genre_ids?.map((id) => genres.get(id)) || movie.genres.map((g) => (g as Genre).name),
        release_date: movie.release_date,
      };
      return result as MovieT;
    })
  } , [genreMap]
)

  const handleCurrentMovies = useCallback(
    async (genres = genreMap, currentPage = 0, currentMovies: MovieT[] = [], filteredGenreIds: number[] = [], filteredYears: FilteredYearT[] = []) => {
      console.log('*handleCurrentMovies*');
      const { page, results: movies, total_results } = await getDiscoverMovies(currentPage + 1, filteredGenreIds, 1000, filteredYears);
      const moviesToSet = getParsedMovies(movies, genres);
      setCurrentPage(page);
      setTotalResults(total_results);
      setCurrentMovies([...currentMovies, ...moviesToSet]);
    }, [genreMap, getParsedMovies]
  );

  const handleLoadMoreMovies = useCallback(() => {
    handleCurrentMovies(genreMap, currentPage, currentMovies, filteredGenreIds, filteredYears);
  }, [genreMap, currentMovies, filteredGenreIds, currentPage, filteredYears, handleCurrentMovies]);

  const contextValue = useMemo(
    () => ({
      currentMovies: isDisplayFavorites ? currentFavoriteMovies : currentMovies,
      setCurrentMovies,
      handleLoadMoreMovies,
      setFilteredYears,
      filteredYears,
      totalResults,
      genreMap,
      filteredGenreIds,
      setFilteredGenreIds,
      handleSwitchFavoriteList,
      isDisplayFavorites,
    }),
    [currentMovies, setCurrentMovies, handleLoadMoreMovies, setFilteredYears, filteredYears, totalResults, 
      genreMap, filteredGenreIds, setFilteredGenreIds, currentFavoriteMovies, isDisplayFavorites]
  );

  useEffect(() => {
    console.log('*movieContext useEffect 1*');
    
    getGenresMapFromAPI().then((genreMap) => {
      handleCurrentMovies(genreMap, 0, [], filteredGenreIds, filteredYears);
      setGenreMap(genreMap);
    });
  }, [filteredGenreIds, filteredYears, handleCurrentMovies]);

  useEffect(() => {
    console.log('*movieContext useEffect 2*');
    getAllMoviesByIds(favoritesMovies).then((fMovies : MovieT[]) => {
      setCurrentFavoriteMovies(getParsedMovies(fMovies) ); 
    })
  }, [favoritesMovies, handleCurrentMovies, getParsedMovies])

  return <MovieContext.Provider value={contextValue}>{children}</MovieContext.Provider>;
};

export const useMovieContext = () => {
  const context = React.useContext(MovieContext);
  if (!context) throw new Error("useMovieContext must be used inside MovieContext.Provider");
  return context;
};
