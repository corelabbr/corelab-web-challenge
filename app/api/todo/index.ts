import { TodoType } from '@/types/common';
import { Session } from 'next-auth';

export const addTodo = async (data: TodoType, session: Session) => {
  const authToken = session?.user.accessToken;
  try {
    const config = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('http://localhost:3000/tasks', config);

    return response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export const editTodo = async (data: TodoType, session: Session, id: string) => {
  const authToken = session?.user.accessToken;
  try {
    const config = {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      `http://localhost:3000/tasks/edit/${id}`,
      config
    );

    return response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export const changeCompleteTodo = async (data: TodoType, session: Session) => {
  const authToken = session?.user.accessToken;
  try {
    const config = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      `http://localhost:3000/tasks/complete/${data.id}`,
      config
    );

    return response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export const changeFavoriteTodo = async (data: TodoType, session: Session) => {
  const authToken = session?.user.accessToken;
  try {
    const config = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      `http://localhost:3000/tasks/favorite/${data.id}`,
      config
    );

    return response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export const deleteTodo = async (data: TodoType, session: Session) => {
  const authToken = session?.user.accessToken;
  try {
    const config = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    const response = await fetch(
      `http://localhost:3000/tasks/${data.id}`,
      config
    );

    return response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
