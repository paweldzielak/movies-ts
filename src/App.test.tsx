import { describe, expect, test } from 'vitest'
import App from './App';
import { render, screen } from '@testing-library/react';


describe("AAA", () => {
  test("BBB", () => {
    render(<App />)
    expect(screen.getByRole("heading", { name: "Vite + React" }))
  })
})