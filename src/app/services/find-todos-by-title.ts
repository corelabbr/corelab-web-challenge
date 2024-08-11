import { api } from "../lib/axios";

export default function findTodosByTitle(title: string) {
  return api.get(`/search?title=${title}`);
}
