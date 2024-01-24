import { SetStateAction } from "react";

export interface HeaderProps {
  setSearch: React.Dispatch<SetStateAction<string>>;
}
