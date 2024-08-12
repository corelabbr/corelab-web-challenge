import api from '../api/config';

export const listCards = async (param: string) => {
  return api.get(`/cards/search?${param}`).then((response) => response.data);
};
