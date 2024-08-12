import axios from 'axios';
import store from '../store/store';
import { hideLoading, showLoading } from '../features/loading';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    store.dispatch(showLoading());
    return config;
  },
  (error) => {
    store.dispatch(showLoading());
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      store.dispatch(hideLoading());
    }, 1000);
    return response;
  },
  (error) => {
    setTimeout(() => {
      store.dispatch(hideLoading());
    }, 1000);
    toast.error('Ops. Algo deu errado :(');
    return Promise.reject(error);
  },
);

export default api;
