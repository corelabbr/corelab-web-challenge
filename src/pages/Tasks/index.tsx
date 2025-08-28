import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Tasks.module.scss";
import type { Task, TaskInput } from "../../types/Task";
import TaskCard from "../../components/TaskCard";
import TaskComposer from "../../components/TaskComposer";
import { listTasks, createTask, updateTask, deleteTask } from "../../lib/api";

const sortFav = (a: Task, b: Task) =>
  Number(b.isFavorite) - Number(a.isFavorite);

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await listTasks();
      setTasks([...data].sort(sortFav));
    } catch (e: any) {
      setError(e?.message ?? "Erro ao carregar tarefas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onCreate = async (payload: TaskInput) => {
    try {
      setError("");
      const created = await createTask(payload);
      setTasks((prev) => [created, ...prev].sort(sortFav));
    } catch (e: any) {
      setError(e?.message ?? "Erro ao criar");
    }
  };

  const onToggleFavorite = async (t: Task) => {
    const nextFav = !t.isFavorite;

    setTasks((prev) =>
      prev
        .map((it) => (it.id === t.id ? { ...it, isFavorite: nextFav } : it))
        .sort(sortFav)
    );

    try {
      setError("");
      const updated = await updateTask(t.id, { isFavorite: nextFav });
      setTasks((prev) =>
        prev.map((it) => (it.id === t.id ? updated : it)).sort(sortFav)
      );
    } catch (e: any) {
      setError(e?.message ?? "Erro ao favoritar");
      setTasks((prev) =>
        prev
          .map((it) =>
            it.id === t.id ? { ...it, isFavorite: t.isFavorite } : it
          )
          .sort(sortFav)
      );
    }
  };

  const onSave = async (id: number, patch: Partial<TaskInput>) => {
    const snapshot = tasks;
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? ({ ...t, ...patch } as Task) : t))
    );

    try {
      setError("");
      const updated = await updateTask(id, patch);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updated : t)).sort(sortFav)
      );
    } catch (e: any) {
      setError(e?.message ?? "Erro ao salvar edição");
      setTasks(snapshot);
    }
  };

  const onDelete = async (id: number) => {
    const snapshot = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      setError("");
      await deleteTask(id);
    } catch (e: any) {
      setError(e?.message ?? "Erro ao excluir");
      setTasks(snapshot);
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter((t) => {
      const title = (t.title || "").toLowerCase();
      const desc = (t.description || "").toLowerCase();
      return title.includes(q) || desc.includes(q);
    });
  }, [tasks, search]);

  const favorites = useMemo(
    () => filtered.filter((t) => t.isFavorite),
    [filtered]
  );
  const others = useMemo(
    () => filtered.filter((t) => !t.isFavorite),
    [filtered]
  );
  const empty = useMemo(
    () => !loading && filtered.length === 0,
    [loading, filtered]
  );

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <h1 className={styles.title}>Core Notes</h1>
        <div className={styles.search}>
          <span className={styles.searchIcon}>🔎</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            aria-label="Search notes"
          />
        </div>
      </div>

      <TaskComposer onCreate={onCreate} />

      {error && (
        <div role="alert" className={styles.alert}>
          {error}
        </div>
      )}
      {loading && <div>Carregando…</div>}

      {favorites.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Favorites</h2>
          <div className={styles.grid}>
            {favorites.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onToggleFavorite={onToggleFavorite}
                onDelete={onDelete}
                onSave={onSave}
              />
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Others</h2>
        <div className={styles.grid}>
          {others.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onToggleFavorite={onToggleFavorite}
              onDelete={onDelete}
              onSave={onSave}
            />
          ))}
        </div>
      </section>

      {empty && <div>Nenhuma nota encontrada.</div>}
    </div>
  );
}
