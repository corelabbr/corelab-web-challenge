import axios from "axios";

export const instace = axios.create({
  baseURL: "http://127.0.0.1:3333/vehicles",
});

export const getVehicle = () => instace.get("/");

export const AddVehicle = (data: object) => instace.post("/", data);

export const favoriteVehicle = (id: number) =>
  instace.put(`/${id}`, { isfavorite: true });

export const deleteVehicle = (id: number) => {
  instace.delete(`/${id}`);
};
