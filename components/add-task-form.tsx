import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { MdDateRange } from 'react-icons/md';
import 'react-datepicker/dist/react-datepicker.css';
import { addTodo } from '@/app/api/todo';
import { SessionType, TodoType } from '@/types/common';
import { useFetch } from '@/hooks/useFetch';

type AddTaskFormType = SessionType & {
  modalIsOpen: (value: boolean) => void;
};

const AddTaskForm: React.FC<AddTaskFormType> = ({ session, modalIsOpen }) => {
  const { mutate } = useFetch<TodoType[]>(
    'http://localhost:3000/tasks/list',
    session
  );
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date>(new Date());

  const [errors, setErrors] = useState({
    taskTitle: '',
    description: '',
    dueDate: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await addTodo({ taskTitle, description, dueDate }, session);
      mutate();
      modalIsOpen(false);
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
        <div className='error-message'>{errors.taskTitle}</div>
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
        <button
          onClick={() => modalIsOpen(false)}
          type='button'
          className='text-raisinBlack bg-floralWhite border-2 hover:bg-secondary font-medium rounded-lg text-sm px-5 py-2 mr-4'
        >
          Cancelar
        </button>
        <button
          type='submit'
          className='text-floralWhite bg-primary hover:bg-secondary font-medium rounded-lg text-sm px-5 py-2 mb-2 md:mb-0'
        >
          Adicionar
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
