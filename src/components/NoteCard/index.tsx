import { useState } from "react";
import { Note } from "../../types";

const colorPickerOptions = [
  "#BAE2FF",
  "#B9FFDD",
  "#FFE8AC",
  "#FFCAB9",
  "#F99494",
  "#9DD6FF",
  "#ECA1FF",
  "#DAFF8B",
  "#FFA285",
  "#CDCDCD",
  "#979797",
  "#A99A7C",
];

type NoteCardProps = {
  note: Note;
  onFavoriteClick: (note: Note) => void;
  onConfirmEditClick: (updatedNote: Note) => void;
  onDeleteClick: (id: string) => void;
  onColorClick: (color: string) => void;
};

export default function NoteCard({
  note,
  onFavoriteClick,
  onConfirmEditClick,
  onDeleteClick,
  onColorClick,
}: NoteCardProps) {
  const { _id, color, isFavorite } = note;

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const isNoteEdited = title !== note.title || text !== note.text;

  function handleFavoriteClick() {
    onFavoriteClick({ ...note });
  }

  function handleConfirmEditClick() {
    onConfirmEditClick({
      ...note,
      title,
      text,
    });
  }

  function handleDeleteClick() {
    onDeleteClick(_id);
  }

  return (
    <div className="note-card" style={{ backgroundColor: color }}>
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <div className="note-card__header">
          <input
            className="card-input"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button className="button" onClick={handleFavoriteClick}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Favorito</title>
              <path
                d="M7.47998 7.50375L2.32617 8.29666L6.88529 11.9638L5.69595 17.5141L9.85865 14.3425L15.0125 17.5141L13.6249 11.9638L17.4903 8.29666L12.2373 7.50375L9.85865 2.34995L7.47998 7.50375Z"
                fill={isFavorite ? "#FFA000" : "none"}
              />
              <path
                d="M9.93823 13.7112L6.29995 15.9077L7.25791 11.7662L4.04538 8.97947L8.28359 8.62145L9.93823 4.71223L11.5929 8.62145L15.8311 8.97947L12.6186 11.7662L13.5765 15.9077M19.6145 7.76026L12.6573 7.17001L9.93823 0.754639L7.2192 7.17001L0.261963 7.76026L5.53553 12.3371L3.9583 19.1396L9.93823 15.5303L15.9182 19.1396L14.3313 12.3371L19.6145 7.76026Z"
                fill="#455A64"
              />
            </svg>
          </button>
        </div>

        <hr
          style={{
            borderTop: `1px solid ${color === "#fff" ? "#000" : "#fff"}`,
          }}
        />

        <div className="note-card__body">
          <textarea
            className="card-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>

      <div className="note-card__footer">
        <div
          className="note-card__footer-left-section"
          style={{ position: "relative" }}
        >
          <button
            className="button"
            onClick={handleConfirmEditClick}
            disabled={isNoteEdited}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Confirmar edição</title>
              <path
                d="M10.9443 6.16667L11.8321 7.05444L3.25656 15.6111H2.38767V14.7422L10.9443 6.16667ZM14.3443 0.5C14.1082 0.5 13.8627 0.594444 13.6832 0.773889L11.9549 2.50222L15.4966 6.04389L17.2249 4.31556C17.5932 3.94722 17.5932 3.33333 17.2249 2.98389L15.0149 0.773889C14.826 0.585 14.5899 0.5 14.3443 0.5ZM10.9443 3.51278L0.498779 13.9583V17.5H4.04045L14.486 7.05444L10.9443 3.51278Z"
                fill={isNoteEdited ? "#51646E" : "#bbb"}
              />
            </svg>
          </button>

          <button
            className="button"
            style={{
              backgroundColor: `${
                isColorPickerOpen ? "#FFE3B3" : "transparent"
              }`,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
            onClick={() => setIsColorPickerOpen((prev) => !prev)}
          >
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Selecionar cor</title>
              <path
                d="M16.4957 11.5468C16.4957 11.5468 14.4957 13.7168 14.4957 15.0468C14.4957 15.5772 14.7064 16.086 15.0815 16.461C15.4565 16.8361 15.9652 17.0468 16.4957 17.0468C17.0261 17.0468 17.5348 16.8361 17.9099 16.461C18.285 16.086 18.4957 15.5772 18.4957 15.0468C18.4957 13.7168 16.4957 11.5468 16.4957 11.5468ZM2.70566 10.0468L7.49566 5.25681L12.2857 10.0468M14.0557 8.98681L5.11566 0.046814L3.70566 1.45681L6.08566 3.83681L0.935664 8.98681C0.345664 9.54681 0.345664 10.5168 0.935664 11.1068L6.43566 16.6068C6.72566 16.8968 7.11566 17.0468 7.49566 17.0468C7.87566 17.0468 8.26566 16.8968 8.55566 16.6068L14.0557 11.1068C14.6457 10.5168 14.6457 9.54681 14.0557 8.98681Z"
                fill="#51646E"
              />
              <path
                d="M7.56462 15.0439L2.73462 10H12.302L7.56462 15.0439Z"
                fill="#FFA000"
              />
            </svg>
          </button>
          {isColorPickerOpen && (
            <div className="color-picker">
              {colorPickerOptions.map((color) => (
                <button
                  key={color}
                  className="button"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: color,
                  }}
                  onClick={() => {
                    onColorClick(color === note.color ? "#fff" : color);
                    setIsColorPickerOpen(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <button className="button" onClick={handleDeleteClick}>
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Remover</title>
            <path
              d="M13.6146 2.29924L12.2909 0.975616L7.04337 6.22319L1.7958 0.975616L0.472168 2.29924L5.71974 7.54682L0.472168 12.7944L1.7958 14.118L7.04337 8.87045L12.2909 14.118L13.6146 12.7944L8.367 7.54682L13.6146 2.29924Z"
              fill="#51646E"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
