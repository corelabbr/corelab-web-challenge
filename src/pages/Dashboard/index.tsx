import { useEffect, useState } from "react";
import { FavoriteNotes } from "../../components/FavoriteNotes";
import { NewNote } from "../../components/NewNote";
import { OthersNotes } from "../../components/OthersNotes";
import { DashboardContainer } from "./style";
import type { NoteProps } from "../../@types/note";
import { useNote } from "../../contexts/useNote";

export function Dashboard() {
  const { filteredNotes } = useNote()
  const [favoriteNotes, setFavoriteNotes] = useState<NoteProps[]>([]);
  const [othersNotes, setOthersNotes] = useState<NoteProps[]>([]);

  useEffect(() => {
    setFavoriteNotes(filteredNotes.filter((note) => note.favorite));
    setOthersNotes(filteredNotes.filter((note) => !note.favorite));
  }, [filteredNotes]);

  return (
    <DashboardContainer>
      <NewNote />

      { favoriteNotes.length > 0 && ( <FavoriteNotes favoriteNotes={favoriteNotes} /> ) }
      { othersNotes.length > 0 && ( <OthersNotes othersNotes={othersNotes} /> ) }
    </DashboardContainer>
  );
}
