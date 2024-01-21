import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateTaskInput from './index';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../../lib/query-client';

test('render create task input component properly', () => {
  

  render(
  <QueryClientProvider client={queryClient}>
    <CreateTaskInput />
  </QueryClientProvider>
  );

  const inputTitle = screen.getByPlaceholderText(/Título/i);
  expect(inputTitle).toBeInTheDocument();

  const inputBody = screen.getByPlaceholderText(/Criar nota.../i);
  expect(inputBody).toBeInTheDocument();

  const favButton = screen.getByRole('button');
  expect(favButton).toBeInTheDocument();

  expect(inputTitle).toHaveValue('');
  expect(inputBody).toHaveValue('');
  expect(favButton).toContainHTML('svg');



});