import { useTask } from "../hooks/useTask";
import { CreateTaskForm } from "./CreateTaskForm";
import { ListTasks } from "./ListTasks";

export function Dashboard() {
  const { tasksQuery } = useTask();

  const favoriteTasks = tasksQuery.data?.favoriteTasks || [];
  const othersTasks = tasksQuery.data?.othersTasks || [];

  return (
    <section className="p-16 max-md:p-4 flex items-center flex-col gap-6 max-md:gap-4">
      <div className="w-full flex justify-center items-center">
        <CreateTaskForm />
      </div>

      <h2 className="text-xl font-light text-center">Favoritos</h2>

      {favoriteTasks.length === 0 ? (
        <div className="text-center text-xl font-medium my-8">
          Nenhuma tarefa foi adicionada aos seus favoritos
        </div>
      ) : (
        <ListTasks tasks={favoriteTasks} />
      )}

      <h2 className="text-xl font-light text-center">Outras</h2>

      {othersTasks.length === 0 ? (
        <div className="text-center text-xl font-medium my-8">
          Nenhuma tarefa foi adicionada
        </div>
      ) : (
        <ListTasks tasks={othersTasks} />
      )}
    </section>
  );
}
