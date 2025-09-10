import { useState } from "react";
import { type Task } from "../types/Task";
import PriorityDropdown from "./PriorityDropdown";
import FavoriteButton from "./FavoriteButton";

interface TaskFormProps {
  onTaskCreated: (task: Omit<Task, "_id" | "__v">) => void;
}

function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [name, setName] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Por favor, preencha o nome da tarefa");
      return;
    }

    if (name.trim().length > 100) {
      setError("O nome deve ter no máximo 100 caracteres");
      return;
    }

    setError(null);

    const newTaskData: Omit<Task, "_id" | "__v"> = {
      name: name.trim(),
      color: selectedColor,
      favorite: isFavorite,
      description: "",
      complete: false,
      startDate: new Date(),
      endDate: null,
    };

    onTaskCreated(newTaskData);
    setName("");
    setIsFavorite(false);
    setSelectedColor(0);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) {
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form-horizontal">
      <div className="form-group-horizontal input-with-favorite">
        <input
          type="text"
          placeholder="Nome da Tarefa"
          value={name}
          onChange={handleNameChange}
          className="task-input"
          style={{ borderColor: error ? "#ff4757" : "" }}
          required
        />
        <FavoriteButton
          isFavorite={isFavorite}
          onChange={setIsFavorite}
          size={28}
          className="favorite-in-input"
        />

        {error && (
          <div
            style={{
              position: "absolute",
              top: "-40px",
              left: "0",
              background: "#ff4757",
              color: "white",
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontWeight: "500",
              zIndex: 1000,
              whiteSpace: "nowrap",
            }}
          >
            {error}
            <div
              style={{
                position: "absolute",
                bottom: "-8px",
                left: "12px",
                width: "0",
                height: "0",
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "8px solid #ff4757",
              }}
            ></div>
          </div>
        )}
      </div>

      <div className="form-group-horizontal">
        <PriorityDropdown
          value={selectedColor}
          onChange={setSelectedColor}
          className="priority-dropdown-form"
        />
      </div>

      <div className="form-group-horizontal">
        <button type="submit" className="add-btn">
          Criar
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
