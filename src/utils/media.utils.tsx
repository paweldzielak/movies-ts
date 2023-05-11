import * as React from 'react'
import  { ReactElement } from "react";

type ImageURLS = {
  [key: string]: string;
};

const backdrop_sizes : ImageURLS = {
  'sm': "w300",
  'md': "w780",
  'lg': "w1280",
  'original': "original"
}

// "logo_sizes": [
//   "w45",
//   "w92",
//   "w154",
//   "w185",
//   "w300",
//   "w500",
//   "original"
// ],
// "poster_sizes": [
//   "w92",
//   "w154",
//   "w185",
//   "w342",
//   "w500",
//   "w780",
//   "original"
// ],
// "profile_sizes": [
//   "w45",
//   "w185",
//   "h632",
//   "original"
// ],
// "still_sizes": [
//   "w92",
//   "w185",
//   "w300",
//   "original"
// ]


export const getPosterFullUrl = (relativePath: string | null): string => {
  return relativePath ? `https://image.tmdb.org/t/p/w342${relativePath}` : "default-image.jpg";
};

export const getMediaFullUrls = (relativePath : string) : ImageURLS=> {
  return (Object.entries(backdrop_sizes)).reduce((result, [key, value]) => {
    result[key] = `https://image.tmdb.org/t/p/${value}${relativePath}`
    return result
  }, {...backdrop_sizes} as ImageURLS)
} 

export const getYoutubeEmbeded = (reference : string) : ReactElement | undefined => {
  const result = (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${reference}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
  return reference ? result : undefined;
}
