import axios from 'axios';
import api from "../lib/api";

export type post = {
    title?: string;
    text?: string;
    media?: string[];
    color?: string;
    favorite?: boolean;
    id: number;
  }

interface PutResult {
  authenticationPU: (post:post) => Promise<string>;
}


export const usePutPosts = (): PutResult => {

  const authenticationPU = async (post: post) => {

    try {
      const response = await api.put('/posts/' + post.id,  {
        title:post.title,
        text:post.text,
        favorite:post.favorite,
        color:post.color,
        media:post.media
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          return "put erro"
        }else{
          return "servidor erro"
        }
      } else {
        console.error('Erro desconhecido:', error)
      }
    }

  };

  return { authenticationPU};
};