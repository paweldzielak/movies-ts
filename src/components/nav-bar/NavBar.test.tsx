import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import { vi } from 'vitest';

import NavBar from './NavBar.component';

import { MovieContext, useMovieContext } from '../../context/movies.context';

const handleSearch = vi.fn()
beforeEach(() => {
  const values = useMovieContext();
  render(
    <MovieContext.Provider value={{...values,  handleSearch}}>
      <NavBar />
    </MovieContext.Provider>
  )
  screen.debug();
})

test('NavBar contains three buttons and text input', () => {
  const input = screen.getByPlaceholderText(/enter title/i);
  const buttons = screen.getAllByRole('button');

  expect(input).toBeEnabled();
  expect(buttons).toHaveLength(3);
})

// test('Changing "favorite" button text after click', async () => {
//   const btnOld = screen.getByRole('button', { name: /show favorites only/i })
//   expect(btnOld).toBeEnabled();
//   user.click(btnOld);

//   await waitFor(() => expect(screen.queryByRole('button', { name: /show favorites only/i })).not.toBeInTheDocument());

//   const btnNew = screen.getByRole('button', { name: /show all results/i });
//   expect(btnNew).toBeInTheDocument();
// })

// test('checks if function is called when the input value changes', () => {
//   const emptyInput = screen.getByPlaceholderText(/enter title/i);
//   expect(emptyInput).toBeEnabled();
//   user.type(emptyInput, 'aaa');
  
//   expect(handleSearch).toHaveBeenCalledTimes(0);

// })
