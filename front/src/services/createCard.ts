import { toast } from 'react-toastify';
import api from '../api/config';
import { ICreateOrUpdateCard } from '../types/createCard';

export const createCardService = async (data: ICreateOrUpdateCard) => {
  return api
    .post(`/cards`, data)
    .then((response) => {
      toast.success('Card criado com sucesso!');
      return response.data;
    })
    .catch((error) => {
      toast.error('Erro ao criar o card!');
      return error;
    });
};
