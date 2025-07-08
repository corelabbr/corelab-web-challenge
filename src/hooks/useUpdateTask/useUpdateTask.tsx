import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchApi } from '../api';
import { ITask } from '../../interfaces/Tasks';


interface IUpdateTask extends ITask { };

const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const mutationFn = ({
    id, status, color, description, favorite, title
  }: IUpdateTask) => patchApi('tasks', id, { status, color, description, favorite, title });

  return useMutation<void, Error, IUpdateTask>(
    {
      mutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']);
      },
    });
};

export default useUpdateTask;