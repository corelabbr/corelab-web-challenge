import React from 'react';
import { render, screen } from '@testing-library/react';
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

test('renders remove page buttons', () => {
  renderWithRouter(<App />, { route: '/remove-vehicle/1' })

  expect(screen.getByTestId(/remove-btn/i)).toBeInTheDocument();
  expect(screen.getByTestId(/cancel-btn/i)).toBeInTheDocument();
});




