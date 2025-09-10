import { useEffect, useState } from "react";
import { type Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import TaskFilters from "./components/TaskFilters";
import { taskService } from "./services/api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentFilters, setCurrentFilters] = useState<{
    favorite?: boolean;
    color?: number;
  }>(() => {
    const savedFilters = localStorage.getItem("taskFilters");
    return savedFilters ? JSON.parse(savedFilters) : {};
  });

  const loadTasks = async (filters?: {
    favorite?: boolean;
    color?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const tasksData: Task[] = await taskService.getAllTasks(filters);
      setTasks(tasksData);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      console.error("Error loading tasks:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("taskFilters", JSON.stringify(currentFilters));
    loadTasks(currentFilters);
  }, [currentFilters]);

  const handleFilter = (filters: { favorite?: boolean; color?: number }) => {
    setCurrentFilters(filters);
  };

  const handleClearFilters = () => {
    setCurrentFilters({});
  };

  const handleTaskCreated = async (newTaskData: Omit<Task, "_id" | "__v">) => {
    try {
      await taskService.createTask(newTaskData);
      await loadTasks(currentFilters);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create task";
      setError(errorMessage);
      console.error("Error creating task:", errorMessage);
    }
  };

  const handleToggleFavorite = async (
    taskId: string,
    newFavoriteValue: boolean
  ) => {
    const previousTasks = [...tasks];

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, favorite: newFavoriteValue } : task
      )
    );

    try {
      await taskService.updateTask(taskId, {
        favorite: newFavoriteValue,
      });

      const orderedTasks: Task[] = await taskService.getAllTasks(
        currentFilters
      );
      setTasks(orderedTasks);
    } catch (error) {
      setTasks(previousTasks);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update task";
      setError(errorMessage);
      console.error("Error updating task:", errorMessage);
    }
  };

  const handleToggleComplete = async (
    taskId: string,
    currentComplete: boolean
  ) => {
    const previousTasks = [...tasks];
    const newCompleteValue = !currentComplete;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId
          ? {
              ...task,
              complete: newCompleteValue,
              endDate: newCompleteValue ? new Date() : null,
            }
          : task
      )
    );

    try {
      await taskService.updateTask(taskId, {
        complete: newCompleteValue,
      });

      const orderedTasks: Task[] = await taskService.getAllTasks(
        currentFilters
      );
      setTasks(orderedTasks);
    } catch (error) {
      setTasks(previousTasks);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update task";
      setError(errorMessage);
      console.error("Error updating task:", errorMessage);
    }
  };

  const handleOpenModal = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleDeleteTask = async (taskId: string) => {
    const previousTasks = [...tasks];

    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

    try {
      await taskService.deleteTask(taskId);
      handleCloseModal();

      const orderedTasks: Task[] = await taskService.getAllTasks(
        currentFilters
      );
      setTasks(orderedTasks);
    } catch (error) {
      setTasks(previousTasks);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete task";
      setError(errorMessage);
      console.error("Error deleting task:", errorMessage);
    }
  };

  if (loading) return <div className="loading">Loading Tasks</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📋 Painel de Tarefas</h1>
        <p>Organize suas atividades diárias</p>
      </header>

      <TaskForm onTaskCreated={handleTaskCreated} />

      <TaskFilters
        onFilter={handleFilter}
        onClear={handleClearFilters}
        currentFilters={currentFilters}
      />

      <TaskList
        tasks={tasks}
        onToggleFavorite={handleToggleFavorite}
        onToggleComplete={handleToggleComplete}
        onOpenModal={handleOpenModal}
      />

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={handleCloseModal}
          onUpdate={() => loadTasks(currentFilters)}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default App;
