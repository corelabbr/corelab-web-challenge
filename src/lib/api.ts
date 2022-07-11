export const API = "http://192.168.100.62:3000";

const endpoint = (path: string): string => API + path;

// -------------------------- Get -------------------------- //

const get = async (path: string): Promise<any> => {
  return fetch(endpoint(path)).then((res) => res.json());
};

export const getVehicles = async () => {
  return get("/cars");
};

// -------------------------- Other Methods -------------------------- //


export const myFetch = async ( path : string, type : string, body : Object ): Promise<any> => {

  const config = {
    method : type,
    headers : new Headers({ 'Content-type' : 'application/json' }),
    body : JSON.stringify(body)
  }

  return fetch(endpoint(path), config).then((res) => res.json());
}


