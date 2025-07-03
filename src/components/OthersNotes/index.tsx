import type { NoteProps } from "../../@types/note";
import { Note } from "../Note";
import { OthersContent, OthersNoteSection, OthersTitle } from "./style";

interface OthersNotesProps {
  othersNotes?: NoteProps[];
}

export function OthersNotes({ othersNotes }: OthersNotesProps) {
  return (
    <OthersNoteSection>
      <OthersTitle>Outras</OthersTitle>

      <OthersContent>
        {othersNotes &&
          othersNotes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              description={note.description}
              favorite={note.favorite}
              colorProp={note.color}
            />
          ))}
      </OthersContent>
    </OthersNoteSection>
  );
}
