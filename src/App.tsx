import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  ModalBody,
} from "@chakra-ui/react";

import { useMovieContext } from "./context/movies.context";

import { MovieDetailsT } from "./types/types";
import NavBar from "./components/nav-bar/NavBar.component";
import MovieCard from "./components/movie-card/MovieCard.component";
import MovieDetails from "./components/movie-details/MovieDetails.component";

import "./App.css";

const App = () => {
  const { currentMovies, handleLoadMoreMovies, totalResults, isDisplayFavorites } = useMovieContext();
  const isMoreLoadAvailable = currentMovies.length && currentMovies.length !== totalResults;

  const [modalChildren, setModalChildren] = useState<React.JSX.Element | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getDetailsChildren = (rawDetails: MovieDetailsT) => {
    return <MovieDetails details={rawDetails} openModal={handleModalOpen} />;
  };

  const handleModalOpen = (modalDetails: MovieDetailsT) => {
    setModalChildren(getDetailsChildren(modalDetails));
    if (!isOpen) onOpen();
  }

  return (
    <>
      <NavBar />
      <div className="movies-card-container">
        {currentMovies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} openModal={handleModalOpen} />;
        })}
      </div>
      {!!isMoreLoadAvailable && !isDisplayFavorites && <Button borderRadius='5px' bgColor='#3c80fc' border='none'
        variant='outline' color='whitesmoke' mt='8px' mb="8px" transform='translate(-50%, -50%)'
        left='50%' fontSize='2rem' padding='2rem 3rem'
        _hover={{
          background: "#2c64fc",
          border: '1px solid #2c64fc',
          color: "white",
        }} onClick={handleLoadMoreMovies}>Load more</Button>}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={"80%"} bg="var(--color-blue-darker)">
          <ModalHeader bg="var(--color-blue-darker)" borderTopRadius="0.5rem">
            <ModalCloseButton
              bg="lightgray"
              w="24px"
              h="24px"
              fontSize="10px"
              _hover={{
                background: "white",
              }}
            />
          </ModalHeader>
          <ModalBody bg="var(--color-blue-darker)">{modalChildren}</ModalBody>
          <ModalFooter>{"modal footer txt"}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default App;
