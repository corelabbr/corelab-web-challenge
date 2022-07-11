import { Dispatch, SetStateAction } from 'react'

export interface ModalProps {
    board? : string;
    status : Boolean;
    setStatus : Dispatch<SetStateAction<Boolean>>;
}