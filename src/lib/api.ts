const API = "http://localhost:3333";

const endpoint = (path: string): string => API + path;

const get = async (path: string): Promise<any> => {
  return fetch(endpoint(path)).then((res) => res.json());
};

const post = async (path: string,methodFetch:string,data:object): Promise<any> => {
  return fetch(endpoint(path),{
    method: methodFetch,
    headers: {"Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(data)
  }).then((res) => res.json());
};
const deleteInfo = async (path: string):Promise<any> => {
  return fetch(endpoint(path),{
    method: "DELETE",
    headers: {"Content-type": "application/json; charset=UTF-8"},
  }).then((res) => res.json());
};
const patch = async (path: string,data:object):Promise<any> => {
   
  return fetch(endpoint(path),{
    method: "PATCH",
    headers: {"Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(data)
  }).then((res) => res.json())
  
};
export const getVehicles = async () => {
  return get("/api/vehicles");
};

export const createVehicle = async (data:object) => {
  return post("/api/vehicles","POST",data);
};

export const deleteVehicle = async (id:number) => {
  return deleteInfo(`/api/vehicles/${id}`);
};


export const editVehicle = async (id:number,data:object) => {
  return patch(`/api/vehicles/${id}`,data);
};

export const favoriteOrUnfavoriteVehicle = async (id:number,data:object)=> {
  return patch(`/api/vehicles/favorite/${id}`,data);
};

export const getVehicleById = async (id:number) => {
  return get(`/api/vehicles/${id}`);
};