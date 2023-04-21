import React, { useMemo, useCallback } from "react";
import { createContext, useState, useEffect } from "react";
import { getGenresMapFromAPI } from "../utils/movie.utils";

export type GenresContextState = {
  currentGenreMap: Map<number, string>;
  filteredGenreIds: number[];
  changeFilteredGenreIds: (filteredGenresIds: number[]) => void;
};

const contextDefaultValues: GenresContextState = {
  currentGenreMap: new Map(),
  filteredGenreIds: [],
  changeFilteredGenreIds: () => {},
};

export const GenresContext = createContext<GenresContextState>(contextDefaultValues);

export const GenreContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [currentGenreMap, setCurrentGenreMap] = useState<Map<number, string>>();
  const [filteredGenreIds, setFilteredGenreIds] = useState<number[]>();

  const changeFilteredGenreIds = useCallback((filteredGenresIds: number[]) => {
    setFilteredGenreIds(filteredGenresIds);
  }, []);

  useEffect(() => {
    const setGenres = async () => {
      const genreMap = await getGenresMapFromAPI();
      setCurrentGenreMap(genreMap);
    };
    setGenres();
  }, []);

  const contextValue = useMemo(
    () => ({
      currentGenreMap: currentGenreMap || contextDefaultValues.currentGenreMap,
      filteredGenreIds: filteredGenreIds || contextDefaultValues.filteredGenreIds,
      changeFilteredGenreIds,
    }),
    [currentGenreMap, filteredGenreIds, changeFilteredGenreIds]
  );

  return <GenresContext.Provider value={contextValue}>{children}</GenresContext.Provider>;
};
