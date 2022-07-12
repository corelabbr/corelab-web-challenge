import React from 'react';
import { render, screen } from '@testing-library/react';
import VehiclesPage from './index';
import {BrowserRouter, MemoryRouter, Router, Routes, useLocation} from 'react-router-dom'
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

test('renders learn react link', () => {
  renderWithRouter(<App />)
  const searchElement = screen.getByPlaceholderText(/search/i);
  const buttonElement = screen.getByText(/add new vehicle/i);
  expect(searchElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test('render and functionaly add new vehicle', () => {

  const {user} = renderWithRouter(<App />)

  const buttonElement = screen.getByTestId(/add-new-vehicle/i);
  expect(buttonElement).toBeInTheDocument();

  user.click(buttonElement)

  expect(screen.getByTestId('location-display')).toHaveTextContent('/add-vehicle')
});

test('render and functionaly vehicle filter', () => {

  const {user} = renderWithRouter(<App />)

  const buttonElement = screen.getByTestId(/filter-vehicles/i);
  expect(buttonElement).toBeInTheDocument();

  user.click(buttonElement)

  expect(screen.getByTestId('location-display')).toHaveTextContent('/filter')
});



