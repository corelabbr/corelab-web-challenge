import axios from 'axios';
import api from "../lib/api";

export type post = {
    title: string;
    text?: string;
    media: string[];
    color: string;
    favorite: boolean;
  }

interface PostResult {
  authenticationP: (post:post) => Promise<any>;
}


export const usePosts = (): PostResult => {

  const authenticationP = async (post: post) => {

    try {
      const response = await api.post  ('/posts',  {
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
          return "post erro"
        }else{
          return "servidor erro"
        }
      } else {
        console.error('Erro desconhecido:', error)
      }
    }

  };

  return { authenticationP };
};