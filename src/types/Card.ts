import { IUpdateCard } from "./UpdateCard";

export interface ICard {
  id: string;
  title: string;
  text: string;
  favorite: boolean;
  color: string;
  onClickDelete: (e: any) => void;
  onUpdateCard: (update: IUpdateCard) => void;
}
