import React, { useState } from "react";
// import { Link } from "react-router-dom";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  // ModalFooter,
  ModalCloseButton,
  useDisclosure,
  ModalBody,
  useBreakpoint,
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
  const { isOpen, onOpen, onClose, } = useDisclosure();

  const getDetailsChildren = (rawDetails: MovieDetailsT) => {
    window.scrollTo({ top: 0, behavior: "smooth" }) // TODO make it work
    return <MovieDetails details={rawDetails} openModal={handleModalOpen} />;
  };

  const handleModalOpen = (movieDetails: MovieDetailsT) => {
    setModalChildren(getDetailsChildren(movieDetails));
    onOpen();
    // TODO add /details/id to URL
  }

  const handleModalClose = () => {
    onClose();
    // TODO remove /details/id from URL
  } 

  const breakpoint = useBreakpoint({ ssr: false });

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
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent minW={breakpoint === "2xl" ? '90vw' : '98vw'} bg="var(--color-blue-darker)">
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
          {/* <ModalFooter>{"modal footer txt"}</ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default App;
