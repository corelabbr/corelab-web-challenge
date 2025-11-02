export interface ITask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isFavorite: boolean;
  color: string;
  createdAt?: string;
  updatedAt?: string;
}
