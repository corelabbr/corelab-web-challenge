import { useMutation } from '@tanstack/react-query';
import TaskService from '../utils/data/task';
import queryClient from '../lib/query-client';

export const useAddTask = () => {
  return useMutation({
    mutationFn: TaskService.addTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks']})
  });
};

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: TaskService.deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks']})
  });
};

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: TaskService.updateTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks']})
  });
};
