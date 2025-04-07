import axiosInstance from "@/service/api";

const editTodoList = (data: any, id: number) => {
  return axiosInstance.put(`/api/todo/edit/${id}`, data);
};

export default editTodoList;
