import React from 'react'
import { render, screen } from '@testing-library/react'
import ColorsModal from './index'
import { Colors } from '../../types/Colors'
test('render colors modal component properly', () => {
  
  const setModalOpen = jest.fn()
  const handleClose = jest.fn()
  render(<ColorsModal  handleColor={handleClose} setModalOpen={setModalOpen}/>)

  const buttons = screen.getAllByRole('button')
  const values = Object.values(Colors)
  expect(buttons).toHaveLength(values.length)

  values.forEach((color) => {
    const button = buttons[values.indexOf(color)]

    expect(button).toBeInTheDocument()

    button.click()
    expect(handleClose).toHaveBeenCalledWith(color)
    expect(setModalOpen).toHaveBeenCalledWith(false)
  })
 

})