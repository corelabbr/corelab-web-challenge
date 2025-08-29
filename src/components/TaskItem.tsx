'use client';

import { useState, useEffect } from 'react'; // Importamos o useEffect
import { Trash2 } from 'lucide-react';
import { Task, TaskColor, TaskStatus } from '@/types/task';
import { cn, taskColors } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string, status: TaskStatus) => Promise<void>;
  onToggleFavorite: (id: string, favorite: boolean) => Promise<void>;
  onUpdate: (id: string, data: { title?: string; description?: string; color?: TaskColor }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
  color: z.enum(['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'indigo', 'gray']).optional(),
  isFavorite: z.boolean().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function TaskItem({
  task,
  onToggleFavorite,
  onUpdate,
  onDelete,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  
  // 1. Configuração centralizada com useForm
  const {
    register,     // Para registrar os inputs
    handleSubmit, // Para gerenciar o envio do formulário
    watch,        // Para observar mudanças em campos
    setValue,     // Para definir o valor de um campo programaticamente
    reset,        // Para resetar o formulário
    formState: { errors }, // Para acessar os erros de validação
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    // Define os valores iniciais do formulário com base na tarefa atual
    defaultValues: {
      title: task.title,
      description: task.description || '',
      color: task.color || 'gray',
      isFavorite: task.isFavorite || false,
    },
  });
  
  // Observa a cor selecionada para atualizar a UI dinamicamente
  const selectedColor = watch('color') || 'gray';
  const colorStyles = taskColors[selectedColor];

  // 2. Função de "Salvar" que recebe os dados validados
  const handleSaveEdit = async (data: TaskFormData) => {
    try {
      await onUpdate(task.id, {
        title: data.title,
        description: data.description || '',
        color: data.color,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // 3. Função de "Cancelar" usando reset()
  const handleCancelEdit = () => {
    // Reseta o formulário para os valores originais da tarefa
    reset({
      title: task.title,
      description: task.description || '',
      color: task.color,
      isFavorite: task.isFavorite,
    });
    setIsEditing(false);
    setIsOpen(false); // Adicionado para fechar o card ao cancelar
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } catch (error) {
      console.error('Error deleting task:', error);
      setIsDeleting(false);
    }
  };
  
  // Efeito para resetar o formulário se a tarefa externa mudar
  useEffect(() => {
    reset({
      title: task.title,
      description: task.description || '',
      color: task.color,
      isFavorite: task.isFavorite,
    });
  }, [task, reset]);

  if (isDeleting) {
    return (
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 opacity-50 animate-pulse">
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          <span className="ml-2 text-gray-600">Excluindo...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => !isEditing && (setIsOpen(true), setIsEditing(true))}
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-3 rounded-xl border p-3 group transition-all duration-200 relative",
        !isEditing && "hover:shadow-md cursor-pointer", // Só aplica hover quando não está editando
        colorStyles.bg,
        colorStyles.border
      )}
    >
      {isOpen && isEditing ? (
        <>
          <button onClick={() => onToggleFavorite(task.id, !task.isFavorite)} 
              className={cn("absolute top-2 right-2 p-1 transition-colors rounded-full", task.isFavorite ? 'text-yellow-400 hover:bg-yellow-100' : 'text-gray-400 hover:bg-gray-100 hover:text-yellow-500')}>
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 ${task.isFavorite ? 'fill-yellow-400' : ''}`}><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
          </button>
          <div className="pr-8">
            <div className="space-y-3">
              {/* 4. Conectando o input de título com 'register' */}
              <input
                {...register('title')}
                className="w-full bg-transparent border-none outline-none resize-none font-medium"
                placeholder="Title"
              />
              {/* Exibindo erro de validação para o título */}
              {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}

              {/* 5. Conectando a textarea com 'register' */}
              <textarea
                {...register('description')}
                className="w-full bg-transparent border-none outline-none resize-none min-h-[60px]"
                placeholder="Take a note..."
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 relative">
                  <button type="button" onClick={() => setIsColorPickerOpen(prev => !prev)} className="p-1 text-gray-500 hover:bg-gray-200 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"></path><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle></svg></button>
                  {isColorPickerOpen && (
                    <div className="absolute bottom-full mb-2 flex gap-2 rounded-md border bg-white p-2 shadow-lg z-10">
                      {Object.entries(taskColors).map(([color, styles]) => (
                        <button key={color} type="button"
                          onClick={() => {
                              setValue('color', color as TaskColor, { shouldDirty: true });
                              setIsColorPickerOpen(false);
                          }}
                          className={`h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 ${styles.bg} ${selectedColor === color ? 'border-gray-900' : 'border-transparent'}`}
                          title={color.charAt(0).toUpperCase() + color.slice(1)}
                        />
                      ))}
                    </div>
                  )}
                  <button onClick={handleDelete} className="p-1 text-gray-500 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors" title="Excluir"><Trash2 className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleCancelEdit} type="button" className="text-sm font-medium hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors">Cancel</button>
                  {/* 6. Usando handleSubmit para validar antes de salvar */}
                  <button onClick={handleSubmit(handleSaveEdit)} className="text-sm font-medium text-white bg-black hover:bg-gray-800 px-3 py-1.5 rounded-md transition-colors">Save</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <button onClick={() => onToggleFavorite(task.id, !task.isFavorite)} 
              className={cn("absolute top-2 right-2 p-1 transition-colors rounded-full", task.isFavorite ? 'text-yellow-400 hover:bg-yellow-100' : 'text-gray-400 hover:bg-gray-100 hover:text-yellow-500')}>
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 ${task.isFavorite ? 'fill-yellow-400' : ''}`}><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
          </button>
          <h3>{task.title}</h3>
          {task.description && (<p className="text-xs leading-relaxed break-words opacity-75">{task.description}</p>)}
        </>
      )}
    </div>
  );
}