import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchApi } from '../api';
import { ITask } from '../../interfaces/Tasks';


type IUpdateTask = Omit<ITask, 'title' | 'description' | 'status' | 'favorite'>;

const useUpdateColor = () => {
  const queryClient = useQueryClient();

  const mutationFn = ({ id, color }: IUpdateTask) => patchApi('tasks', id, { color: color });

  return useMutation<void, Error, IUpdateTask>(
    {
      mutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']);
      },
    });
};

export default useUpdateColor;