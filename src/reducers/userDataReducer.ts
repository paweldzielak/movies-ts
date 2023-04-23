import { MovieT } from "../types/types";

export type BookmarkActionKind = 'ADD_FAVORITE_MOVIE' | 'REMOVE_BOOKMARKED_MOVIE';

interface UserDataAction {
  type: BookmarkActionKind;
  payload: MovieT;
}

export const userDataReducer = (state: MovieT[], action: UserDataAction): MovieT[] => {
  const { type, payload} = action;
  switch (type) {
    case "ADD_FAVORITE_MOVIE":
      return [...state, payload ]
    case "REMOVE_BOOKMARKED_MOVIE":
      return state.filter((movie:MovieT) => movie.id !== payload.id);
    default:
      return state;
  }
}