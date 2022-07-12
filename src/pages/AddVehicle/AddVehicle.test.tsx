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

test('render and functionaly add new vehicle and rendered all fields check', () => {
  const {user} = renderWithRouter(<App />, { route: '/add-vehicle' })

  expect(screen.getByText(/name/i)).toBeInTheDocument()
  expect(screen.getByText(/brand/i)).toBeInTheDocument()
  expect(screen.getByText(/description/i)).toBeInTheDocument()
  expect(screen.getByText(/color/i)).toBeInTheDocument()
  expect(screen.getByText(/year/i)).toBeInTheDocument()
  expect(screen.getByText(/plate/i)).toBeInTheDocument()
  expect(screen.getByText(/price/i)).toBeInTheDocument()
});

/* This is usage and combine of testing API url*/
// const awaitFetch = (timeout: number = 3000) => new Promise<void>((resolve) => {
//   setTimeout(() => {
//     resolve()
//   }, timeout);
// }) 

// test('render and functionaly add new vehicle and rendered all fields check -> 1', async () => {
//   const {user} = renderWithRouter(<App />, { route: '/add-vehicle' })

//   user.type(screen.getByLabelText(/name/i), 'mateus')
//   user.type(screen.getByLabelText(/brand/i), 'fiat')
//   user.type(screen.getByLabelText(/description/i), 'algo')
//   user.type(screen.getByLabelText(/color/i), 'red')
//   user.type(screen.getByLabelText(/year/i), '2019')
//   user.type(screen.getByLabelText(/plate/i), 'aw92-2')
//   user.type(screen.getByLabelText(/price/i), '20000')

//   user.click(screen.getByText(/confirm/i))

//   await awaitFetch()

//   expect(screen.getByTestId('location-display')).not.toHaveTextContent('/add-vehicle')
// });

