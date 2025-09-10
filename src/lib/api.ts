import axios from "axios";
import { CardType } from "../types/CardType";
import { CardDTO } from "../types/CardDTO";

const API = process.env.REACT_APP_API_URL ?? "http://localhost:3333";

const getCards = async (): Promise<CardType[] | undefined> => {
  try {
    const response = await axios.get<CardType[]>("http://localhost:3333/card");
    return response.data;
  } catch (err: unknown) {}
};

const saveCard = async (newCard: CardDTO) => {
  const response = await axios.post<CardType>(`${API}/card`, newCard);

  return response.data;
};

const updateCard = async (id: number, newCard: CardDTO) => {
  await axios.put<CardType>(`${API}/card/${id}`, newCard);
};

const deleteCard = async ({ id }: { id: number }, reloadCards: Function) => {
  await axios.delete<CardType>(`${API}/card/${id}`);
  await reloadCards();
};

export { getCards, saveCard, updateCard, deleteCard };
