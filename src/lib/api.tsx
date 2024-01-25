import { api } from "./axios";

export const getFavorites = async () => {
  const favorites = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/favorites`, {
    cache: "no-cache",
  }).then(res => res.json());
  return favorites
}

export const getOthers = async () => {
  const others = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/others`, {
    cache: "no-cache",
  }).then(res => res.json());
  return others
}

export const getSearch = async (param: string) => {
  const search = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/search/${param}`, {
    cache: "no-cache",
  }).then(res => res.json());
  return search
}

export const postNote = async (body: any) => {
  return await api.post(`/notes`, {
    title: body.title,
    favorite: body.favorite,
    description: body.description
  });
}

export const putFavorite = async (id: number, favorite?: boolean) => {
  return await api.put(`/notes/${id}`, { favorite: favorite });
}

export const putColor = async (id: number, color: string) => {
  return await api.put(`/notes/${id}`, { color: color });
}

export const putNote = async (id: number, body: any) => {
  await new Promise((resolve) => { setTimeout(resolve, 1000) })
  return await api.put(`/notes/${id}`, {
    title: body.title,
    favorite: body.favorite,
    description: body.description
  });
}

export const deleteNote = async (id: number) => {
  return await api.delete(`/notes/${id}`);
}