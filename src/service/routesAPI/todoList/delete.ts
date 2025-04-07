import axiosInstance from "@/service/api";

const deleteTodoList = (id: number) => {
  return axiosInstance.delete(`/api/todo/delete/${id}`);
};

export default deleteTodoList;
