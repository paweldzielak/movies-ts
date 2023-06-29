import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NavBar from './NavBar.component'

import { MoviesContextProvider } from '../../context/movies.context'

beforeAll(() => {
  render(
    <MoviesContextProvider>
      <NavBar />
    </MoviesContextProvider>
  )
  screen.debug()
  console.log('before all');

})

// test('NavBar contains tree buttons and text input', () => {
//   const i = screen.getByPlaceholderText(/enter title/i);
//   const btns = screen.getAllByRole('button');

//   expect(i).toBeEnabled();
//   expect(btns).toHaveLength(3);
// })

test('Changing "favorite" button text after click', () => {
  // const btn = screen.queryByRole('button', { name: /open filters/i })
  const btns = screen.getAllByRole('button');
  btns.forEach(btn => {
    console.log(btn.textContent)
  })
  // expect(btn).toBeEnabled();

  // expect(btn).toBeDisabled();
})