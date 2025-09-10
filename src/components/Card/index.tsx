import React, { useState, useRef } from "react";
import styles from "./Card.module.scss";
import { Trash2, Palette, Star } from "lucide-react";
import { CardType } from "../../types/CardType";
import { updateCard, deleteCard } from "../../lib/api";

const favorteEdit = async (card: CardType, reloadCards: Function) => {
  card.is_favorite = !card.is_favorite ? 1 : 0;
  await updateCard(card.id, card);
  await reloadCards();
};

const Card = ({
  card,
  reloadCards,
}: {
  card: CardType;
  reloadCards: Function;
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const colorRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState("#8d3535ff");

  const setupEditMode = (title: string, note: string) => {
    setEditMode(true);
    setTitle(title);
    setNote(note);
  };

  const cardEdit = async (card: CardType, reloadCards: Function) => {
    card.title = title;
    card.note = note;
    await updateCard(card.id, card);
    await reloadCards();
    setEditMode(false);
  };

  const handleClick = () => {
    colorRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    card.color = e.target.value;
  };

  return (
    <div className={styles.Card} style={{ backgroundColor: `${card.color}` }}>
      <div className={styles.upperCard}>
        {editMode ? (
          <div className={styles.content}>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              name=""
              id=""
              placeholder="Title"
            />
            <textarea
              onChange={(e) => setNote(e.target.value)}
              value={note}
              name=""
              id=""
              placeholder="Take a note..."
            />
          </div>
        ) : (
          <div
            onClick={() => setupEditMode(card.title, card.note)}
            className={styles.content}
          >
            <p>{card.title}</p>
            <textarea
              value={card.note}
              name=""
              id=""
              readOnly
              placeholder="Take a note..."
            />
          </div>
        )}
        <button>
          <Star
            fill={card.is_favorite ? "#f5e067" : "none"}
            color={card.is_favorite ? "#f5e067" : "#b9c5cb"}
            onClick={() => void favorteEdit(card, reloadCards)}
          />
        </button>
      </div>

      {editMode ? (
        <div className={styles.bottomBar}>
          <div className={styles.buttonsBar}>
            <div className={styles.iconButtons}>
              <button onClick={handleClick}>
                <Palette strokeWidth={1.75} />
              </button>

              <input
                type="color"
                ref={colorRef}
                value={color}
                onChange={handleChange}
                style={{ visibility: "hidden", width: "0", height: "0" }}
              />
              <button color="red">
                <Trash2
                  color="#d4183d"
                  strokeWidth={1.25}
                  onClick={() => {
                    void deleteCard(card, reloadCards);
                  }}
                />
              </button>
            </div>
            <div className={styles.saveButtons}>
              <button
                className={styles.cancel}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
              <button
                className={styles.save}
                onClick={() => cardEdit(card, reloadCards)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Card;
