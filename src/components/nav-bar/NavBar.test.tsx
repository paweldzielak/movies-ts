import { vi } from 'vitest';

import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import NavBar from './NavBar.component';

import { MovieContextProvider, MovieContextState } from '../../context/movies.context';

const renderComponentWithDefaultContext = (() => {
  render(
    <MovieContextProvider >
      <NavBar />
    </MovieContextProvider>
  )
  // screen.debug();
})

test('NavBar contains three buttons and text input', () => {
  renderComponentWithDefaultContext();
  const input = screen.getByPlaceholderText(/enter title/i);
  const buttons = screen.getAllByRole('button');

  expect(input).toBeEnabled();
  expect(buttons).toHaveLength(3);
})


test('Changing "favorite" button text after click', async () => {
  renderComponentWithDefaultContext()
  const btnOld = screen.getByRole('button', { name: /show favorites only/i })
  expect(btnOld).toBeEnabled();
  user.click(btnOld);

  await waitFor(() => expect(screen.queryByRole('button', { name: /show favorites only/i })).not.toBeInTheDocument());

  const btnNew = screen.getByRole('button', { name: /show all results/i });
  expect(btnNew).toBeInTheDocument();
})

test('checks if function is called when the input value changes', async () => {

  const actual = await vi.importActual<typeof import("../../context/movies.context")>("../../context/movies.context")
  const MovieContext = actual.MovieContext;
  const handleSearch = vi.fn()

  const mockedFunctions = {
    handleSearch
  }

  const handleSearchSpy = vi.spyOn(mockedFunctions, 'handleSearch')
  const contextValue = {} as MovieContextState;

  render(
    <MovieContext.Provider value={contextValue} >
      <NavBar />
    </MovieContext.Provider>
  )

  // const handleSearchSpy = vi.spyOn(spyMethods, 'handleSearch');
  const emptyInput = screen.getByPlaceholderText(/enter title/i);
  expect(emptyInput).toBeEnabled();
  await user.type(emptyInput, 'aaa');

  // screen.debug()
  await waitFor(() => expect(handleSearchSpy).toHaveBeenCalled());

})