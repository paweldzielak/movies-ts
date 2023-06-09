import React from "react";
import { Heading } from '@chakra-ui/react'
import "./title.styles.scss";

type TitleProps = {
  title: string;
  originalTitle?: string | null
  genres: string[] | null;
  openDetails: () => void;
  releaseYear: string | number | null;
};

const Title = ({ title, genres, openDetails, releaseYear, originalTitle = null }: TitleProps) => {
  const handleClickYearClick = () => {
    console.log(`add ${releaseYear} to filters`);
  };

  return (
    <div className="title-container">
      <Heading as='h1' noOfLines={1} className="title" onClick={openDetails} title="Show more details">
        {title}
        {!(!originalTitle || originalTitle === title)
          && <span className='original-title' key={originalTitle}>{originalTitle}</span>}
      </Heading>
      <div className="genre-container">
        {!!genres && !!genres[0] && genres.map((genre) => {
          return <span key={title + genre} className="genre">{` ${genre}`}</span>;
        })}
      </div>
      {!!releaseYear && (
        <span className="year" onClick={handleClickYearClick}>
          {releaseYear}
        </span>
      )}
    </div>
  );
};

export default Title;
