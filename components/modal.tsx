import React from 'react';
import { MdOutlineClose } from 'react-icons/md';

type ModalType = {
  show: boolean;
  onClose: (value: boolean) => void;
  children: React.ReactNode;
};

const Modal = ({ show, onClose, children }: ModalType) => {
  return (
    <div
      style={{
        transform: show ? 'translateY(0%)' : 'translateY(-200%)',
      }}
      className='fixed top-0 left-0 w-full h-full z-10 transition-all duration-500 bg-[rgb(0,0,0,0.2)]'
    >
      <div className='container relative mx-auto max-w-2xl bg-floralWhite rounded-lg border py-6 px-4 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]'>
        <button
          onClick={() => {
            onClose(false);
          }}
          className='absolute right-2 top-1 font-bold p-1 rounded-full'
        >
          <MdOutlineClose size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
