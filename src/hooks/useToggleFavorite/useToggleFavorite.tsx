import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchApi } from '../api';
import { ITask } from '../../interfaces/Tasks';


type IUpdateTask = Omit<ITask, 'title' | 'description' | 'status' | 'color'>;

const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  const mutationFn = ({ id, favorite }: IUpdateTask) => patchApi('tasks', id, { favorite: favorite });

  return useMutation<void, Error, IUpdateTask>(
    {
      mutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']);
      },
    });
};

export default useToggleFavorite;