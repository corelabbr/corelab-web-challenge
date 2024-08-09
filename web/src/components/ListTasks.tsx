import { Task } from "../types";
import { TaskCard } from "./TaskCard";

export function ListTasks({ tasks }: { tasks: Task[] }) {
  return (
    <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-md:grid-cols-1 w-full gap-8 justify-between place-items-center mb-8">
      {tasks.map((item) => (
        <TaskCard
          key={item.id}
          task={item}
        />
      ))}
    </div>
  );
}
