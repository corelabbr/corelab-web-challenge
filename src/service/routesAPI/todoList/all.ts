import axiosInstance from "@/service/api";

const getTodoLists = (title = "", color = "") => {
  return axiosInstance.get(`/api/todo/?title=${title}&color=${color}`);
};

export default getTodoLists;
