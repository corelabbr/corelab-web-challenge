import Notes from "../components/Notes";
import Topbar from "../components/TopBar";
import CreateNote from "../components/CreateNote";
import { useState } from "react";

interface NoteData {
  id: number;
  title: string;
  content: string;
  color: string;
  favorite: boolean;
}

function PageNote() {
  const [newNote, setNewNote] = useState<NoteData>({
    id: 0,
    title: "",
    content: "",
    color: "#FFFFFF",
    favorite: false,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleAddNote = (note: any) => {
    setNewNote(note);
  };

  return (
    <>
      <Topbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CreateNote onAddNote={handleAddNote} />
      <section className="body-app">
        <Notes newNote={newNote} searchTerm={searchTerm} />
      </section>
    </>
  );
}

export default PageNote;
