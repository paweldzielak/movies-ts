export type Genre = {
  id: number
  name: string;
}

export type FilteredYearT = {
    "label": string;
    "value": number;
}

export interface MovieT {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  genre_ids?: (number)[] | null;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

