import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskCard from './index';
import { Task } from '../../types/Task';
import { Colors } from '../../types/Colors';
import queryClient from '../../lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';

test('render task card component properly', () => {
  
  const task: Task = {
    id: '1',
    title: 'Teste title',
    body: 'Teste body',
    favorited: false,
    color: Colors.Default
  };
  render(
    <QueryClientProvider client={queryClient}>
      <TaskCard task={task} />
    </QueryClientProvider>
  );

  const title = screen.getByText(/Teste title/i);
  expect(title).toBeInTheDocument();
  
  const body = screen.getByText(/Teste body/i);
  expect(body).toBeInTheDocument();

  const card = screen.getByRole('article');
  expect(card).toHaveStyle({ backgroundColor: task.color });

});