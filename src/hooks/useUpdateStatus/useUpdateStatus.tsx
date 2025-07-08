import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchApi } from '../api';
import { ITask } from '../../interfaces/Tasks';


type IUpdateTask = Omit<ITask, 'favorite' | 'title' | 'description' | 'color'>;

const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  const mutationFn = ({ id, status }: IUpdateTask) => patchApi('tasks', id, { status: status });

  return useMutation<void, Error, IUpdateTask>(
    {
      mutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']);
      },
    });
};

export default useUpdateStatus;