const API = "http://localhost:3333/api";

const endpoint = (path: string): string => API + path;

const get = async (path: string): Promise<any> => {
  return fetch(endpoint(path)).then((res) => res.json());
};

const put = async (path: string, body: object): Promise<any> => {

  const fetchData = {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body),
  }
  
  return fetch(endpoint(path), fetchData).then((res) => res.json());
};

const post = async (path: string, body: object): Promise<any> => {

  const fetchData = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  }

  return fetch(endpoint(path), fetchData).then((res) => res.json());
}

const del = async (path: string): Promise<any> => {
  
  const fetchData = {
    method: "DELETE"
  }

  return fetch(endpoint(path), fetchData).then((res) => res.json());
}

export const getVehicles = async () => {
  return get("/vehicles");
};

export const putVehicles = async (id : number, body: object) => {
  return put(`/vehicles/${id}`, body);
}

export const postVehicles = async(body: object) => {
  return post(`/vehicles`, body)
}

export const delVehicles = async(id: number) => {
  return del(`/vehicles/${id}`)
}
