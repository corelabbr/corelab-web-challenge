import { INote } from "../types/notes.type";

export const initialNotes: INote[] = [
  {
    id: 1,
    title: "Nota Favorita",
    content: "Esta nota deve aparecer no topo, na seção de favoritas.",
    isFavorite: true,
    color: "#FFE8AC", // Amarelo
  },
  {
    id: 2,
    title: "Primeira Nota",
    content: "Clique ou arraste o arquivo para esta área para fazer upload.",
    isFavorite: false,
    color: "#BAE2FF", // Azul
  },
  {
    id: 3,
    title: "Outra Tarefa",
    content: "Lembrar de comprar pão.",
    isFavorite: false,
    color: "#B9FFDD", // Verde
  },
];
