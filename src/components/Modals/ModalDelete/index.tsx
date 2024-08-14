import { useEffect, useRef } from "react";
import { RiCloseLine } from "react-icons/ri";

import "./styles.scss";

interface DeleteProps {
  handleDeleteModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setShowModalDelete: (content: boolean) => void;
  deleteNote: () => Promise<void>;
  showModalDelete: boolean;
  contentTitle: string;
}

export default function ModalDelete({
  handleDeleteModal,
  setShowModalDelete,
  showModalDelete,
  deleteNote,
  contentTitle,
}: DeleteProps) {
  const colorsModalRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (
      colorsModalRef.current &&
      !colorsModalRef.current.contains(event.target as Node)
    ) {
      setShowModalDelete(false);
    }
  }

  useEffect(() => {
    if (showModalDelete) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModalDelete]);

  return (
    <div className="container_modal">
      <div className="delete_modal" ref={colorsModalRef}>
        <button
          className="button_close"
          onClick={(e) => {
            handleDeleteModal(e);
          }}
        >
          <RiCloseLine />
        </button>
        <div className="wrap_text">
          <p>
            Tem certeza que deseja excluir <br />
            <strong>{contentTitle}</strong>?
          </p>
        </div>
        <div className="wrap_buttons">
          <button className="option_yes" onClick={deleteNote}>
            sim
          </button>
          <button
            className="option_no"
            onClick={(e) => {
              handleDeleteModal(e);
            }}
          >
            não
          </button>
        </div>
      </div>
    </div>
  );
}
