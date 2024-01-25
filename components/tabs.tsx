import React, { useState } from 'react';

const Tabs = ({ onTabClick }: { onTabClick: (value: string) => void }) => {
  const [activeTab, setActiveTab] = useState('all');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    onTabClick(tabName);
  };

  const isTabActive = (tabName: string) => {
    return tabName === activeTab ? 'active' : '';
  };

  return (
    <div className='text-sm font-medium text-center text-softGray border-b'>
      <ul className='flex flex-wrap -mb-px'>
        <li className='me-2'>
          <a
            href='#'
            className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${isTabActive(
              'all'
            )}`}
            onClick={() => handleTabClick('all')}
          >
            Todos
          </a>
        </li>
        <li className='me-2'>
          <a
            href='#'
            className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${isTabActive(
              'favorites'
            )}`}
            onClick={() => handleTabClick('favorites')}
          >
            Favoritos
          </a>
        </li>
        <li className='me-2'>
          <a
            href='#'
            className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${isTabActive(
              'colors'
            )}`}
            onClick={() => handleTabClick('colors')}
          >
            Cores
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
