import React from 'react';
import { render, screen } from '@testing-library/react';
import NotesPage from './index';

test('renders learn react link', () => {
  render(<NotesPage />);
  const searchElement = screen.getByPlaceholderText(/search/i);
  const buttonElement = screen.getByText(/add new vehicle/i);
  expect(searchElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});
