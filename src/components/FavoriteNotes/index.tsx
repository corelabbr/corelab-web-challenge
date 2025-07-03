import type { NoteProps } from "../../@types/note";
import { Note } from "../Note";
import { FavoriteTitle, FavotireNoteSection, FavoriteContent } from "./style";

interface FavotireNotesProps {
  favoriteNotes?: NoteProps[];
}

export function FavoriteNotes({ favoriteNotes }: FavotireNotesProps) {
  return (
    <FavotireNoteSection>
      <FavoriteTitle>Favoritas</FavoriteTitle>

      <FavoriteContent>
        {favoriteNotes &&
          favoriteNotes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              description={note.description}
              favorite={note.favorite}
              colorProp={note.color}
            />
          ))}
      </FavoriteContent>
    </FavotireNoteSection>
  );
}
