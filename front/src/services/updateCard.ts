import { toast } from 'react-toastify';
import api from '../api/config';
import { ICreateOrUpdateCard } from '../types/createCard';

export const updateCard = async (id: number, data: ICreateOrUpdateCard) => {
  return api
    .patch(`/cards/${id}`, data)
    .then((response) => {
      toast.success('Card atualizado com sucesso!');
      return response.data;
    })
    .catch((error) => {
      toast.error('Erro ao atualizar o card!');
      return error;
    });
};
