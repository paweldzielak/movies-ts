export type BookmarkActionKind = 'ADD_FAVORITE_MOVIE' | 'REMOVE_BOOKMARKED_MOVIE';

interface UserDataAction {
  type: BookmarkActionKind;
  payload: number;
}

export const userDataReducer = (state: number[], action: UserDataAction): number[] => {
  const { type, payload} = action;
  switch (type) {
    case "ADD_FAVORITE_MOVIE":
      return [...state, payload ]
    case "REMOVE_BOOKMARKED_MOVIE":
      return state.filter((movieId: number) => movieId !== payload);
    default:
      return state;
  }
}