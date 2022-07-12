import React from 'react';
import { render, screen } from '@testing-library/react';
import VehiclesPage from './index';
import {BrowserRouter, MemoryRouter, Router, Routes} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import App from '../../App'

// test utils file
const renderWithRouter = (ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return {
    user: userEvent,
    ...render(ui, { wrapper: BrowserRouter }),
  }
}

test('render and functionaly vehicle filter and rendered all fields check', () => {
  const {user} = renderWithRouter(<App />)

  const buttonElement = screen.getByTestId(/filter-vehicles/i);
  expect(buttonElement).toBeInTheDocument();

  user.click(buttonElement)

  expect(screen.getByText(/brand/i)).toBeInTheDocument()
  expect(screen.getByText(/color/i)).toBeInTheDocument()
  expect(screen.getByText(/year/i)).toBeInTheDocument()
  expect(screen.getByText(/min price/i)).toBeInTheDocument()
  expect(screen.getByText(/max price/i)).toBeInTheDocument()
});


