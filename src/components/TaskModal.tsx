import { useState, useEffect } from "react";
import { taskService } from "../services/api";
import { type Task } from "../types/Task";
import { formatDate } from "../utils/dateFormatter";
import PriorityDropdown from "./PriorityDropdown";
import { PRIORITY_MAP } from "../constants/priorities";
import FavoriteButton from "./FavoriteButton";

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: () => void;
  onDelete: (taskId: string) => void;
}

function TaskModal({ task, onClose, onUpdate, onDelete }: TaskModalProps) {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description || "");
  const [color, setColor] = useState(task.color || 0);
  const [isFavorite, setIsFavorite] = useState(task.favorite || false);
  const [isComplete, setIsComplete] = useState(task.complete || false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentPriority = PRIORITY_MAP[task.color || 0];

  useEffect(() => {
    if (!isEditing) {
      setName(task.name);
      setDescription(task.description || "");
      setColor(task.color || 0);
      setIsFavorite(task.favorite || false);
      setIsComplete(task.complete || false);
    }
  }, [task, isEditing]);

  const handleInputChange = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await taskService.updateTask(task._id, {
        name,
        description,
        color,
        favorite: isFavorite,
        complete: isComplete,
      });
      setIsEditing(false);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      setIsDeleting(true);
      try {
        await onDelete(task._id);
      } catch (error) {
        console.error("Error deleting task:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div
          className="modal-header"
          style={{
            backgroundColor: currentPriority.bgColor,
            color: currentPriority.textColor,
          }}
        >
          <div className="modal-actions-top">
            <label className="modal-checkbox">
              <input
                type="checkbox"
                checked={isComplete}
                onChange={(e) => {
                  setIsComplete(e.target.checked);
                  handleInputChange();
                }}
              />
            </label>

            <FavoriteButton
              isFavorite={isFavorite}
              onChange={(value) => {
                setIsFavorite(value);
                handleInputChange();
              }}
              size={32}
              className="modal-favorite"
            />
          </div>

          <div className="task-dates">
            <div className="date-info">
              <span className="date-label">Criada em:</span>
              <span className="date-value">
                {formatDate(task.startDate.toString())}
              </span>
            </div>
            {task.endDate && (
              <div className="date-info">
                <span className="date-label">Concluída em:</span>
                <span className="date-value">
                  {formatDate(task.endDate.toString())}
                </span>
              </div>
            )}
          </div>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  handleInputChange();
                }}
                required
              />
            </div>

            <div className="form-group">
              <label>Descrição:</label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  handleInputChange();
                }}
                placeholder="Adicione uma descrição detalhada..."
              />
            </div>

            <div className="form-group">
              <label>Prioridade:</label>
              <PriorityDropdown
                value={color}
                onChange={(value) => {
                  setColor(value);
                  handleInputChange();
                }}
                className="priority-dropdown-modal"
              />
            </div>

            <div className="modal-actions-bottom">
              <button type="submit" className="btn btn-primary">
                💾 {isEditing ? "Salvar" : "Fechar"}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-delete"
                disabled={isDeleting}
              >
                {isDeleting ? "🔄 Excluindo..." : "🗑️ Excluir"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
