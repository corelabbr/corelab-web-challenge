'use client';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { MdDateRange } from 'react-icons/md';
import 'react-datepicker/dist/react-datepicker.css';
import { editTodo } from '@/app/api/todo';
import { SessionType, TodoType } from '@/types/common';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type AddTaskFormType = SessionType & { taskId: string };

const EditTaskForm: React.FC<AddTaskFormType> = ({ session, taskId }) => {
  const { data: todo } = useFetch<TodoType>(
    `http://localhost:3000/tasks/${taskId}`,
    session
  );
  const router = useRouter();
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date>(new Date());

  useEffect(() => {
    if (todo) {
      setTaskTitle(todo.taskTitle);
      setDescription(todo.description);
      setDueDate(new Date(todo.dueDate));
    }
  }, [todo]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await editTodo(
        { taskTitle, description, dueDate },
        session,
        taskId
      );

      router.replace('/');
    } catch (erro) {
      console.error('Erro no exemplo de uso:', erro);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='relative'>
      <div>
        <input
          type='text'
          id='task-name'
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className='bg-floralWhite p-4 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full'
          placeholder='Nome da tarefa...'
          required
        />
      </div>

      <div>
        <textarea
          id='task-description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className='block p-4 w-full text-sm bg-floralWhite focus:ring-blue-500 focus:border-blue-500'
          placeholder='Descriçao da terefa aqui...'
        ></textarea>
      </div>

      <div className='mb-4'>
        <DatePicker
          showIcon
          selected={dueDate}
          onChange={(date: Date) => setDueDate(date)}
          icon={<MdDateRange />}
          className='bg-floralWhite border-2 rounded-lg'
          placeholderText='Data de realizaçao'
        />
      </div>

      <div className='md:absolute md:right-0 md:bottom-0'>
        <Link
          href={'/'}
          className='text-raisinBlack bg-floralWhite border hover:border-secondary font-medium rounded-lg text-sm px-5 py-2 mr-4'
        >
          Cancelar
        </Link>
        <button
          type='submit'
          className='text-floralWhite bg-primary hover:bg-secondary font-medium rounded-lg text-sm px-5 py-2 mb-2 md:mb-0'
        >
          Editar
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
