import { Card } from "./card";
import { InputCard } from "./input-card";
import { useNotes } from "../context/notes-context";

export function Main() {
  const { notes } = useNotes();

  return (
    <main className=" items-center flex flex-col justify-center">
      <InputCard />
      <ul className="flex flex-col gap-14 lg:flex-row lg:flex-wrap lg:mx-auto justify-center">
        {notes.map((note) => (
          <li key={note.id}>
            <Card
              id={note.id}
              fav={note.fav}
              title={note.title}
              color={note.color}
              file={note.file || undefined}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
