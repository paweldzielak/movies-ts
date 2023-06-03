import React from "react";
import "./title.styles.scss";

type TitleProps = {
  title: string;
  genres: string[];
  openDetails: () => void;
  releaseYear: string | number | null;
};

const Title = ({ title, genres, openDetails, releaseYear }: TitleProps) => {
  const handleClickYearClick = () => {
    console.log(`add ${releaseYear} to filters`);
  };

  // TODO add original title like in MovieDetails.component

  return (
    <div className="title-container">
      <h2 className="title" onClick={openDetails} title="Show more details">
        {title}
      </h2>
      <div className="genre-container">
        {!!genres[0] && genres.map((genre) => {
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
