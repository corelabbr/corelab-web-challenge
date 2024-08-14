import { useEffect, useState, useCallback, useRef } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoColorFillOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

import { motion, AnimatePresence } from "framer-motion";

import { GoPencil } from "react-icons/go";

import TipTap from "../TipTap";

import "./styles.scss";
import ModalColors from "../Modals/ModalColor";
import ModalDelete from "../Modals/ModalDelete";

interface NoteProps {
  note: {
    id: number;
    title: string;
    content: string;
    color: string;
    favorite: boolean;
  };
  onUpdateTitle: (id: number, updatedTitle: string) => void;
  onUpdateContent: (id: number, updatedContent: string) => void;
  onUpdateColor: (id: number, updatedColor: string) => void;
  onToggleFavorite: (id: number, newFavorite: boolean) => void;
  onDelete: (id: number) => void;
}

const Note: React.FC<NoteProps> = ({
  note,
  onUpdateTitle,
  onUpdateContent,
  onUpdateColor,
  onToggleFavorite,
  onDelete,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);
  const [newContent, setNewContent] = useState(note.content);
  const tiptapRef = useRef<HTMLDivElement | null>(null);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedUpdateTitle = useCallback(
    debounce((updatedTitle: string) => {
      onUpdateTitle(note.id, updatedTitle);
    }, 500),
    [note.id, onUpdateTitle],
  );

  const debouncedUpdateContent = useCallback(
    debounce((updatedContent: string) => {
      onUpdateContent(note.id, updatedContent);
    }, 500),
    [note.id, onUpdateContent],
  );

  useEffect(() => {
    if (isEditingTitle) {
      setNewTitle(note.title);
    }
    if (isEditingContent) {
      setNewContent(note.content);
    }
  }, [isEditingTitle, isEditingContent, note.title, note.content]);

  const handleBlurTitle = () => {
    setIsEditingTitle(false);
    if (newTitle !== note.title) {
      debouncedUpdateTitle(newTitle);
    }
  };

  const handleBlurContent = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      tiptapRef.current &&
      tiptapRef.current.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    setIsEditingContent(false);
  };

  useEffect(() => {
    if (!isEditingContent && newContent !== note.content) {
      debouncedUpdateContent(newContent);
    }
  }, [isEditingContent, newContent, note.content, debouncedUpdateContent]);

  const handleShowColors = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowColors((prev) => !prev);
    setIsEditingTitle((prev) => !prev);
    if (isEditingContent) {
      setIsEditingContent(false);
    }
  };

  const handleDeleteModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowModalDelete((prev) => !prev);
  };

  const handleColorChange = (newColor: string) => {
    onUpdateColor(note.id, newColor);
  };

  return (
    <>
      {showModalDelete && (
        <ModalDelete
          handleDeleteModal={handleDeleteModal}
          deleteNote={async () => {
            onDelete(note.id);
          }}
          setShowModalDelete={setShowModalDelete}
          showModalDelete={showModalDelete}
          contentTitle={note.title}
        />
      )}

      <AnimatePresence>
        <motion.div
          key={note.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <section
            className="note_container"
            style={{ background: note.color }}
          >
            <header>
              <input
                placeholder="Título"
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
                type="text"
                value={newTitle || ""}
                onFocus={() => {
                  setIsEditingTitle(true);
                }}
                onBlur={handleBlurTitle}
                style={{ background: note.color }}
              />
              <button
                className="button_fav"
                onClick={() => onToggleFavorite(note.id, !note.favorite)}
              >
                {note.favorite ? <FaStar /> : <FaRegStar />}
              </button>
            </header>

            <div
              className="tiptap_wrap"
              onFocus={() => setIsEditingContent(true)}
              onBlur={handleBlurContent}
              ref={tiptapRef}
            >
              <TipTap
                initialContent={newContent}
                setContent={setNewContent}
                isEditingContent={isEditingContent}
                setIsEditingContent={setIsEditingContent}
              />
            </div>
            <footer>
              <button
                className={`toggle_editing_button ${isEditingTitle || isEditingContent ? "editing" : ""}`}
              >
                <GoPencil />
              </button>
              <button
                className="colors_button"
                onClick={(e) => {
                  handleShowColors(e);
                }}
              >
                <IoColorFillOutline />
              </button>
              {showColors && (
                <div className="modal_colors_container">
                  <ModalColors
                    setShowColors={setShowColors}
                    setColor={handleColorChange}
                    showColors={showColors}
                    handleShowColors={handleShowColors}
                  />
                </div>
              )}

              <button
                className="delete_button"
                onClick={(e) => {
                  handleDeleteModal(e);
                }}
              >
                <RxCross2 />
              </button>
            </footer>
          </section>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Note;
