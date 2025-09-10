import { CardType } from "./CardType";

export type CardDTO = Omit<CardType, "id" | "created_at" | "updated_at">;
