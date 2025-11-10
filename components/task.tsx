import {
  changeCompleteTodo,
  changeFavoriteTodo,
  deleteTodo,
} from '@/app/api/todo';
import { useFetch } from '@/hooks/useFetch';
import { SessionType, TodoType } from '@/types/common';
import React, { useState } from 'react';
import {
  MdStar,
  MdDelete,
  MdEdit,
  MdOutlineCalendarMonth,
  MdCheck,
} from 'react-icons/md';
import Modal from './modal';
import EditTaskForm from './edit-task-form';
import Link from 'next/link';

type TaskType = SessionType & {
  todo: TodoType;
};

const Task = ({ todo, session }: TaskType) => {
  const { mutate } = useFetch<TodoType[]>(
    'http://localhost:3000/tasks/list',
    session
  );

  const { mutate: mutateFavorites } = useFetch<TodoType[]>(
    'http://localhost:3000/tasks/favorites',
    session
  );

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  };

  const isDateOverdue = (date: Date): boolean => {
    const currentDate = new Date();
    return date < currentDate;
  };

  const handleCompleteTask = async (todo: TodoType) => {
    try {
      await changeCompleteTodo(todo, session);
      mutate();
      mutateFavorites();
    } catch (erro) {
      console.error('Erro: ', erro);
    }
  };

  const handleFavoriteTask = async (todo: TodoType) => {
    try {
      await changeFavoriteTodo(todo, session);
      mutate();
      mutateFavorites();
    } catch (erro) {
      console.error('Erro: ', erro);
    }
  };

  const handleDeleteTask = async (todo: TodoType) => {
    try {
      await deleteTodo(todo, session);
      mutate();
    } catch (erro) {
      console.error('Erro: ', erro);
    }
  };

  return (
    <>
      <div className='flex w-full border-b px-5 py-2'>
        <div className='mr-4'>
          <label
            className='relative flex items-center rounded-full cursor-pointer'
            htmlFor='customStyle'
          >
            <input
              type='checkbox'
              checked={todo?.isCompleted}
              onChange={() => handleCompleteTask(todo)}
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-secondary checked:before:bg-secondary hover:scale-105 hover:before:opacity-0"
              id='customStyle'
            />
            <span className='absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
              <MdCheck />
            </span>
          </label>
        </div>
        <div className='flex flex-col sm:flex-row sm:flex-1'>
          <div className='flex-1 mb-4'>
            <h3 className='text-base font-medium'>{todo.taskTitle}</h3>
            <p className='text-sm mb-1 text-softGray'>{todo.description}</p>
            <p
              className={`flex items-center text-sm ${
                isDateOverdue(new Date(todo.dueDate))
                  ? 'text-red-400'
                  : 'text-softGray'
              }`}
            >
              <span className='mr-1'>
                <MdOutlineCalendarMonth />
              </span>
              <span>{formatDate(new Date(todo.dueDate))}</span>
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => handleFavoriteTask(todo)}
              className={`${
                todo.isFavorite ? 'text-yellow-300' : 'text-gray-300'
              }`}
            >
              <MdStar size={25} />
            </button>
            <Link href={`/edit/${todo.id}`}>
              <MdEdit size={24} color='#53118F' />
            </Link>
            <button onClick={() => handleDeleteTask(todo)}>
              <MdDelete size={24} color='#53118F' />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
