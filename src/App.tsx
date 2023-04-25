import React, { useContext, useState } from "react";

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

import { UserDataProvider } from "./context/user-data.context";
import { MovieContext } from "./context/movies.context";

import NavBar from "./components/nav-bar/NavBar.component";
import MovieCard from "./components/movie-card/MovieCard.component";

import "./App.css";

const App = () => {
  const { currentMovies, handleLoadMoreMovies, totalResults } = useContext(MovieContext);
  const isMoreLoadAvailable = currentMovies.length && currentMovies.length !== totalResults;

  const [modalChildren, setModalChildren] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <NavBar />
      <UserDataProvider>
        <div className='movies-card-container' style={{ marginBottom: '30px' }}>
          {currentMovies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie}
              openModal={onOpen} setModalChildren={setModalChildren} />
          })}
        </div>
      </UserDataProvider>
      {/* {isMoreLoadAvailable ? <Button borderRadius='5px' bgColor='#3c80fc' border='none'
        variant='outline' color='whitesmoke' mt='8px' mb="8px" transform='translate(-50%, -50%)'
        left='50%' fontSize='2rem' padding='2rem 3rem'
        _hover={{
          background: "#2c64fc",
          border: '1px solid #2c64fc',
          color: "white",
        }} onClick={() => handleLoadMoreMovies()}>Load more</Button> : null} */}
     <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={'80%'} bg="#1a202c">
          <ModalHeader bg="#1a202c" borderTopRadius={'2rem'}>
            <ModalCloseButton bg="lightgray" w="24px" h="24px" fontSize='10px' _hover={{
              background: "white",
            }} />
          </ModalHeader>
          <ModalBody bg="#1a202c">
            {modalChildren}
          </ModalBody>
          <ModalFooter>
            {'modal footer txt'}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default App;
