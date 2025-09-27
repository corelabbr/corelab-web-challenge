import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import * as api from '../../lib/api';
import TasksPage from './index';

jest.mock('../../lib/api');

const getTasks = api.getTasks as jest.Mock;
const createTask = api.createTask as jest.Mock;
const updateTask = api.updateTask as jest.Mock;
const deleteTask = api.deleteTask as jest.Mock;

const mockTasks = [
  {
    id: 1,
    title: 'Primeira tarefa',
    description: 'Descrição 1',
    color: 'blue',
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Favorita',
    description: 'Descrição 2',
    color: 'yellow',
    isFavorite: true,
  },
];

describe('TasksPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getTasks.mockResolvedValue([...mockTasks]);
    createTask.mockImplementation(async (task: any) => ({
      ...task,
      id: 3,
      isFavorite: false,
      color: 'white',
    }));
    updateTask.mockImplementation(async (id: any, data: any) => ({
      ...mockTasks.find((t) => t.id === id),
      ...data,
    }));
    deleteTask.mockResolvedValue(undefined);
  });

  it('renderiza tarefas e favoritos', async () => {
    render(<TasksPage />);
    expect(await screen.findByText('Primeira tarefa')).toBeInTheDocument();
    expect(screen.getByText('Favorita')).toBeInTheDocument();
    expect(screen.getByText('Favoritas')).toBeInTheDocument();
    expect(screen.getByText('Outras')).toBeInTheDocument();
  });

  it('cria uma nova tarefa', async () => {
    render(<TasksPage />);
    const input = await screen.findByPlaceholderText('Título');
    const textarea = screen.getByPlaceholderText('Criar nota...');
    const addButton = screen.getByLabelText('Adicionar nota');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Nova tarefa' } });
      fireEvent.change(textarea, { target: { value: 'Descrição nova' } });
      fireEvent.click(addButton);
    });
    await waitFor(() => expect(api.createTask).toHaveBeenCalled());
  });

  it('filtra tarefas por texto', async () => {
    render(<TasksPage />);
    const search = await screen.findByPlaceholderText('Pesquisar notas');
    await act(async () => {
      fireEvent.change(search, { target: { value: 'Favorita' } });
    });
    expect(await screen.findByText('Favorita')).toBeInTheDocument();
    expect(screen.queryByText('Primeira tarefa')).not.toBeInTheDocument();
  });

  it('marca/desmarca favorito', async () => {
    render(<TasksPage />);
    const starButtons = await screen.findAllByLabelText('Favorite');
    await act(async () => {
      fireEvent.click(starButtons[0]);
    });
    await waitFor(() => expect(api.updateTask).toHaveBeenCalled());
  });

  it('deleta uma tarefa', async () => {
    render(<TasksPage />);
    const deleteButtons = await screen.findAllByLabelText('Delete');
    await act(async () => {
      fireEvent.click(deleteButtons[0]);
    });
    expect(await screen.findByText(/deseja excluir/i)).toBeInTheDocument();
    const confirm = screen.getByText('Confirmar');
    await act(async () => {
      fireEvent.click(confirm);
    });
    await waitFor(() => expect(api.deleteTask).toHaveBeenCalled());
  });
});
