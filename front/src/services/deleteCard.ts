import { toast } from 'react-toastify';
import api from '../api/config';

export const deleteCard = async (id: number) => {
  return api
    .delete(`/cards/${id}`)
    .then((response) => {
      toast.success('Card deletado com sucesso!');
      return response.data;
    })
    .catch((error) => {
      toast.error('Erro ao deletar o card!');
      return error;
    });
};
