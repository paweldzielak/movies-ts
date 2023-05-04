import React, { useMemo } from "react";
import Select from "react-select";
import { Drawer, DrawerFooter, DrawerContent, DrawerOverlay, DrawerHeader, DrawerBody, Button, DrawerCloseButton } from "@chakra-ui/react";

import "./nav-bar-filters.styles.scss";
import { range } from "../../utils/general.utils";
import { FilteredYearT, Genre } from "../../types/types";
import { useMovieContext } from "../../context/movies.context";

interface NavFiltersProps {
  isFilterOpen: boolean;
  handleOnCloseFilters: () => void;
}

const getDefaultYearOptions = () => {
  const years = range(new Date().getFullYear(), 1930, -1);
  return years.map((value) => ({ value: value, label: value.toString() }));
};

const NavFilters: React.FC<NavFiltersProps> = ({ isFilterOpen, handleOnCloseFilters }) => {
  const { filteredYears, setFilteredYears, genreMap, setFilteredGenreIds, filteredGenreIds } = useMovieContext();
  const [yearOptions, setYearOptions] = React.useState<FilteredYearT[]>(getDefaultYearOptions);

  const handleYearChange = (selectedList: FilteredYearT[]) => {
    if (selectedList.length === 0) setYearOptions(getDefaultYearOptions());
    else if (selectedList.length === 1) selectedList[0].label = `exact ${selectedList[0].value}`;
    else if (selectedList.length === 2) {
      const years = [selectedList[0].value, selectedList[1].value].sort();
      selectedList[0] = { label: `from ${years[0]}`, value: years[0] };
      selectedList[1] = { label: `to ${years[1]}`, value: years[1] };
    }
    if (selectedList.length > 1) setYearOptions([]);
    else setYearOptions(getDefaultYearOptions());

    setFilteredYears(selectedList);
  };

  const handleGenreChange = (selectedGenreList: Genre[]) => {
    const filteredGenreIds = selectedGenreList.map((genre) => genre.id);
    setFilteredGenreIds(filteredGenreIds);
  };

  const genreOptions = useMemo(() => {
    return Array.from(genreMap, ([id, name]) => ({ id, name }));
  }, [genreMap]);

  const filteredGenres = useMemo(() => {
    return genreOptions.filter((g) => filteredGenreIds.includes(g.id));
  }, [filteredGenreIds, genreOptions]);

  return (
    <Drawer placement="right" onClose={handleOnCloseFilters} isOpen={isFilterOpen} size="xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton w="2.4rem" h="2.4rem" fontSize="1.2rem" />
        <DrawerHeader borderBottomWidth="1px" fontSize={"1.6rem"}>
          Filters
        </DrawerHeader>
        <DrawerBody>
          <div className="nav-bar-filters-container">
            {!!genreOptions.length && (
              <>
                <h2 className="multiselect-label">Choose genres</h2>
                <Select
                  placeholder={<div>Type to search genre</div>}
                  isMulti
                  isClearable
                  isSearchable
                  value={filteredGenres}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  onChange={handleGenreChange}
                  getOptionLabel={(genre) => genre.name}
                  getOptionValue={(genre) => genre.id.toString()}
                  options={genreOptions}
                />
              </>
            )}
            {!!yearOptions && (
              <>
                <h2 className="multiselect-label">Choose year or years range</h2>
                <Select
                  placeholder={<div>Type to search year</div>}
                  isMulti
                  isClearable
                  isSearchable
                  value={filteredYears}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  onChange={handleYearChange}
                  name="label"
                  options={yearOptions}
                />
              </>
            )}
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button
            onClick={() => {
              setFilteredYears([]);
              setYearOptions(getDefaultYearOptions());
              setFilteredGenreIds([]);
            }}
          >
            Clear all filters
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NavFilters;
