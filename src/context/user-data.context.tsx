import React, { createContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { userDataReducer } from "../reducers/userDataReducer";
import { MovieT } from "../types/types";
import { BookmarkActionKind } from "../reducers/userDataReducer";

export type MovieContextState = {
  favoritesMovies: MovieT[];
  handleBookmarked: (movie: MovieT) => void;
};

export const contextDefaultValues: MovieContextState = {
  favoritesMovies: [],
  handleBookmarked: () => {},
};

export const UserDataContext = createContext<MovieContextState>(contextDefaultValues);

export const UserDataProvider = ({ children }: { children: JSX.Element | JSX.Element[]; }) => {
  const [favoritesMovies, setFavoritesMovies] = useLocalStorage("favoritesMovies", contextDefaultValues.favoritesMovies);

  const [currentFavoritesMovies, dispatch] = useReducer(userDataReducer, favoritesMovies || []);

  const handleBookmarked = (movie: MovieT) => {
    const type = favoritesMovies?.includes(movie) 
    ? BookmarkActionKind.REMOVE_BOOKMARKED_RECIPE 
    : BookmarkActionKind.ADD_FAVORITE_MOVIE;
    dispatch({ type, payload: movie });
  };

  useEffect(() => {
    setFavoritesMovies(currentFavoritesMovies);
  }, [currentFavoritesMovies, setFavoritesMovies]);

  return (
    <UserDataContext.Provider 
      value={{ 
        favoritesMovies: currentFavoritesMovies || [],
        handleBookmarked: handleBookmarked 
      }}
    >
      {children}
    </UserDataContext.Provider>);
};
