'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTaskDto } from '@/types/task';
import { z } from 'zod';
// import { taskColors } from '@/lib/utils';
import '../output.css';

const taskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100, 'Título muito longo'),
  description: z.string().max(500, 'Descrição muito longa').optional(),
  color: z.enum(['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'indigo', 'gray']).optional(),
  isFavorite: z.boolean().optional(),
});

const taskColorStyles = {
  gray: { bg: 'bg-gray-100', border: 'border-gray-200' },
  red: { bg: 'bg-red-100', border: 'border-red-200' },
  blue: { bg: 'bg-blue-100', border: 'border-blue-200' },
  green: { bg: 'bg-green-100', border: 'border-green-200' },
  yellow: { bg: 'bg-yellow-100', border: 'border-yellow-200' },
  purple: { bg: 'bg-purple-100', border: 'border-purple-200' },
  pink: { bg: 'bg-pink-100', border: 'border-pink-200' },
  indigo: { bg: 'bg-indigo-100', border: 'border-indigo-200' },
};
type TaskColor = keyof typeof taskColorStyles;

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onSubmit: (data: CreateTaskDto) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function TaskForm({ onSubmit, onCancel, isLoading }: TaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      color: 'gray',
      isFavorite: false,
    },
  });

  const isFavorite = watch('isFavorite');
  const selectedColor = watch('color') || 'gray';

  const handleFormSubmit = async (data: TaskFormData) => {
    try {
      await onSubmit(data);
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleCancel = () => {
    reset();
    setIsOpen(false);
    onCancel?.();
  };

  if (!isOpen) {
    return (
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-4 transition-all duration-200 cursor-text">
        <div onClick={() => setIsOpen(true)} className="text-gray-500">
          Take a note...
        </div>
      </div>
    );
  }

  return (
    <div
      className={`text-card-foreground flex flex-col gap-6 rounded-xl border p-4 transition-all duration-200 cursor-text ${
        taskColorStyles[selectedColor as TaskColor].bg
      } ${taskColorStyles[selectedColor as TaskColor].border}`}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
        <input
          {...register('title')}
          type="text"
          id="title"
          className="flex h-9 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm outline-none transition-[color,box-shadow] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus:ring-0 focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-gray-300 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm"
          placeholder="Title"
        />
        <textarea
          {...register('description')}
          id="description"
          rows={3}
          className="border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex field-sizing-content w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base transition-[color,box-shadow] outline-none shadow-sm disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:outline-none focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-gray-300 resize-none min-h-[80px]"
          placeholder="Take a note..."
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsColorPickerOpen(prev => !prev)}
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-white/50 rounded-md gap-1.5 has-[>svg]:px-2.5 h-8 w-8 p-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-palette h-4 w-4" aria-hidden="true" >
                  <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"></path>
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </svg>
              </button>
              {isColorPickerOpen && (
                <div className="absolute bottom-full mb-2 flex gap-2 rounded-md border bg-white p-2 shadow-lg">
                  {Object.entries(taskColorStyles).map(([color, styles]) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        setValue('color', color as TaskColor);
                        setIsColorPickerOpen(false);
                      }}
                      className={`h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 ${styles.bg} ${selectedColor === color ? 'border-gray-900' : 'border-transparent'}`}
                      title={color.charAt(0).toUpperCase() + color.slice(1)}
                    />
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-gray-200 rounded-md gap-1.5 has-[>svg]:px-2.5 h-8 w-8 p-0"
              onClick={() => setValue('isFavorite', !isFavorite)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-star h-4 w-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} aria-hidden="true" >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-gray-200 h-8 rounded-md gap-1.5 px-3 has-[&gt;svg]:px-2.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={isSubmitting || isLoading ? undefined : handleSubmit(handleFormSubmit)}
              className="inline-flex items-center justify-center text-white whitespace-nowrap rounded-md bg-black px-3 h-8 text-sm font-medium text-primary-foreground transition-all outline-none hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-900"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
