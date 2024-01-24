import { TodoInterface } from "@/types/Todo";

export const sortByFavorite = (todos: TodoInterface[]) => {
  return todos.sort((a, b) => {
    if (a.favorite === b.favorite) {
      return 0;
    } else if (a.favorite) {
      return -1;
    } else {
      return 1;
    }
  });
};
