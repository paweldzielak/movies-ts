import { MovieT } from "../types/types";

export enum BookmarkActionKind {
  ADD_FAVORITE_MOVIE = 'ADD_FAVORITE_MOVIE',
  REMOVE_BOOKMARKED_RECIPE = 'REMOVE_BOOKMARKED_RECIPE',
}

interface UserDataAction {
  type: BookmarkActionKind;
  payload: MovieT;
}

export const userDataReducer = (state: MovieT[], action: UserDataAction): MovieT[] => {
  const { type, payload} = action;
  switch (type) {
    case BookmarkActionKind.ADD_FAVORITE_MOVIE:
      return [...state, payload ]
    case BookmarkActionKind.REMOVE_BOOKMARKED_RECIPE:
      return state.filter((movie:MovieT) => movie.id !== payload.id);
    default:
      return state;
  }
}