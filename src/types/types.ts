export type Genre = {
  id: number
  name: string;
}

export type FilteredYearT = {
    "label": string;
    "value": number;
}

export type MovieT = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids?: (number)[] | null;
  genres: string[] | Genre[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type RecommendationT = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids?: (number)[] | null;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


export type MovieDetailsT = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres?: (GenresEntity)[] | null;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: (ProductionCompaniesEntity)[] | null;
  production_countries?: (ProductionCountriesEntity)[] | null;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages?: (SpokenLanguagesEntity)[] | null;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  images: MovieImages;
  videos: MovieYTVideos;
}
export type BelongsToCollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}
export type GenresEntity = {
  id: number;
  name: string;
}
export type ProductionCompaniesEntity = {
  id: number;
  logo_path?: string | null;
  name: string;
  origin_country: string;
}
export type ProductionCountriesEntity = {
  iso_3166_1: string;
  name: string;
}
export type SpokenLanguagesEntity = {
  english_name: string;
  iso_639_1: string;
  name: string;
}
export type MovieImages = {
  backdrops: (BackdropsEntityOrPostersEntity)[];
  logos: (LogosEntity)[];
  posters: (BackdropsEntityOrPostersEntity)[];
}
export type BackdropsEntityOrPostersEntity = {
  aspect_ratio: number;
  height: number;
  iso_639_1?: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
export type LogosEntity = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
export type MovieYTVideos = {
  results?: (VideoResultsEntity)[] | null;
}
export type VideoResultsEntity = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
