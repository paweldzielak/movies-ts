import React from "react";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { useMovieContext } from "../../context/movies.context";

import "./nav-bar.styles.scss";
import NavFilters from "./NavBarFilters.component";

const NavBar = () => {
  const { filteredYears, filteredGenreIds, handleSwitchFavoriteList, isDisplayFavorites } = useMovieContext();

  const [activeFilters, setActiveFilters] = useState(0);

  const { isOpen: isFilterOpen, onOpen: onFilterOpen, onClose: onFilterClose } = useDisclosure();

  const handleOnCloseFilters = () => {
    handleFilters();
    onFilterClose();
  };

  const handleFilters = () => {
    let activeFilters = 0;
    if (filteredYears.length) activeFilters = activeFilters + 1;
    if (filteredGenreIds.length) activeFilters = activeFilters + 1;
    setActiveFilters(activeFilters);
    if (!isFilterOpen) onFilterOpen();
  };

  return (
    <div className="navbar-container-wrapper">
      <div className="navbar-container">
        <button className="navbar-button navbar-button__favorite" onClick={handleSwitchFavoriteList}>
        {isDisplayFavorites ? "Show all results" : "Show favorites only"}
        </button>
        <button className="navbar-button navbar-button__filter" onClick={handleFilters}>
          <span>Open filters</span>
          {!!activeFilters && <span className="navbar-filter-button-counter">{activeFilters}</span>}
        </button>
      </div>
      <NavFilters handleOnCloseFilters={handleOnCloseFilters} isFilterOpen={isFilterOpen} />
    </div>
  );
};

export default NavBar;
