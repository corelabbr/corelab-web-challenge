export interface Task {
  _id: string;
  title: string;
  description?: string;
  isFavorite: boolean;
  color: string;
  createdAt: string;
}

export interface TaskData {
  title: string;
  description: string;
  isFavorite: boolean;
  color: string;
}
