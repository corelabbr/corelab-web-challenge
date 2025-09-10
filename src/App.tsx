import React, { useState, useEffect } from "react";
import { taskService } from "./services/api";
import TaskCard from "./components/TaskCard";
import AddTodoForm from "./components/AddTaskForm";
import FilterBar from "./components/FilterBar";
import { Button } from "./components/ui/button";
import { Plus, X } from "lucide-react";
import "./App.css";

import { Task, TaskData } from "./types";

function App(){
  const [task, setTask] = useState<Task[]>([]);
  const [filteredTask, setFilteredTask] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [filters, setFilters] = useState<{
    favorite: boolean;
    color: string;
  }>({
    favorite: false,
    color: "",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    loadTask();
  }, []);

  useEffect(() => {
    let filtered = [...task];

    if (filters.favorite) {
      filtered = filtered.filter((t) => t.isFavorite);
    }

    if (filters.color) {
      filtered = filtered.filter((t) => t.color === filters.color);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (t.description &&
            t.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    filtered.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setFilteredTask(filtered);
  }, [task, filters, searchTerm]);

  const loadTask = async (): Promise<void> => {
    try {
      setLoading(true);
      const data: Task[] = await taskService.getAllTasks();
      setTask(data);
      setError(null);
    } catch (err: any) {
      setError("Erro ao carregar as tarefas");
      console.error("Erro ao carregar tarefa:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData: TaskData): Promise<void> => {
    try {
      const newTask: Task = await taskService.createTask(taskData);
      setTask((prev) => [newTask, ...prev]);
      setShowAddForm(false);
    } catch (err: any) {
      setError("Erro ao criar tarefa");
      console.error("Erro ao criar tarefa:", err);
    }
  };

  const handleUpdateTask = async (id: string, taskData: Partial<Task>): Promise<void> => {
    try {
      const updatedTask: Task = await taskService.updateTask(id, taskData);
      setTask((prev) =>
        prev.map((t) => (t._id === id ? updatedTask : t))
      );
    } catch (err: any) {
      setError("Erro ao atualizar tarefa");
      console.error("Erro ao atualizar tarefa:", err);
    }
  };

  const handleDeleteTask = async (id: string): Promise<void> => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      try {
        await taskService.deleteTask(id);
        setTask((prev) => prev.filter((t) => t._id !== id));
      } catch (err: any) {
        setError("Erro ao excluir tarefa");
        console.error("Erro ao excluir tarefa:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Core Notes</h1>
          <p className="text-gray-600">
            Organize suas tarefas de forma simples e eficiente
          </p>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="text-center mb-6">
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="mb-4"
            size="lg"
          >
            {showAddForm ? (
              <>
                <X className="w-5 h-5 mr-2" />
                Cancelar
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Nova Tarefa
              </>
            )}
          </Button>
        </div>

        {showAddForm && (
          <div className="flex justify-center mb-8">
            <AddTodoForm onAdd={handleAddTask} />
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          {filteredTask.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {task.length === 0
                  ? "Nenhuma tarefa encontrada. Crie sua primeira tarefa!"
                  : "Nenhuma tarefa corresponde aos filtros aplicados."}
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              <div>
                <h2 className="text-xl font-semibold mb-4">Favoritos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredTask.filter((t) => t.isFavorite).length > 0 ? (
                    filteredTask
                      .filter((t) => t.isFavorite)
                      .map((t) => (
                        <TaskCard
                          key={t._id}
                          task={t}
                          onUpdate={handleUpdateTask}
                          onDelete={handleDeleteTask}
                        />
                      ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Nenhuma tarefa favorita
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Outros</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredTask.filter((t) => !t.isFavorite).length > 0 ? (
                    filteredTask
                      .filter((t) => !t.isFavorite)
                      .map((t) => (
                        <TaskCard
                          key={t._id}
                          task={t}
                          onUpdate={handleUpdateTask}
                          onDelete={handleDeleteTask}
                        />
                      ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Nenhuma outra tarefa
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;