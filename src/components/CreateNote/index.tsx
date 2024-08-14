import { FaRegStar, FaStar } from "react-icons/fa";
import { useState, useRef } from "react";
import Tiptap from "../TipTap";
import { IoCheckmark } from "react-icons/io5";
import { createNote } from "../../api/routes";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.scss";

interface CreateNoteProps {
  onAddNote: (note: any) => void;
}

export default function CreateNote({ onAddNote }: CreateNoteProps) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const [isFavorite, setIsFavorite] = useState(false);

  const tiptapRef = useRef<{ resetContent: () => void } | null>(null);

  const notify = () => {
    toast("Nota adicionada!");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (noteTitle.trim() === "" || noteContent.trim() === "") {
      console.warn("Title or content is empty. Cannot create note.");
      return;
    }

    try {
      const newNote = {
        title: noteTitle,
        content: noteContent,
        color: "#FFFFFF",
        favorite: isFavorite,
      };

      const createdNote = await createNote(newNote);

      setNoteTitle("");
      setNoteContent("");
      setIsFavorite(false);

      onAddNote(createdNote.data);

      notify();

      if (tiptapRef.current) {
        tiptapRef.current.resetContent();
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="contanier_create_note">
        <header>
          <input
            placeholder="Título"
            onChange={(e) => {
              setNoteTitle(e.target.value);
            }}
            type="text"
            value={noteTitle}
          />
          <button
            className="button_fav"
            type="button"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? <FaStar /> : <FaRegStar />}
          </button>
        </header>
        <div className="tiptap_wrap" onClick={(e) => e.stopPropagation()}>
          <Tiptap
            setContent={setNoteContent}
            initialContent=""
            ref={tiptapRef}
          />
          <button className="button_create" type="submit">
            <IoCheckmark />
          </button>
        </div>
      </section>
    </form>
  );
}
