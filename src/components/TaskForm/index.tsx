import React, { useState } from "react";
import styles from "./TaskForm.module.scss";
import type { TaskInput } from "../../types/Task";

type Props = { onCreate: (payload: TaskInput) => Promise<void> };

export default function TaskForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = title.trim();
    if (!val) return;
    await onCreate({ title: val });
    setTitle("");
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <input
        className={styles.inputLarge}
        placeholder="Take a note..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
}
