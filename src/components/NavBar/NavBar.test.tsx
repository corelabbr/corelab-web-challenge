import React from 'react'
import { render, screen } from '@testing-library/react'
import NavBar from './index'

test('render navbar component properly', () => {
  

  render(<NavBar />)


  const logo = screen.getByRole('img')
  expect(logo).toBeInTheDocument()
  expect(logo).toHaveAttribute('alt', 'Core Notes Logotipo')
  expect(logo).toHaveAttribute('src', 'core-notes-logo.svg')

  const title = screen.getByRole('heading')
  expect(title).toBeInTheDocument()
  expect(title).toHaveTextContent('Core Notes')


  const search = screen.getByPlaceholderText(/Pesquisar notas/i)
  expect(search).toBeInTheDocument()

  const filterButton = screen.getByRole('button')
  expect(filterButton).toBeInTheDocument()


})