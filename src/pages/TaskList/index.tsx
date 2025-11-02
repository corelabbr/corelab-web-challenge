import { useEffect, useState } from "react";
import { Card } from "../../components";
import styles from "./Tasks.module.scss";
import { useTasks } from "../../contexts/TasksContext";

const TasksList = () => {
  const { tasks, loading, error, fetchTasks } = useTasks();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks(page, 10, "");
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.Tasks}>
      <div>
        <Card type="create" />
      </div>
      <div className={styles.cards}>
        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </div>
      {tasks.length >= 10 && (
        <div className={styles.pagination}>
          <button
            name="previous"
            className={styles.previous}
            style={{
              display: page === 1 ? "none" : "block",
              marginRight: "8px",
            }}
            onClick={() => setPage((prev: number) => Math.max(1, prev - 1))}
            title="Página anterior"
          >
            Anterior
          </button>
          <p>Página {page}</p>
          <button
            name="next"
            className={styles.next}
            onClick={() => setPage((prev: number) => prev + 1)}
            style={{
              display: tasks.length < 10 ? "none" : "block",
              marginLeft: "8px",
            }}
            title="Próxima página"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export default TasksList;
