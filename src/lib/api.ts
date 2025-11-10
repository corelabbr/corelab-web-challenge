import { ITaskRequest } from '../types/ITaskRequest';
import { ITask } from '../types/Task';
import { queryString } from './util/util';

const API = process.env.REACT_APP_API_URL_PRODUCTION;

const endpoint = (path: string): string => API + path;

const apiGet = async (path: string, payload?: { [key: string]: string }): Promise<any> => {
  const query = queryString(payload);

  return await fetch(endpoint(path) + query, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  });
};
const apiPost = async (path: string, payload: ITaskRequest): Promise<ITask> => {
  return await fetch(endpoint(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  });
};

const apiPut = async (path: string, payload: ITaskRequest): Promise<ITask> => {
  return await fetch(endpoint(path), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  });
};

const apiDelete = async (path: string) => {
  return await fetch(endpoint(path), {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    return;
  });
};

export const getTasks = async (payload?: { [key: string]: string }) => {
  return apiGet('/tasks', payload);
};

export const postTask = async (payload: ITaskRequest) => {
  return apiPost('/tasks', payload);
};
export const putTask = async (id: string, payload: ITaskRequest) => {
  return apiPut(`/tasks/${id}`, payload);
};

export const deleteTask = async (id: string) => {
  return apiDelete(`/tasks/${id}`);
};
