import { FormEvent, useState } from 'react';
import Task from '../lib/Task';
import { Star } from './Star';
import { removeTrailingSlash } from '../utils/util';
import axios from 'axios';
import API_URL from '../services/api';

const COLOR = '#FFF';

interface INewNote {
  newTask: (task: Task) => void;
}
export const NewNote = ({ newTask }: INewNote) => {
  const [favorite, setFavorite] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const resetState = () => {
    setTitle('Título');
    setDescription('');
    setFavorite(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await axios.post(
      removeTrailingSlash(API_URL) + '/api/tasks',
      {
        title: title,
        description: description,
        favorite: favorite,
        color: COLOR,
      },
    );
    const task = response.data;
    newTask(task);
    resetState();
  };

  return (
    <div className="w-[531px] bg-white rounded-md border shadow-md">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex item-center justify-center py-[13px] px-[21px] border-b">
          <input
            type="text"
            className="text-black placeholder:font-bold placeholder:text-black flex-1 outline-none"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Título"
          />
          <Star checked={favorite} onChange={(value) => setFavorite(value)} />
        </div>
        <div className="py-[13px] px-[21px] h-20">
          <input
            type="text"
            className="w-full outline-none focus:outline-none"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Criar nota..."
          />
        </div>
        <button type="submit"></button>
      </form>
    </div>
  );
};
