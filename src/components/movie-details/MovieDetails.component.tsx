import React, { useEffect, useState } from "react";
import { getMediaFullUrls, getYoutubeEmbeded } from "../../utils/media.utils";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "./movieDetails.styles.scss";
import { useBreakpoint } from "@chakra-ui/react";
import { getMovieRecommendations } from "../../utils/movie.utils";
import MovieRecommendations from "./MovieRecommendations";
import { MovieDetailsT, Recommendation } from "../../types/types";

const MovieDetails: React.FC<{ details: MovieDetailsT }> = ({ details }) => {
  const { images, videos } = details;
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const getTitles = () => {
    if (details.original_title === details.title) {
      return <span>{details.title}</span>;
    }
    return (
      <>
        <span>{details.title}</span>
        <span>{details.original_title}</span>
      </>
    );
  };

  useEffect(() => {
    getMovieRecommendations(details.id).then((r: Recommendation[]) => setRecommendations(r));
  }, []);

  // videos.results.forEach((video) => {
  //   console.log(video);
  // });

  const imageSize = "md"; // change when other items are present
  const breakpoint = useBreakpoint({ ssr: false });
  console.log("🚀 ~ file: MovieDetails.component.jsx:15 ~ MovieDetails ~ breakpoint:", breakpoint);

  const imagePaths = images.backdrops.map(({ file_path }) => getMediaFullUrls(file_path)[imageSize]);

  return (
    <div className="media-details">
      <div className="media-details__container">
        <div className="media-details__title">{getTitles()}</div>
        <div className="media-details__overview">{details.overview}</div>
        {!!videos.results && <div className="media-details__videos">{getYoutubeEmbeded(videos.results[0].key)}</div>}
      </div>
      <Carousel
        className={`media-details__img-carousel img-${imageSize}`}
        autoPlay
        infiniteLoop
        interval={5000}
        // showArrows={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        stopOnHover={true}
        swipeable={false}
        transitionTime={1000}
      >
        {imagePaths.map((path) => {
          return <img src={path} alt="" key={path.split("/")[-1]} />;
        })}
      </Carousel>
      <MovieRecommendations recommendations={recommendations} />
    </div>
  );
};

export default MovieDetails;
