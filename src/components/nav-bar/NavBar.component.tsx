import React, { useContext } from "react";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { useGenreContext } from "../../context/genres.context";
import { MovieContext } from "../../context/movies.context";

import "./nav-bar.styles.scss";
import NavFilters from "./NavBarFilters.component";

const NavBar = () => {
  const { filteredYears } = useContext(MovieContext);
  const { filteredGenreIds } = useGenreContext();

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
        <button className="navbar-filters-button" onClick={handleFilters}>
          <span>Open filters</span>
          {!!activeFilters && <span className="navbar-filter-button-counter">{activeFilters}</span>}
        </button>
        <NavFilters handleOnCloseFilters={handleOnCloseFilters} isFilterOpen={isFilterOpen} />
      </div>
    </div>
  );
};

export default NavBar;
