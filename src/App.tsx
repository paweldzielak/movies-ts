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

import "./App.css";

const App = () => {
  const { currentMovies, handleLoadMoreMovies, totalResults } = useContext(MovieContext);
  const isMoreLoadAvailable = currentMovies.length && currentMovies.length !== totalResults;

  const [modalChildren, setModalChildren] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <NavBar />
    </>
  );
};

export default App;
