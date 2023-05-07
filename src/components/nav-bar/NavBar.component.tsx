import React from "react";
import { useState } from "react";
import { Input, InputGroup, InputLeftElement, useDisclosure } from "@chakra-ui/react";

import { useMovieContext } from "../../context/movies.context";
import NavFilters from "./NavBarFilters.component";

import "./nav-bar.styles.scss";

const NavBar = () => {
  const { filteredYears, filteredGenreIds, handleSwitchFavoriteList, isDisplayFavorites, handleSearch } = useMovieContext();

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
        <InputGroup size="lg" w="">
          <InputLeftElement
            h="50px"
            w="50px"
            m={"0 0.6rem"}
            pointerEvents="none"
            children={<img src="search-icon.svg" className="navbar-search-icon" alt="magnifier-icon" />}
          />
          <Input
            placeholder="Enter title"
            height="50px"
            color="purple.50"
            fontSize="1.6rem"
            textAlign="center"
            _placeholder={{ color: "gray.300", m: "auto" }}
            _focus={{ _placeholder: { color: "transparent" } }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>
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
