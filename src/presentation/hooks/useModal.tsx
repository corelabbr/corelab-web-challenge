import { useState } from 'react';
import { IModalData } from '../components/Modal';

export function useModal() {
  const [modal, setModal] = useState<IModalData>({
    message: '',
    type: 'success',
    buttonText: '',
  });

  function openCloseModal() {
    setModal({ message: '', type: 'success', buttonText: '' });
  }

  return { modal, setModal, openCloseModal };
}
