'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task, CreateTaskDto, UpdateTaskDto, TaskFilters, TaskStatus } from '@/types/task';
import { taskService } from '@/services/api';
import TaskForm from '@/components/TaskForm';
import TaskItem from '@/components/TaskItem';
import TaskFiltersComponent from '@/components/TaskFilters';
import Loading from '@/components/Loading';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AlertCircle } from 'lucide-react';
// CSS global já é importado em layout.tsx

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({});

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getTasks(filters);
      setTasks(data);
    } catch (err) {
      setError('Erro ao carregar tarefas. Verifique sua conexão.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleCreateTask = async (data: CreateTaskDto) => {
    try {
      const newTask = await taskService.createTask(data);
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      console.error('Error creating task:', err);
      throw err;
    }
  };

  const handleUpdateTask = async (id: string, data: UpdateTaskDto) => {
    try {
      const updatedTask = await taskService.updateTask(id, data);
      setTasks(prev => prev.map(task => 
        task.id === id ? { ...task, ...updatedTask } : task
      ));
    } catch (err) {
      console.error('Error updating task:', err);
      throw err;
    }
  };

  const handleToggleComplete = async (id: string, currentStatus: TaskStatus) => {
    const newStatus = currentStatus === TaskStatus.COMPLETED 
      ? TaskStatus.PENDING 
      : TaskStatus.COMPLETED;
    try {
      await handleUpdateTask(id, { status: newStatus });
    } catch (err) {
      console.error('Error toggling task completion:', err);
    }
  };

  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      await handleUpdateTask(id, { isFavorite });
    } catch (err) {
      console.error('Error toggling task favorite:', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
      throw err;
    }
  };

  const handleSearchChange = (search: string) => {
    // Atualiza o filtro de busca, removendo-o se estiver vazio.
    // Isso também irá acionar o useEffect para recarregar as tarefas.
    setFilters(prev => ({ ...prev, search: search || undefined }));
  };

  const favoriteTasks = tasks
    .filter(task => task.isFavorite)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const otherTasks = tasks
    .filter(task => !task.isFavorite)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <ErrorBoundary>
      <div className="tailwind">
        <div className="">
          <div className="min-h-screen bg-gray-50 font-sans">
            <div className="max-w-6xl mx-auto p-6">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl">
                  Core Notes
                </h1>
                <div className="w-64">
                  <TaskFiltersComponent
                    value={filters.search || ''}
                    onSearchChange={handleSearchChange}
                    />
                </div>
              </div>
              <div className="mb-8 bg-white">
                <TaskForm onSubmit={handleCreateTask} />
              </div>
              {/* Main Content */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-medium">Erro ao carregar tarefas</p>
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                    <button
                      onClick={() => loadTasks()}
                      className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
                    >
                      Tentar novamente
                    </button>
                  </div>
                </div>
              )}
              {favoriteTasks.length > 0 && (
                <div className="mb-8">
                  <h2 className="mb-4">Favorites</h2>
                  <div className="grid [grid-template-columns:repeat(auto-fill,minmax(16rem,1fr))] gap-3">
                    {favoriteTasks.map(task => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggleComplete={handleToggleComplete}
                        onToggleFavorite={handleToggleFavorite}
                        onUpdate={handleUpdateTask}
                        onDelete={handleDeleteTask}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div>
                {otherTasks.length > 0 && (
                  <div>
                    <h2 className="mb-4">Others</h2>
                    <div className="grid [grid-template-columns:repeat(auto-fill,minmax(16rem,1fr))] gap-3">
                      {otherTasks.map(task => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onToggleComplete={handleToggleComplete}
                          onToggleFavorite={handleToggleFavorite}
                          onUpdate={handleUpdateTask}
                          onDelete={handleDeleteTask}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
