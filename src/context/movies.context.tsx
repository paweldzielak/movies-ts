import React, { FC, PropsWithChildren, useMemo } from "react";
import { createContext, useState, useCallback, useEffect } from "react";

import { getAllMoviesByIds, getDiscoverMovies, getGenresMapFromAPI, getSearchMovies } from "../utils/movie.utils";
import { getPosterFullUrl } from "../utils/media.utils";
import { MovieT, FilteredYearT, Genre, MovieApiT, isMovieApiT } from "../types/types";
import { useUserDataContext } from "./user-data.context";

export type MovieContextState = {
  currentMovies: MovieT[];
  setCurrentMovies: (currentMovies: MovieT[]) => void;
  handleLoadMoreMovies: () => void;
  setFilteredYears: (filteredYears: FilteredYearT[]) => void;
  filteredYears: FilteredYearT[];
  totalResults: number;
  genreMap: Map<number, string>;
  filteredGenreIds: number[];
  setFilteredGenreIds: (filteredGenresIds: number[]) => void;
  handleSwitchFavoriteList: () => void;
  isDisplayFavorites: boolean;
  handleSearch: (searchQ: string) => void;
  searchQuery: string;
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { favoritesMovies } = useUserDataContext();

  const handleSwitchFavoriteList = useCallback(() => {
    setDisplayFavorites((prevState) => !prevState);
  }, []);

  const handleSearch = useCallback((searchQ: string) => {
    setSearchQuery(searchQ);
    setCurrentPage(0);
  }, []);

  const getParsedMovies = useCallback(
    (movies: MovieApiT[], genres: Map<number, string> = genreMap) => {
      const properlyImplementedMovies = movies.filter(isMovieApiT)
      return properlyImplementedMovies.map((movie) => {
        const result: MovieT = {
          id: movie.id,
          title: movie.title,
          vote_average: Math.round(movie.vote_average * 10) / 10,
          adult: movie.adult,
          poster_path: getPosterFullUrl(movie.poster_path),
          overview: movie.overview,
          genres: movie.genre_ids?.map((id) => genres.get(id)) || movie.genres.map((g) => (g as Genre).name),
          release_date: movie.release_date,
        };
        return result;
      });
    },
    [genreMap]
  );

  const handleCurrentMovies = useCallback(
    async (
      searchQ = searchQuery,
      genres = genreMap,
      currentPage = 0,
      currentMovies: MovieT[] = [],
      filteredGenreIds: number[] = [],
      filteredYears: FilteredYearT[] = []
    ) => {
      const {
        page,
        results: movies,
        total_results,
      } = searchQ
          ? await getSearchMovies(searchQ, currentPage + 1, filteredYears)
          : await getDiscoverMovies(currentPage + 1, filteredGenreIds, 1000, filteredYears);
      const moviesToSet = getParsedMovies(movies, genres);
      setCurrentPage(page);
      setTotalResults(total_results);
      setCurrentMovies([...currentMovies, ...moviesToSet]);
    },
    [genreMap, getParsedMovies, searchQuery]
  );

  const handleLoadMoreMovies = useCallback(async () => {
    console.log("handleLoadMoreMovies");
    handleCurrentMovies(searchQuery, genreMap, currentPage, currentMovies, filteredGenreIds, filteredYears);
  }, [genreMap, currentMovies, filteredGenreIds, currentPage, filteredYears, handleCurrentMovies, searchQuery]);

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
      handleSearch,
      searchQuery
    }),
    [
      currentMovies,
      setCurrentMovies,
      handleLoadMoreMovies,
      setFilteredYears,
      filteredYears,
      totalResults,
      genreMap,
      filteredGenreIds,
      setFilteredGenreIds,
      currentFavoriteMovies,
      isDisplayFavorites,
      handleSwitchFavoriteList,
      handleSearch,
      searchQuery
    ]
  );

  useEffect(() => {
    if (genreMap.size) return;
    getGenresMapFromAPI().then((genreMap) => {
      handleCurrentMovies(searchQuery, genreMap, 0, [], filteredGenreIds, filteredYears);
      setGenreMap(genreMap);
    });
  }, [filteredGenreIds, filteredYears, handleCurrentMovies, genreMap.size, searchQuery]);

  useEffect(() => {
    getAllMoviesByIds(favoritesMovies).then((fMovies: MovieApiT[]) => {
      setCurrentFavoriteMovies(getParsedMovies(fMovies));
    });
  }, [favoritesMovies, handleCurrentMovies, getParsedMovies]);

  useEffect(() => {
    handleCurrentMovies(searchQuery, genreMap, 0, [], filteredGenreIds, filteredYears);
  }, [searchQuery, filteredGenreIds, filteredYears, handleCurrentMovies, genreMap]);

  return <MovieContext.Provider value={contextValue}>{children}</MovieContext.Provider>;
};

export const useMovieContext = () => {
  const context = React.useContext(MovieContext);
  if (!context) throw new Error("useMovieContext must be used inside MovieContext.Provider");
  return context;
};
