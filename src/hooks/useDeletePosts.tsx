import axios from 'axios';
import api from "../lib/api";



interface DeleteResult {
  authenticationDE: (id:number) => Promise<string>;
}


export const useDeletePosts = (): DeleteResult => {

  const authenticationDE = async (id:number) => {

    try {
      const response = await api.delete('/posts/' + id,);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          return "delete erro"
        }else{
          return "servidor erro"
        }
      } else {
        console.error('Erro desconhecido:', error)
      }
    }

  };

  return { authenticationDE};
};