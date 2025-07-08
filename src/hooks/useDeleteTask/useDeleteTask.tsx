import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ITask } from '../../interfaces/Tasks';
import { deleteItemApi } from '../api';

type IDeleteTask = Omit<ITask, 'title' | 'description' | 'status' | 'color' | 'favorite'>;

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutationFn = ({ id }: IDeleteTask) => deleteItemApi('tasks', id);

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};

export default useDeleteTask;