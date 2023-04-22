import React, { FC, PropsWithChildren } from "react";
import { createContext, useState, useEffect } from "react";
import { getGenresMapFromAPI } from "../utils/movie.utils";

type GenresContextState = {
  currentGenreMap: Map<number, string>;
  filteredGenreIds: number[];
  setFilteredGenreIds: (filteredGenresIds: number[]) => void;
};

const GenresContext = createContext({} as GenresContextState);

export const GenreContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentGenreMap, setCurrentGenreMap] = useState<Map<number, string>>(new Map());
  const [filteredGenreIds, setFilteredGenreIds] = useState<number[]>([]);

  useEffect(() => {
    getGenresMapFromAPI().then((genreMap) => setCurrentGenreMap(genreMap));
  }, []);

  return <GenresContext.Provider value={{ currentGenreMap, filteredGenreIds, setFilteredGenreIds }}>{children}</GenresContext.Provider>;
};

export const useGenreContext = () => {
  const context = React.useContext(GenresContext);

  if (!context) throw new Error("useGenreContextProvider must be used inside GenresContext.Provider");

  return context;
};
