import React, { useEffect, useState } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { Divider } from "@chakra-ui/react";
import { getMovieRecommendations } from "../../utils/movie.utils";
import { getMediaFullUrls, getYoutubeEmbeded } from "../../utils/media.utils";
import { Genre, GenresEntity, MovieDetailsT, RecommendationT } from "../../types/types";
import Recommendation from "./MovieRecommendation.component";
import NumberDetails from "./NumberDetails.component";
import Title from "../title/Title.component";

import "./movieDetails.styles.scss";

type MovieDetailsProps = {
  details: MovieDetailsT
  openModal: (modalDetails: MovieDetailsT) => void;
};

const MovieDetails: React.FC<MovieDetailsProps> = ({ details, openModal }) => {
  const { images, videos } = details;
  const [recommendations, setRecommendations] = useState<RecommendationT[]>([]);

  const getOverviewFontSize = (overview: string) => {
    const len = overview.split(" ").length;
    if (len > 45) return 'sm';
    if (len > 30) return 'md';
    return 'lg';
  }

  useEffect(() => {
    getMovieRecommendations(details.id).then((r: RecommendationT[]) => setRecommendations(r));
  }, [details.id]);

  const getGenreForTitle = (genres : GenresEntity[] | null | undefined) => {
    if (!genres) return null
    return genres.map((g) => (g as Genre).name)
  }

  const imageSize = "md"; // change when other items are present
  // const breakpoint = useBreakpoint({ ssr: false });

  const imagePaths = images.backdrops.map(({ file_path }) => getMediaFullUrls(file_path)[imageSize]);

  return (
    <div className="media-details">
      <div className="media-details__container">
        {/* <div className="media-details__title">{getTitles()}</div> */}
        <Title title={details.title} originalTitle={details.original_title} genres={getGenreForTitle(details.genres)} openDetails={() => {}} releaseYear={details.release_date}></Title>
        <Carousel
          className={`media-details__img-carousel img-${imageSize}`}
          autoPlay
          infiniteLoop
          interval={5000}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          stopOnHover={true}
          swipeable={false}
          transitionTime={1000}
        >
          {imagePaths.map((path) => <img src={path} alt="" key={path.split("/").pop()} />)}
        </Carousel>
        <div className={"media-details__overview " + getOverviewFontSize(details.overview)}>{details.overview}</div>
        <NumberDetails details={details} />
        {!!videos?.results?.length && <div className="media-details__videos">{getYoutubeEmbeded(videos.results[0].key)}</div>}
      </div>
      <div className="media-details__recommendations">
        <div className="media-details__recommendations-title">
          <Divider borderColor='var(--color-golden-brown)' margin='auto 1vw' />
          <span className="details-text">Recommendations</span>
          <Divider borderColor='var(--color-golden-brown)' margin='auto 1vw' />
        </div>
        {recommendations.map((r: RecommendationT) => {
          return <Recommendation key={`r-${r.id}`} recommendation={r} openModal={openModal}></Recommendation>;
        })}
      </div>
    </div>
  );
};

export default MovieDetails;
