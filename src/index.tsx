import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MoviesContextProvider } from "./context/movies.context";
import { ChakraProvider } from "@chakra-ui/react";
import { UserDataProvider } from './context/user-data.context';

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
root.render(
  <React.StrictMode>
    <ChakraProvider>
    <UserDataProvider>
      <MoviesContextProvider>
        <App />
      </MoviesContextProvider>
    </UserDataProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
