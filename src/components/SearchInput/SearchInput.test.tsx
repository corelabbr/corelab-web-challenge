import React from 'react'
import { render, screen } from '@testing-library/react'
import SearchInput from './index'

test('render search input component properly', () => {
  
  const handleChange = jest.fn()
  render(<SearchInput handleChange={handleChange} value='' />)

  const search = screen.getByPlaceholderText(/Pesquisar notas/i)
  expect(search).toBeInTheDocument()
  expect(search).toHaveValue('')

})