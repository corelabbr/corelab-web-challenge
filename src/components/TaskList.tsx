import { useState } from "react";
import { type Task } from "../types/Task";
import { formatDate } from "../utils/dateFormatter";
import { PRIORITY_MAP } from "../constants/priorities";
import FavoriteButton from "./FavoriteButton";

interface TaskListProps {
  tasks: Task[];
  onToggleFavorite: (taskId: string, currentFavorite: boolean) => void;
  onToggleComplete: (taskId: string, currentComplete: boolean) => void;
  onOpenModal: (task: Task) => void;
}

function TaskList({
  tasks,
  onToggleFavorite,
  onToggleComplete,
  onOpenModal,
}: TaskListProps) {
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());

  const handleToggleFavorite = async (taskId: string, isFavorite: boolean) => {
    setLoadingItems((prev) => new Set(prev).add(taskId));
    await onToggleFavorite(taskId, isFavorite);
    setLoadingItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(taskId);
      return newSet;
    });
  };

  const handleToggleComplete = async (
    taskId: string,
    currentComplete: boolean
  ) => {
    setLoadingItems((prev) => new Set(prev).add(taskId));
    await onToggleComplete(taskId, currentComplete);
    setLoadingItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(taskId);
      return newSet;
    });
  };

  if (tasks.length === 0) {
    return <p>No tasks found</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => {
        const priority = PRIORITY_MAP[task.color || 0];
        const isLoading = loadingItems.has(task._id);

        return (
          <div
            key={task._id}
            className={`task-item ${task.complete ? "complete" : ""} ${
              isLoading ? "loading" : ""
            }`}
            style={{
              backgroundColor: priority.bgColor,
              borderLeftColor: priority.color,
            }}
            onClick={() => !isLoading && onOpenModal(task)}
          >
            <input
              type="checkbox"
              checked={task.complete || false}
              onChange={(e) => {
                e.stopPropagation();
                handleToggleComplete(task._id, task.complete || false);
              }}
              onClick={(e) => e.stopPropagation()}
              className="task-checkbox"
              disabled={isLoading}
            />

            <h3 className="task-name">{task.name}</h3>

            <div onClick={(e) => e.stopPropagation()}>
              <FavoriteButton
                isFavorite={task.favorite || false}
                onChange={(isFavorite) =>
                  handleToggleFavorite(task._id, isFavorite)
                }
                size={28}
                className="task-favorite"
                disabled={isLoading}
              />
            </div>

            <span className="task-date">{formatDate(task.startDate)}</span>

            {isLoading && (
              <div className="task-loading-overlay">
                <div className="loading-spinner"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;
