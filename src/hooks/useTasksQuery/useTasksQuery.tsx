import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../api';
import { ITask, ITasksQueryParams } from '../../interfaces/Tasks';

interface ITasksQueryResponse {
  length: number;
  results: ITask[];
}

const useTasksQuery = (params: ITasksQueryParams) => {
  return useQuery<ITasksQueryResponse, Error>({
    queryKey: ['tasks'],
    queryFn: fetchApi.bind(null, 'tasks', params),
  });
};

export default useTasksQuery;