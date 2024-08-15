import axios from 'axios';
import api from "../lib/api";

export type postGet = {
    title: string;
    text?: string;
    media: string[];
    color: string;
    favorite: boolean;
    id: number;
  }

interface GetResult {
  authenticationGP: () => Promise<postGet[]>;
}


export const useGetPosts = (): GetResult => {

  const authenticationGP = async () => {

    try {
      const response = await api.get('/posts');

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          return "post erro"
        }else{
          return "servidor erro"
        }
      } else {
        console.error('Erro desconhecido:', error)
      }
    }

  };

  return { authenticationGP};
};