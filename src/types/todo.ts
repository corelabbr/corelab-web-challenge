import type { FormColor } from "./formColor";

export interface Todo {
  id: string;
  userId: string;
  title: string;
  description?: string;
  color: keyof FormColor;
  isFavorite: boolean;
  createdAt: string;
}
