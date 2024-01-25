'use client';
import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import AddTaskForm from '@/components/add-task-form';
import Modal from '@/components/modal';
import { SessionType } from '@/types/common';

const AddTask = ({ session }: SessionType) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <div className='fixed bottom-4 right-1/2 translate-x-1/2'>
        <button
          onClick={() => setModalIsOpen(true)}
          className='bg-secondary text-floralWhite font-bold p-4 rounded-full shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]'
        >
          <MdAdd size={20} />
        </button>
      </div>
      <Modal show={modalIsOpen} onClose={setModalIsOpen}>
        <AddTaskForm session={session} modalIsOpen={setModalIsOpen} />
      </Modal>
    </>
  );
};

export default AddTask;
