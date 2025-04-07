import { useQuery, useQueryClient } from '@tanstack/react-query';
import { get } from '../lib/api';
import { ITodo } from '../types/TodoTypes';

export const getTodos = async (): Promise<ITodo[]> => {
  return get('/todos');
};

export const useTodos = () => {
  return useQuery<ITodo[], Error>({
    queryKey: ['todos'],
    queryFn: getTodos,
    staleTime: 0, // Sempre considerar os dados como obsoletos
    gcTime: 0  // Não manter em cache
  });
};

export const invalidateTodosCache = (queryClient: any) => {
  queryClient.invalidateQueries(['todos']);
}; 