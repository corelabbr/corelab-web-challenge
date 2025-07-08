export interface ITask {
  id: number;
  title: string;
  description: string;
  status: number;
  favorite: boolean;
  color: string;
}

export enum TaskStatus {
  todo,
  doing,
  done
}

export interface ITasksQueryParams {
  search?: string;
  color?: string;
  favorite?: boolean
}