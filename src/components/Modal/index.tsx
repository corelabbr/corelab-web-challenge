
import { Dispatch, SetStateAction } from 'react'
import Back from '../../assets/back.png'
import styles from './Modal.module.scss'

interface ModalProps {
    status : Boolean;
    setStatus : Dispatch<SetStateAction<Boolean>>;
}

const Modal = ( props : ModalProps ) => {



  return(
    <div className={styles.Modal} style={ props.status ? {display : 'flex'} : {display : 'none'} }>
        <img 
            onClick={()=> props.setStatus(false)} 
            className={styles.CloseModal}
            src={Back}
            alt={'Back'} 
        />

        <form>
            <input type='text' placeholder='Nome' />
            <input type='text' placeholder='Marca' />
            <input type='text' placeholder='Cor' />
            <input type='text' placeholder='Ano' />
            <input type='text' placeholder='Placa' />
            <input type='text' placeholder='Preço' />

            <button>Salvar</button>
        </form>
    </div>
  );
}

export default Modal;