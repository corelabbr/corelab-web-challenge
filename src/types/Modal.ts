import { Dispatch, SetStateAction } from 'react'

export interface ModalProps {
    status : Boolean;
    setStatus : Dispatch<SetStateAction<Boolean>>;
}