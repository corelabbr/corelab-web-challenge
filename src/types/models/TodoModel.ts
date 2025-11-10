export interface CreateTodoModel {
  title: string;
  description: string;
  isFavorite?: boolean;
  color?: string;
}

export type UpdateTodoModel = Partial<CreateTodoModel> & { id: string }
