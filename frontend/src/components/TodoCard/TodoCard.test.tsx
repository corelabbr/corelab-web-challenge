import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoCard from './index';

const mockTodo = {
  id: 1,
  title: 'Test Todo',
  description: 'Test Description',
  isFavorite: false,
  color: '#4caf50',
  createdAt: new Date(),
};

const mockOnToggleFavorite = jest.fn();
const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe('TodoCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the todo card with correct content', () => {
    render(
      <TodoCard
        todo={mockTodo}
        onToggleFavorite={mockOnToggleFavorite}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('calls onToggleFavorite when favorite button is clicked', () => {
    render(
      <TodoCard
        todo={mockTodo}
        onToggleFavorite={mockOnToggleFavorite}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const favoriteButton = screen.getByLabelText('Adicionar aos favoritos');
    fireEvent.click(favoriteButton);

    expect(mockOnToggleFavorite).toHaveBeenCalledWith(1, true);
  });

  it('calls onEdit when edit button is clicked', () => {
    render(
      <TodoCard
        todo={mockTodo}
        onToggleFavorite={mockOnToggleFavorite}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const editButton = screen.getByLabelText('Editar tarefa');
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockTodo);
  });

  it('opens delete modal when delete button is clicked', () => {
    render(
      <TodoCard
        todo={mockTodo}
        onToggleFavorite={mockOnToggleFavorite}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByLabelText('Excluir tarefa');
    fireEvent.click(deleteButton);

    // DeleteModal is rendered with the todo title
    expect(screen.getByText(/Deseja excluir/i)).toBeInTheDocument();
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });
}); 