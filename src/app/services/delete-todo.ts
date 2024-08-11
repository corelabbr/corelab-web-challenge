import { api } from "../lib/axios";

export default function deleteTodo(id: number) {
  return api.delete("/todos", { data: { id } });
}
