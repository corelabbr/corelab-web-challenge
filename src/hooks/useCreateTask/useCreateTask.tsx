import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../api';
import { ITask } from '../../interfaces/Tasks';

type ICreateTask = Omit<ITask, 'id' | 'favorite'>;

const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutationFn = (payload: ICreateTask) => postApi('tasks', payload);

  return useMutation<void, Error, ICreateTask>(
    {
      mutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']);
      },
    });
};

export default useCreateTask;