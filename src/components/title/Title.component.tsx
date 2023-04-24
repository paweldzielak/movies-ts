import React from "react";
import "./title.styles.scss";

type TitleProps = {
  title: string;
  genres: string[];
  openDetails: () => void;
  releaseYear: string | number;
};

const Title = ({ title, genres, openDetails, releaseYear }: TitleProps) => {
  const handleClickYearClick = () => {
    console.log(`add ${releaseYear} to filters`);
  };

  return (
    <div className="title-container">
      <h2 className="title" onClick={openDetails} title="Show more details">
        {title}
      </h2>
      <div className="genre-container">
        {genres.map((genre) => (
          <span key={title + genre} className="genre">{` ${genre}`}</span>
        ))}
      </div>
      <span className="year" onClick={handleClickYearClick}>
        {releaseYear}
      </span>
    </div>
  );
};

export default Title;
