const API = 'http://localhost:3333/api/v1';

const endpoint = (path: string): string => API + path;

const get = async (path: string): Promise<any> => fetch(endpoint(path)).then((res) => res.json());

export const getVehicles = async () => get('/vehicles');
export const getVehicle = async (id: number) => get(`/vehicles/${id}`);
