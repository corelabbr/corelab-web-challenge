import { IUser } from '../types/User';
import { IVehicle } from '../types/Vehicle';

const API = 'http://localhost:3333/api/v1';
type TBodyRequest = IVehicle | IUser;

const endpoint = (path: string): string => API + path;

const get = async (path: string, token?: string): Promise<any> => fetch(
  endpoint(path),
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  },
).then((res) => res.json());

const create = async <T>(path: string, body: TBodyRequest, auth?: string): Promise<T> => fetch(
  endpoint(path),
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(auth ? { Authorization: `Bearer ${auth}` } : {}) },
    body: JSON.stringify(body),
  },
).then((res) => res.json());

const favorite = async (path: string, auth: string): Promise<boolean> => fetch(
  endpoint(path),
  {
    method: 'PUT',
    headers: { Authorization: `Bearer ${auth}` },
  },
).then((res) => res.status === 200);

const update = async <T>(path: string, auth: string, body: IVehicle): Promise<T> => fetch(
  endpoint(path),
  {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth}` },
    body: JSON.stringify(body),
  },
).then((res) => res.json());

const deleteCar = async (path: string, auth: string): Promise<boolean> => fetch(
  endpoint(path),
  {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${auth}` },
  },
).then((res) => res.status === 200);

export const getVehicles = async () => get('/vehicles');
export const getVehicle = async (id: number) => get(`/vehicles/${id}`);
export const getVehiclesFavorites = async (token: string) => get('/vehicles/favorites', token);
export const setVehicleFavorite = async (id: number, token: string) => favorite(`/vehicles/${id}/favorite`, token);
export const getMyVehicles = async (token: string) => get('/vehicles/my-vehicles', token);

export const createVehicle = async (vehicle: IVehicle, auth: string) => create<IVehicle>('/vehicles', vehicle, auth);
export const createUser = async (user: IUser) => create<IUser>('/users', user);

export const login = async (username: string, password: string): Promise<string> => fetch(endpoint('/auth/login'), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password }),
}).then((res) => res.json());

export const updateVehicle = async (vehicle: IVehicle, auth: string) => update<IVehicle>(`/vehicles/${vehicle.id}`, auth, vehicle);

export const deleteVehicle = async (id: number, auth: string) => deleteCar(`/vehicles/${id}`, auth);
