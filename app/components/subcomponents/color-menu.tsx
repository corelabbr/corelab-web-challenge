import { updateNote } from "@/app/api/note/update-note";
import { useNotes } from "@/app/context/notes-context";
import { useSession } from "@/app/context/session-id-context";

interface ColorMenuProps {
  color: string;
  colorIndex: number;
  noteId: string;
}

export function ColorMenu({ color, colorIndex, noteId }: ColorMenuProps) {
  const { userId } = useSession();
  const { setNotes, notes } = useNotes();
  async function handleColorChange() {
    await updateNote({
      id: noteId,
      color: colorIndex,
      user_id: userId || "",
    }).then(() => {
      const updatedNotes = notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, color: colorIndex };
        }
        return note;
      });
      setNotes(updatedNotes);
    });
  }
  return (
    <button
      className="rounded-full w-7 h-7 m-1 border-none hover:opacity-20"
      style={{ backgroundColor: color }}
      onClick={handleColorChange}
    ></button>
  );
}
