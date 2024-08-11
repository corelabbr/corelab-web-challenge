import { TodoEntity } from "../shared/types/TodoEntity";
import { api } from "../lib/axios";

export default function createTodo({
  description,
  favorite,
  title,
}: TodoEntity) {
  return api.post("/todos", {
    description,
    favorite,
    title,
  });
}
