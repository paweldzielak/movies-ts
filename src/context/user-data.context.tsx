import React, { createContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { userDataReducer } from "../reducers/userDataReducer";
import { BookmarkActionKind } from "../reducers/userDataReducer";

export type MovieContextState = {
  favoritesMovies: number[];
  handleBookmarked: (movieId: number) => void;
};

export const contextDefaultValues: MovieContextState = {
  favoritesMovies: [],
  handleBookmarked: () => {},
};

const UserDataContext = createContext<MovieContextState>(contextDefaultValues);

export const UserDataProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [favoritesMovies, setFavoritesMovies] = useLocalStorage("favoritesMovies", contextDefaultValues.favoritesMovies);
  const [currentFavoritesMovies, dispatch] = useReducer(userDataReducer, favoritesMovies || []);

  const handleBookmarked = (movieId: number) => {
    const type: BookmarkActionKind = favoritesMovies?.includes(movieId) ? "REMOVE_BOOKMARKED_MOVIE" : "ADD_FAVORITE_MOVIE";
    dispatch({ type, payload: movieId });
  };

  useEffect(() => {
    setFavoritesMovies(currentFavoritesMovies);
  }, [currentFavoritesMovies, setFavoritesMovies]);

  return (
    <UserDataContext.Provider
      value={{
        favoritesMovies: currentFavoritesMovies || [],
        handleBookmarked,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserDataContext = () => {
  const context = React.useContext(UserDataContext);
  if (!context) throw new Error("useUserDataContext must be used inside UserDataContext.Provider");
  return context;
};
