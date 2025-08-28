import React, { MouseEvent, useEffect, useState } from "react";
import styles from "./TaskCard.module.scss";
import type { Task, TaskColor } from "../../types/Task";

const COLORS: TaskColor[] = ["yellow", "blue", "green", "peach"];

type Props = {
  task: Task;
  onToggleFavorite: (task: Task) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onSave: (
    id: number,
    patch: Partial<Pick<Task, "title" | "description" | "color" | "isFavorite">>
  ) => Promise<void>;
};

export default function TaskCard({
  task,
  onToggleFavorite,
  onDelete,
  onSave,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [color, setColor] = useState<TaskColor>(task.color);
  const [showPalette, setShowPalette] = useState(false);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description ?? "");
    setColor(task.color);
  }, [task.id, task.title, task.description, task.color]);

  const save = async (e?: MouseEvent) => {
    e?.stopPropagation();
    if (busy) return;

    const t = title.trim();
    const d = description.trim();

    const patch: Partial<Pick<Task, "title" | "description" | "color">> = {
      color,
    };
    if (t) patch.title = t;
    if (d || task.description) patch.description = d || undefined;

    try {
      setBusy(true);
      await onSave(task.id, patch);
      setEditing(false);
      setShowPalette(false);
    } finally {
      setBusy(false);
    }
  };

  const cancel = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (busy) return;
    setTitle(task.title);
    setDescription(task.description ?? "");
    setColor(task.color);
    setEditing(false);
    setShowPalette(false);
  };

  const del = async (e: MouseEvent) => {
    e.stopPropagation();
    if (!busy) await onDelete(task.id);
  };
  const toggleFav = async (e: MouseEvent) => {
    e.stopPropagation();
    if (!busy) await onToggleFavorite(task);
  };

  const colorClass = styles[`${color}Bg`] ?? styles.yellowBg;

  return (
    <div
      className={`${styles.note} ${colorClass} ${
        editing ? styles.editing : ""
      }`}
      onClick={() => !editing && setEditing(true)}
      role="button"
      tabIndex={0}
    >
      <button
        type="button"
        className={`${styles.star} ${task.isFavorite ? styles.active : ""}`}
        onClick={toggleFav}
        title="Favoritar"
        aria-label={
          task.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
        }
      >
        ★
      </button>

      {!editing ? (
        <>
          <div className={styles.title}>{title}</div>
          <div className={styles.content}>{description}</div>
        </>
      ) : (
        <>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />

          <div
            className={styles.bottomBar}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.leftActions}>
              <div className={styles.paletteWrapper}>
                <button
                  type="button"
                  className={styles.iconBtn}
                  title="Change color"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPalette((v) => !v);
                  }}
                >
                  🎨
                </button>
                {showPalette && (
                  <div className={styles.palette}>
                    {COLORS.map((c) => (
                      <button
                        type="button"
                        key={c}
                        className={`${styles.swatch} ${styles[c]}`}
                        onClick={(e) => {
                          e.stopPropagation();
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
                type="button"
                className={styles.iconBtn}
                title="Delete"
                onClick={del}
                aria-label="Delete"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                  <path d="M10 11v6"></path>
                  <path d="M14 11v6"></path>
                  <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>

            <div className={styles.rightActions}>
              <button
                type="button"
                className={styles.linkBtn}
                onClick={cancel}
                disabled={busy}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.saveBtn}
                onClick={save}
                disabled={busy}
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
