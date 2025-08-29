 export type TaskColor = 
   | 'red' 
   | 'blue' 
   | 'green' 
   | 'yellow' 
   | 'purple' 
   | 'pink' 
   | 'indigo' 
   | 'gray';
 
export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  isFavorite: boolean;
  color: TaskColor;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  color?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  isFavorite?: boolean;
  color?: string;
}

export interface TaskFilters {
  status?: TaskStatus;
  isFavorite?: boolean;
  search?: string;
  color?: TaskColor;
}