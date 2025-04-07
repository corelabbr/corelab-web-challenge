import axiosInstance from "@/service/api";
import { TodoListInterface } from "@/types/todo_list_type";

const createTodoList = (data: TodoListInterface) => {
  return axiosInstance.post("/api/todo/create", data);
};

export default createTodoList;
