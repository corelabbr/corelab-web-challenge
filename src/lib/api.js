const API = "http://localhost:3333/v";

const endpoint = (path) => API + path;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const get = async (path) => {
  return fetch(endpoint(path)).then((res) => res.json());
};

const post = async (path, payload) => {
  return fetch(endpoint(path), {
    body: JSON.stringify(payload),
    method: "POST",
    headers,
  }).then((res) => res.json());
};

const put = async (path, payload) => {
  return fetch(endpoint(path), {
    body: JSON.stringify(payload),
    method: "PUT",
    headers,
  }).then((res) => res.json());
};

const delet = async (path) => {
  return fetch(endpoint(path), { method: "DELETE", headers }).then((res) =>
    res.json()
  );
};

export const getVehicles = () => {
  return get("/read");
};

export const updateVehicle = (payload) => {
  return put("/update/" + payload.id, payload);
};

export const createVehicle = (payload) => {
  return post("/create", payload);
};

export const deleteVehicle = (id) => {
  return delet("/delete/  " + id);
};

export const searchVehicles = (param) => {
  return get("/search" + param);
};

export const filtersVehicles = () => {
  return get("/filters");
};

export { post, get, put, delet };
