import axios from "axios"
import { range } from "./general.utils"
import { FilteredYearT, Genre, MovieT } from "../types/types"

const getMoviesByUrl = async (url: string) => {
  // console.log('*getMoviesByUrl*');
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    console.error(`Error: ${error}`)
    return {}
  }
}

export const getMoviesHighestRated = async (page: string) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&page=${page}`
  return await getMoviesByUrl(url);
}

export const getGenresMapFromAPI = async () => {
  const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + process.env.REACT_APP_MOVIE_DB_API_KEY
  const genreMap = new Map();
  try {
    // console.log('*getGenresMapFromAPI*');
    const result = await axios.get(url);
    result.data.genres.forEach((genre: Genre) => {
      genreMap.set(genre.id, genre.name)
    });
    return genreMap
  } catch (error) {
    console.error(`Error: ${error}`)
    return genreMap
  }
}

const getYearUrlQueryString = (filteredYears: FilteredYearT[]) => {
  let yearAdditionalString = "";
  if (filteredYears?.length) {
    if (filteredYears.length === 1) yearAdditionalString = '&primary_release_year=' + filteredYears[0].value
    if (filteredYears.length === 2) {
      const years = [filteredYears[0].value, filteredYears[1].value].sort()
      yearAdditionalString = `&primary_release_date.gte=${years[0]}-01-01&primary_release_date.lte=${years[1]}-12-31`
    }
  }
  return yearAdditionalString
}

export const getDiscoverMovies = async (page: string | number, filteredGenreIds: number[], voteMin = 1000, filteredYears: FilteredYearT[] = []) => {
  const yearAdditionalString = getYearUrlQueryString(filteredYears);
  let genreAdditionalPath = "";
  if (filteredGenreIds?.length) {
    genreAdditionalPath = `&with_genres=${filteredGenreIds.join(',')}`
  }
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&sort_by=vote_average.desc&vote_count.gte=${voteMin}&page=${page}${yearAdditionalString}${genreAdditionalPath}`
  return await getMoviesByUrl(url);
}

export const getSearchMovies = async (query: string, page: string | number, filteredGenreIds: number[], filteredYears: FilteredYearT[] = []) => {
  const yearAdditionalString = getYearUrlQueryString(filteredYears);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&page=${page}${yearAdditionalString}${yearAdditionalString}&query=${query}`
  // TODO maybe manually filter genres due to lack of API relevant query parameter
  return await getMoviesByUrl(url);
}

export const getMovieMoreDetails = async (apiInternalMovieId: number, includeVideos = true, includeImages = true) => {
  const includeParamStr = `${includeImages ? 'images,' : ''}${includeVideos ? 'videos' : ''} `;
  const url = `https://api.themoviedb.org/3/movie/${apiInternalMovieId}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&append_to_response=${includeParamStr}`;
  const details = await getMoviesByUrl(url);
  return details
}

type RsortByT = 'popularity' | 'vote_average' | 'vote_count';

export const getMovieRecommendations = async (apiInternalMovieId: number, sortBy: RsortByT = 'popularity', page = 1, all = true) => {
  const urlPageTemplate = `https://api.themoviedb.org/3/movie/${apiInternalMovieId}/recommendations?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&page=`
  const recommendations = await getMoviesByUrl(`${urlPageTemplate}${page}`);

  const results = recommendations.results as MovieT[];

  if (all && page < recommendations.total_pages) {
    const promises = range(page + 1, recommendations.total_pages, 1).map(currentPage => {
      return getMoviesByUrl(`${urlPageTemplate}${currentPage}`)
    });
    const pages = await Promise.all(promises);
    pages.forEach(singlePage => results.push(...singlePage.results));
  }
  const sorted = results.sort((first, second) => second[sortBy] - first[sortBy]);
  const reduced = sorted.reduce((previousMovies: MovieT[], currentMovie: MovieT) => {
    if (previousMovies.some((movie : MovieT) => movie.id === currentMovie.id)) return previousMovies;
    previousMovies.push(currentMovie);
    return previousMovies;
  }, [] as MovieT[])

  return reduced
}

export const getAllMoviesByIds = async (ids: number[]) : Promise<MovieT[]> => {
  const movieList = await Promise.all(ids.map(id => getMovieMoreDetails(id, false, false)));
  return movieList
}