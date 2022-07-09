import styles from './EditModal.module.scss'
import Back from '../../assets/back.png'

import { ModalProps } from '../../types/Modal'


const EditModal = ( props : ModalProps ) => {
  return(
    <div className={styles.Modal} style={ props.status ? { display : 'flex'} : { display : 'none'} }>
        <img 
          onClick={()=> props.setStatus(false) }
          src={Back}
          alt='Voltar'
      /> 
          
    </div>
  );
}

export default EditModal;