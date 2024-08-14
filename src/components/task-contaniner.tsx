
import { Task } from "./task";

interface InotesContainerProps {
  notes: ITask[];
  legend: string;
}
export function TaskContainer({ notes, legend }: InotesContainerProps) {
  return (
    <>
      <h2 className="font-bold mb-4 mt-6">{legend}</h2>
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 place-items-center lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {notes.map((note) => (
            <Task key={note.id} task={note} />
          ))}
        </div>
      ) : (
        <p>{"📝Sem 'Task' Disponível."}</p>
      )}
    </>
  );
}
