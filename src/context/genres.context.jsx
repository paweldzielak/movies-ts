import { useMemo, useCallback } from "react";
import { createContext, useState, useEffect } from "react";
import { getGenresMapFromAPI } from "../utils/movie.utils";

export const GenresContext = createContext({
  currentGenreMap: null,
  filteredGenreIds: "",
  changeFilteredGenreIds: () => {}
});

export const GenreContextProvider = ({ children }) => {
  const [currentGenreMap, setCurrentGenreMap] = useState(null);
  const [filteredGenreIds, setFilteredGenreIds] = useState([]);

  const changeFilteredGenreIds = useCallback((filteredGenres) => {
    setFilteredGenreIds(filteredGenres);
  }, []);

  useEffect(() => {
    const setGenres = async () => {
      const genreMap = await getGenresMapFromAPI();
      setCurrentGenreMap(genreMap);
    };
    setGenres();
  }, []);

  const contextValue =  useMemo(() => ({
    currentGenreMap,
    filteredGenreIds,
    changeFilteredGenreIds,
  }), [currentGenreMap, filteredGenreIds, changeFilteredGenreIds])

  return (
    <GenresContext.Provider value={contextValue}>{children}</GenresContext.Provider>
  );
};
