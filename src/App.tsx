import MovieCardList from "./components/movie-cards-list/MovieCardList";
import { MoviesContextProvider } from "./context/movies.context";
import { ChakraProvider } from "@chakra-ui/react";
import { UserDataProvider } from './context/user-data.context';
import "./App.css";

const App = () => {
  return (
    <ChakraProvider>
      <UserDataProvider>
        <MoviesContextProvider>
          <MovieCardList />
        </MoviesContextProvider>
      </UserDataProvider>
    </ChakraProvider>
  )
};

export default App;
