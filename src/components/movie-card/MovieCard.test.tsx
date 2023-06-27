import { render } from "@testing-library/react"
import MovieCard from "./MovieCard.component"
import React from "react"

const movie = {
  "id": 238,
  "title": "The Godfather",
  "vote_average": 8.7,
  "adult": false,
  "poster_path": "https://image.tmdb.org/t/p/w342/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
  "genres": [
    null,
    null
  ],
  "release_date": "1972-03-14"
}


describe("<MovieCard />", () => {
  test("renders correct content", () => {
    const openModal = jest.fn()
    render(<MovieCard movie={movie} openModal={openModal} />)
  })
})