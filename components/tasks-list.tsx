'use client';
import React, { useEffect, useState } from 'react';
import Tabs from '@/components/tabs';
import Task from '@/components/task';
import { SessionType, TodoType } from '@/types/common';
import { useFetch } from '@/hooks/useFetch';

const TasksList = ({ session }: SessionType) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [url, setUrl] = useState<string>('tasks/list');
  const { data: todos } = useFetch<TodoType[]>(
    `http://localhost:3000/${url}`,
    session
  );

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (activeTab === 'all') {
      setUrl('tasks/list');
    } else if (activeTab === 'favorites') {
      setUrl('tasks/favorites');
    } else {
      setUrl('tasks/list');
    }
  }, [activeTab]);

  return (
    <section className='bg-floralWhite rounded-lg overflow-hidden'>
      <Tabs onTabClick={handleTabClick} />

      {todos?.map((todo) => (
        <Task key={todo.id} todo={todo} session={session} />
      ))}
    </section>
  );
};

export default TasksList;
