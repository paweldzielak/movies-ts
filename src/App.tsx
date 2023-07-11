import MovieCardList from "./components/movie-cards-list/MovieCardList";
import { MovieContextProvider } from "./context/movies.context";
import { ChakraProvider } from "@chakra-ui/react";
import { UserDataProvider } from './context/user-data.context';
import "./App.css";

const App = () => {
  return (
    <ChakraProvider>
      <UserDataProvider>
        <MovieContextProvider>
          <MovieCardList />
        </MovieContextProvider>
      </UserDataProvider>
    </ChakraProvider>
  )
};

export default App;
