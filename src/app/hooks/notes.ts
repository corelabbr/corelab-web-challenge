import { useContext } from "react";

import { ContextNotes } from "@/app/context/notes";

export default function useNotes() {
  return useContext(ContextNotes);
}
