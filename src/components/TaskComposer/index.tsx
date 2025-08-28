import React, { useState } from "react";
import styles from "./TaskComposer.module.scss";
import type { TaskColor, TaskInput } from "../../types/Task";

const COLORS: TaskColor[] = ["yellow", "blue", "green", "peach"];

type Props = { onCreate: (payload: TaskInput) => Promise<void> };

export default function TaskComposer({ onCreate }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<TaskColor>("yellow");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  const cancel = () => {
    setTitle("");
    setDescription("");
    setColor("yellow");
    setIsFavorite(false);
    setShowPalette(false);
    setExpanded(false);
  };

  const save = async () => {
    const t = title.trim();
    const d = description.trim();
    if (!t && !d) return;
    await onCreate({
      title: t || "Untitled",
      description: d || undefined,
      color,
      isFavorite,
    });
    cancel();
  };

  if (!expanded) {
    return (
      <div
        className={styles.collapsed}
        onClick={() => setExpanded(true)}
        role="button"
        tabIndex={0}
      >
        <input
          className={styles.collapsedInput}
          placeholder="Take a note..."
          readOnly
        />
      </div>
    );
  }

  return (
    <div className={styles.composer}>
      <input
        className={styles.title}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={styles.textarea}
        placeholder="Take a note..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className={styles.actionsBar}>
        <div className={styles.leftActions}>
          <div className={styles.paletteWrapper}>
            <button
              className={styles.iconBtn}
              title="Change color"
              onClick={() => setShowPalette((v) => !v)}
            >
              🎨
            </button>
            {showPalette && (
              <div className={styles.palette}>
                {COLORS.map((c) => (
                  <button
                    key={c}
                    className={`${styles.swatch} ${styles[c]}`}
                    onClick={() => {
                      setColor(c);
                      setShowPalette(false);
                    }}
                    title={c}
                  />
                ))}
              </div>
            )}
          </div>

          <button
            className={`${styles.iconBtn} ${
              isFavorite ? styles.starActive : ""
            }`}
            title={isFavorite ? "Unfavorite" : "Favorite"}
            onClick={() => setIsFavorite((v) => !v)}
          >
            ★
          </button>
        </div>

        <div className={styles.rightActions}>
          <button className={styles.linkBtn} onClick={cancel}>
            Cancel
          </button>
          <button className={styles.saveBtn} onClick={save}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
