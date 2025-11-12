import COLORS from "../constants/colors";
import { INote } from "../types/Note";

const NotesMock: INote[] = [
  {
    id: "1",
    title: "Título",
    body: "Clique ou arraste o arquivo para esta área para fazer upload",
    color: COLORS[0],
    isFavorite: false,
  },
  {
    id: "2",
    title: "Título",
    body: "Clique ou arraste o arquivo para esta área para fazer upload",
    color: COLORS[1],
    isFavorite: false,
  },
  {
    id: "3",
    title: "Título",
    body: "Clique ou arraste o arquivo para esta área para fazer upload",
    color: COLORS[2],
    isFavorite: false,
  },
];

export default NotesMock;
